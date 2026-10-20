-- ═══════════════════════════════════════════════════════════════════════════
--  ➕ تحديث جدول الرسائل — إضافة حقول جديدة
--  ─────────────────────────────────────────────────────────────────────────
--  📍 نفّذ هذا الملف في: Supabase Dashboard → SQL Editor → New query → Run
--
--  ✅ آمن 100% — يضيف أعمدة جديدة فقط ولا يمسح أي بيانات موجودة.
--  ✅ قابل للتكرار — لو نفّذته أكتر من مرة ما بيحصلش أي ضرر.
-- ═══════════════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────────────────
-- 1) رقم الواتساب / الهاتف
-- ───────────────────────────────────────────────────────────────────────────
alter table public.messages
  add column if not exists phone text;

comment on column public.messages.phone is 'رقم الواتساب أو الهاتف الذي كتبه الزائر';


-- ───────────────────────────────────────────────────────────────────────────
-- 2) نوع المشروع
--    القيم: social | ecommerce | company | general | other
-- ───────────────────────────────────────────────────────────────────────────
alter table public.messages
  add column if not exists project_type text;

comment on column public.messages.project_type is 'نوع المشروع: social / ecommerce / company / general / other';


-- ───────────────────────────────────────────────────────────────────────────
-- 3) الموضوع (منفصل عن الرسالة) — موجود غالباً، لكن نضمنه
-- ───────────────────────────────────────────────────────────────────────────
alter table public.messages
  add column if not exists subject text;

comment on column public.messages.subject is 'موضوع الرسالة';


-- ───────────────────────────────────────────────────────────────────────────
-- 4) فهارس لتسريع الفلترة داخل لوحة التحكم
-- ───────────────────────────────────────────────────────────────────────────
create index if not exists messages_project_type_idx on public.messages (project_type);
create index if not exists messages_phone_idx        on public.messages (phone);
create index if not exists messages_created_at_idx   on public.messages (created_at desc);


-- ───────────────────────────────────────────────────────────────────────────
-- 5) التحقق — يجب أن تُرجع الصفوف التالية:
--    id | name | email | phone | subject | message | project_type | ...
-- ───────────────────────────────────────────────────────────────────────────
-- select column_name, data_type
--   from information_schema.columns
--  where table_schema = 'public' and table_name = 'messages'
--  order by ordinal_position;
