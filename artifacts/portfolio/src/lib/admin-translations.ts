/**
 * نصوص لوحة التحكم — مفصولة عن نصوص الموقع العام
 * ------------------------------------------------------------------
 * كل نصوص `/admin` في مكان واحد لسهولة التعديل.
 */

export const adminTranslations = {
  ar: {
    // عام
    admin_title: "لوحة التحكم",
    admin_subtitle: "إدارة الرسائل الواردة من نموذج التواصل",
    admin_back_site: "العودة للموقع",
    admin_logout: "تسجيل الخروج",
    admin_secure_badge: "اتصال مشفّر",
    admin_session_expires: "تنتهي الجلسة تلقائياً بعد فترة خمول.",

    // بوابة الدخول
    admin_login_title: "لوحة التحكم",
    admin_login_desc: "أدخل كلمة المرور للوصول إلى رسائلك.",
    admin_password: "كلمة المرور",
    admin_password_ph: "••••••••••••••••",
    admin_login_btn: "دخول",
    admin_login_loading: "جارٍ التحقق...",
    admin_paste: "لصق من الحافظة",
    admin_show_password: "إظهار كلمة المرور",
    admin_hide_password: "إخفاء كلمة المرور",

    // قوة كلمة المرور
    admin_strength: "قوة كلمة المرور",
    admin_strength_weak: "ضعيفة",
    admin_strength_fair: "متوسطة",
    admin_strength_good: "جيدة",
    admin_strength_strong: "قوية جداً",

    // الأخطاء
    admin_err_invalid_credentials: "كلمة المرور غير صحيحة.",
    admin_err_email_taken: "هذا البريد مسجّل مسبقاً.",
    admin_err_email_not_allowed: "هذا البريد غير مُدرج كمدير. أضِفه إلى جدول admin_users أولاً.",
    admin_err_confirm_email: "تم إنشاء الحساب. يرجى تأكيد البريد الإلكتروني ثم سجّل الدخول.",
    admin_err_signups_disabled: "إنشاء الحسابات معطّل في Supabase. أضف الحساب من Supabase Dashboard → Authentication → Users بنفس كلمة المرور.",
    admin_err_network: "تعذّر الاتصال بقاعدة البيانات. تأكد من صحة رابط Supabase في ملف .env (VITE_SUPABASE_URL).",
    admin_err_generic: "حدث خطأ، حاول مرة أخرى.",
    admin_err_locked: "تم قفل اللوحة مؤقتاً بسبب محاولات فاشلة متكررة. انتظر 15 دقيقة ثم أعد المحاولة.",
    admin_provisioned_notice: "تم إنشاء حساب المدير بنجاح. تم تسجيل دخولك الآن.",

    // الإحصائيات
    admin_total: "إجمالي الرسائل",
    admin_unread: "غير مقروءة",
    admin_read: "مقروءة",
    admin_today: "رسائل اليوم",

    // الأدوات
    admin_search_ph: "ابحث بالاسم أو البريد أو المحتوى...",
    admin_filter_all: "الكل",
    admin_filter_unread: "غير مقروءة",
    admin_filter_read: "مقروءة",
    admin_project_type: "نوع المشروع:",
    admin_refresh: "تحديث",
    admin_export: "تصدير CSV",
    admin_last_update: "آخر تحديث",

    // الرسائل
    admin_empty: "لا توجد رسائل بعد",
    admin_empty_desc: "ستظهر رسائل الزوار هنا فور استلامها.",
    admin_no_results: "لا توجد نتائج مطابقة",
    admin_reply_email: "الرد بالبريد",
    admin_reply_whatsapp: "الرد عبر واتساب",
    admin_call: "اتصال",
    admin_mark_read: "تعليم كمقروءة",
    admin_mark_unread: "تعليم كغير مقروءة",
    admin_delete: "حذف",
    admin_delete_confirm: "هل تريد حذف هذه الرسالة نهائياً؟",

    // الأمان والتشخيص
    admin_setup_required_title: "إعداد قاعدة البيانات مطلوب",
    admin_setup_required_desc: "لأمان بياناتك، يتم التحقق من الصلاحيات على مستوى قاعدة البيانات (RLS). نفّذ ملف SQL المرفق ثم أعد المحاولة.",
    admin_copy_sql: "نسخ كود SQL",
    admin_sql_copied: "تم نسخ الكود!",
    admin_signed_in_as: "تم تسجيل الدخول باسم",
    admin_not_listed_title: "بريدك غير مُدرج ضمن المديرين",
    admin_not_listed_desc: "تم تسجيل الدخول بنجاح، لكن هذا البريد غير موجود في جدول admin_users. نفّذ الاستعلام بالأسفل في Supabase ثم أعد تحميل الصفحة.",
    admin_exposed_title: "تحذير أمني: رسائل الزوار مكشوفة",
    admin_exposed_desc: "تمكّن أي شخص من قراءة جدول الرسائل بدون تسجيل دخول. نفّذ سكربت SQL بالأسفل فوراً لتفعيل Row Level Security ومنع ذلك.",
  },

  en: {
    // General
    admin_title: "Admin Dashboard",
    admin_subtitle: "Manage messages received from the contact form",
    admin_back_site: "Back to site",
    admin_logout: "Sign out",
    admin_secure_badge: "Encrypted connection",
    admin_session_expires: "Session expires automatically after inactivity.",

    // Login gate
    admin_login_title: "Admin Dashboard",
    admin_login_desc: "Enter the password to access your messages.",
    admin_password: "Password",
    admin_password_ph: "••••••••••••••••",
    admin_login_btn: "Sign in",
    admin_login_loading: "Verifying...",
    admin_paste: "Paste from clipboard",
    admin_show_password: "Show password",
    admin_hide_password: "Hide password",

    // Password strength
    admin_strength: "Password strength",
    admin_strength_weak: "Weak",
    admin_strength_fair: "Fair",
    admin_strength_good: "Good",
    admin_strength_strong: "Very strong",

    // Errors
    admin_err_invalid_credentials: "Incorrect password.",
    admin_err_email_taken: "This email is already registered.",
    admin_err_email_not_allowed: "This email is not authorized as an admin. Add it to the admin_users table first.",
    admin_err_confirm_email: "Account created. Please confirm your email, then sign in.",
    admin_err_signups_disabled: "Account signups are disabled in Supabase. Add the account from Supabase Dashboard → Authentication → Users with the same password.",
    admin_err_network: "Could not reach the database. Make sure the Supabase URL in the .env file (VITE_SUPABASE_URL) is correct.",
    admin_err_generic: "Something went wrong, please try again.",
    admin_err_locked: "The panel is temporarily locked after too many failed attempts. Wait 15 minutes and try again.",
    admin_provisioned_notice: "Admin account created successfully. You are now signed in.",

    // Stats
    admin_total: "Total messages",
    admin_unread: "Unread",
    admin_read: "Read",
    admin_today: "Today",

    // Tools
    admin_search_ph: "Search by name, email or content...",
    admin_filter_all: "All",
    admin_filter_unread: "Unread",
    admin_filter_read: "Read",
    admin_project_type: "Project type:",
    admin_refresh: "Refresh",
    admin_export: "Export CSV",
    admin_last_update: "Last updated",

    // Messages
    admin_empty: "No messages yet",
    admin_empty_desc: "Visitor messages will show up here as soon as they arrive.",
    admin_no_results: "No matching results",
    admin_reply_email: "Reply by email",
    admin_reply_whatsapp: "Reply on WhatsApp",
    admin_call: "Call",
    admin_mark_read: "Mark as read",
    admin_mark_unread: "Mark as unread",
    admin_delete: "Delete",
    admin_delete_confirm: "Delete this message permanently?",

    // Security & diagnostics
    admin_setup_required_title: "Database setup required",
    admin_setup_required_desc: "For your data's security, permissions are enforced at the database level (RLS). Run the provided SQL file, then try again.",
    admin_copy_sql: "Copy SQL code",
    admin_sql_copied: "Code copied!",
    admin_signed_in_as: "Signed in as",
    admin_not_listed_title: "Your email is not on the admins list",
    admin_not_listed_desc: "Signed in successfully, but this email is missing from the admin_users table. Run the query below in Supabase, then reload the page.",
    admin_exposed_title: "Security warning: visitor messages are exposed",
    admin_exposed_desc: "Anyone can read the messages table without signing in. Run the SQL script below immediately to enable Row Level Security and prevent this.",
  },
} as const;

export type AdminTranslationKey = keyof typeof adminTranslations.ar;
