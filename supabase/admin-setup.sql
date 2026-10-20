-- ═══════════════════════════════════════════════════════════════════════════
--  إعدادات لوحة التحكم الآمنة — Creative Design Hub
--  نفّذ هذا الملف مرة واحدة في: Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────────────────
-- 1) جدول المديرين المسموح لهم (قائمة بيضاء — List of allowed admins)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  full_name  text,
  created_at timestamptz not null default now()
);

comment on table public.admin_users is 'قائمة البريد الإلكتروني المصرّح لها بالوصول للوحة التحكم';

-- 📧 بريد المدير — بريدك هو (cpshzt@gmail.com) افتراضياً.
--    لو غيّرته، عدّل السطر أدناه قبل التنفيذ.
insert into public.admin_users (email, full_name)
values ('cpshzt@gmail.com', 'Mohamed Ziad')
on conflict (email) do update set full_name = excluded.full_name;


-- ───────────────────────────────────────────────────────────────────────────
-- 2) تجهيز جدول الرسائل (لا يمسح البيانات الموجودة)
-- ───────────────────────────────────────────────────────────────────────────
-- يُنشأ الجدول فقط إن لم يكن موجوداً (لو كان موجوداً لن يتأثر)
create table if not exists public.messages (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  message      text not null default '',
  project_type text,
  subject      text,
  status       text not null default 'new',
  is_read      boolean not null default false,
  replied_at   timestamptz,
  created_at   timestamptz not null default now()
);

alter table public.messages enable row level security;

alter table public.messages add column if not exists created_at timestamptz not null default now();
alter table public.messages add column if not exists status       text        not null default 'new';
alter table public.messages add column if not exists is_read      boolean     not null default false;
alter table public.messages add column if not exists subject      text;
alter table public.messages add column if not exists replied_at   timestamptz;

create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_is_read_idx    on public.messages (is_read);


-- ───────────────────────────────────────────────────────────────────────────
-- 3) سياسات الأمان (RLS)
--    - الجميع يستطيع الإرسال فقط (نموذج التواصل)
--    - المديرون المسجّلون فقط يستطيعون القراءة/التعديل/الحذف
-- ───────────────────────────────────────────────────────────────────────────

-- دالة فحص المدير — SECURITY DEFINER حتى لا يحدث استدعاء ذاتي على الجدول
-- (استدعاء الجدول من داخل سياسته يسبب خطأ infinite recursion في Postgres)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- منع أي قراءة مباشرة للرسائل من زائر غير مسجّل
drop policy if exists "public select messages" on public.messages;
create policy "public select messages" on public.messages
  for select to anon using (false);

-- الإرسال العام (نموذج التواصل)
drop policy if exists "public insert messages" on public.messages;
create policy "public insert messages" on public.messages
  for insert to anon, authenticated with check (true);

-- القراءة للمديرين فقط
drop policy if exists "admins read messages" on public.messages;
create policy "admins read messages" on public.messages
  for select to authenticated
  using (public.is_admin());

-- التعديل للمديرين فقط
drop policy if exists "admins update messages" on public.messages;
create policy "admins update messages" on public.messages
  for update to authenticated
  using (public.is_admin())
  with check (true);

-- الحذف للمديرين فقط
drop policy if exists "admins delete messages" on public.messages;
create policy "admins delete messages" on public.messages
  for delete to authenticated
  using (public.is_admin());

-- جدول المديرين: المدير يقرأ صفّه فقط — ولا يُقرأ من أي زائر
alter table public.admin_users enable row level security;
drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users" on public.admin_users
  for select to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));


-- ───────────────────────────────────────────────────────────────────────────
-- 4) منع إنشاء حسابات من خارج القائمة البيضاء
--    ⚠️ مهم: نفّذ الخطوة (1) أولاً — بريدك مدرج مسبقاً، لذا يمكنك إنشاء حسابك.
--    أي شخص آخر يحاول إنشاء حساب في مشروعك سيتم رفضه.
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.enforce_admin_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.admin_users where lower(email) = lower(new.email)
  ) then
    raise exception 'Email % is not authorized as an administrator.', new.email;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_enforce_admin on auth.users;
create trigger on_auth_user_created_enforce_admin
  before insert on auth.users
  for each row execute function public.enforce_admin_signup();


-- ───────────────────────────────────────────────────────────────────────────
-- 5) التحقق — يجب أن يُرجع صفاً واحداً (بريدك)
-- ───────────────────────────────────────────────────────────────────────────
-- select email from public.admin_users;
