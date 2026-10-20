-- ═══════════════════════════════════════════════════════════════════════════
--  ⚙️  إعدادات لوحة التحكم الآمنة — Creative Design Hub
--  ─────────────────────────────────────────────────────────────────────────
--  📍 نفّذ هذا الملف مرة واحدة في:
--     Supabase Dashboard → SQL Editor → New query → Run
--
--  ✅ afterwards: افتح  /admin  واكتب كلمة المرور فقط — تم كل شيء.
--     (حساب المدير يُنشأ تلقائياً عند أول دخول، ما في أي زر إنشاء حساب)
--
--  🔒 هذا الملف لا يحتوي أي كلمة مرور — كلمة المرور تُكتب في المتصفح فقط
--     وتُخزَّن مُجزّأة (bcrypt) داخل Supabase.
-- ═══════════════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────────────────
-- 1) جدول المديرين المسموح لهم (قائمة بيضاء)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  full_name  text,
  created_at timestamptz not null default now()
);

comment on table public.admin_users is 'قائمة البريد الإلكتروني المصرّح لها بالوصول للوحة التحكم';

-- 📧 بريد المدير — مُعبّأ مسبقاً. عدّله لو أردت بريداً آخر.
insert into public.admin_users (email, full_name)
values ('cpshzt@gmail.com', 'Mohamed Ziad')
on conflict (email) do update set full_name = excluded.full_name;


-- ───────────────────────────────────────────────────────────────────────────
-- 2) تجهيز جدول الرسائل (لا يمسح البيانات الموجودة)
-- ───────────────────────────────────────────────────────────────────────────
-- يُنشأ فقط إن لم يكن موجوداً (لو موجود أصلاً لن يتأثر)
create table if not exists public.messages (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
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
alter table public.messages add column if not exists status     text        not null default 'new';
alter table public.messages add column if not exists is_read    boolean     not null default false;
alter table public.messages add column if not exists subject    text;
alter table public.messages add column if not exists phone      text;
alter table public.messages add column if not exists project_type text;

comment on column public.messages.phone is 'رقم الواتساب أو الهاتف الذي كتبه الزائر';
comment on column public.messages.project_type is 'نوع المشروع: social / ecommerce / company / general / other';

create index if not exists messages_created_at_idx   on public.messages (created_at desc);
create index if not exists messages_is_read_idx      on public.messages (is_read);
create index if not exists messages_project_type_idx on public.messages (project_type);
create index if not exists messages_phone_idx        on public.messages (phone);


-- ───────────────────────────────────────────────────────────────────────────
-- 3) دالة فحص المدير
--    SECURITY DEFINER حتى لا يحدث استدعاء ذاتي على الجدول
--    (استدعاء الجدول من داخل سياسته يسبب خطأ infinite recursion في Postgres)
-- ───────────────────────────────────────────────────────────────────────────
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


-- ───────────────────────────────────────────────────────────────────────────
-- 4) سياسات الأمان (RLS)
--    - الجميع يُرسل فقط (نموذج التواصل)
--    - المدير المسجّل فقط يقرأ / يعدّل / يحذف
-- ───────────────────────────────────────────────────────────────────────────

-- لا قراءة مباشرة للرسائل من أي زائر
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
  for select to authenticated using (public.is_admin());

-- التعديل للمديرين فقط
drop policy if exists "admins update messages" on public.messages;
create policy "admins update messages" on public.messages
  for update to authenticated using (public.is_admin()) with check (true);

-- الحذف للمديرين فقط
drop policy if exists "admins delete messages" on public.messages;
create policy "admins delete messages" on public.messages
  for delete to authenticated using (public.is_admin());

-- جدول المديرين: المدير يقرأ صفّه فقط
alter table public.admin_users enable row level security;
drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users" on public.admin_users
  for select to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));


-- ───────────────────────────────────────────────────────────────────────────
-- 5) منع إنشاء أي حساب خارج القائمة البيضاء
--    → يضمن أن حساب المدير فقط هو القادر على تسجيل الدخول.
--    → ولأن بريدك مُدرج في الخطوة (1)، يُنشأ حسابك تلقائياً بلا مشاكل.
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
-- 6) التحقق — يجب أن يُرجع صفاً واحداً (بريدك)
-- ───────────────────────────────────────────────────────────────────────────
-- select email from public.admin_users;
