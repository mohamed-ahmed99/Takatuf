# PRD - Takatuf Frontend

## 1. Overview
تطبيق ويب (React) يربط الفقراء والمحتاجين بالمتبرعين والجمعيات الخيرية. منصة تطوعية بدون أي تحويلات مالية.

## 2. User Roles (Roles)

### 2.1 User عادي
- يسجل بحساب بسيط (اسم، إيميل، باسورد، رقم تليفون)
- ينشر بوست بطلباته (الموبايل، لابتوب، كرسي، أي حاجة)
- يقدر يشوف البوستات ويدعمها (تضامن = like)
- يقدر يتواصل مع الجمعيات الخيرية
- يقدر ينشر بوست مجهول الهوية بشرط تحديد جمعية خيرية موافقة

### 2.2 Charity (جمعية خيرية)
- حساب بصلاحيات أعلي
- بروفايل خاص بالإنجازات ونشاط الجمعية
- توافق أو ترفض طلبات الضمان المرتبطة بها
- بتظهر كجهة موثقة بجانب البوست
- تقدر تتواصل مع المستخدمين

### 2.3 Admin (مدير النظام)
- صلاحيات كاملة علي المحتوي
- إدارة المستخدمين والجمعيات
- مراجعة البلاغات

## 3. Features

### 3.1 Auth System
- تسجيل دخول / إنشاء حساب (User + Charity)
- تسجيل خروج
- Forgot / Reset Password
- تفعيل الحساب عبر الإيميل

### 3.2 Posts (الطلبات)
- إنشاء بوست بـ:
  - عنوان الطلب (مثال: "محتاج لابتوب عشان اذاكر")
  - وصف تفصيلي
  - صورة (اختياري)
  - الفئة (تعليم، أثاث، أجهزة، ملابس، إلخ)
  - اختيار: الهوية ظاهرة / مجهول
  - اختيار الجمعية الخيرية المستلمة (إجباري)
  - الموقع (المحافظة - الإدارة)
- البوست يظهر بعد موافقة الجمعية عليه

### 3.3 Solidarity System (نظام التضامن)
- كل المستخدمين يقدر يضغط "تضامن" علي البوست (زي اللايك)
- عدد التضامنات يظهر علي البوست
- كلما زادت التضامنات، كلما زاد انتشار البوست

### 3.4 Post Visibility (التقسيم الجغرافي)
- بوست علي مستوي الإدارة (District)
- بوست علي مستوي المحافظة (Governorate)
- بوست علي مستوي مصر كلها (Country)

### 3.5 Charity Profile
- اسم الجمعية، وصف، صورة
- إحصائيات: عدد البوستات التي تمت، عدد المستفيدين
- البوستات السابقة (المنجزة)
- تقييمات وتعليقات من المستفيدين

### 3.6 Communication
- نظام رسائل بين المستخدمين والجمعيات
- إشعارات (عند قبول البوست، عند وجود متبرع، عند رسالة جديدة)

### 3.7 Donation Workflow
1. المستخدم المحتاج ينشر بوست + يحدد الجمعية المستلمة
2. الجمعية توافق علي البوست -> يظهر في التايم لاين
3. المتبرع يشوف البوست ويتواصل مع الجمعية
4. المتبرع يسلم التبرع للجمعية
5. الجمعية توصل التبرع للمحتاج
6. البوست يتحدث لحالة "تم"

## 4. Pages / Screens

### Public Pages
- Landing Page (الصفحة الرئيسية)
- Login Page
- Signup Page (User + Charity)
- About Page
- كيف يعمل الموقع (How It Works)

### User Pages
- User Dashboard
- Create Post Page
- My Posts Page
- Edit Post Page
- Notifications Page
- Messages Page
- Settings / Edit Profile

### Charity Pages
- Charity Dashboard (إحصائيات، أنشطة)
- Charity Profile Page (عام)
- Pending Posts (للموافقة أو الرفض)
- Managed Posts
- Charity Settings
- Messages Page

### Post Pages
- Single Post View
- Posts Feed (District / Governorate / Egypt tabs)
- Posts Search & Filter

### Admin Pages
- Admin Dashboard
- Users Management
- Charities Management
- All Posts Management
- Reports Center

## 5. Design System & UX

### 5.1 Language
- العربية (RTL) كل المحتوي
- اتجاه الموقع RTL بالكامل

### 5.2 Design Identity
- اسم "تكاتف" -> التكافل الاجتماعي
- ألوان دافئة ومريحة (أخضر + أزرق + أبيض)
- تصميم بسيط ونظيف (Mobile First)
- أيقونات بسيطة

### 5.3 Responsiveness
- متوافق مع الموبايل أولاً
- تابلت وديسكتوب

### 5.4 Performance
- تحميل سريع (Lazy loading للصور)
- Pagination للبوستات
- تقليل عدد الـ API calls

## 6. Tech Stack

| Technology | Usage |
|---|---|
| React 19 | UI Framework |
| Vite 8 | Build Tool |
| React Router | Routing |
| CSS Modules OR Tailwind | Styling |
| Axios | HTTP Client |
| Context API / Zustand | State Management |
| React Query / SWR | Server State |
| Socket.io-client | Real-time Messages |

## 7. States Per Component

كل كومبوننت لازم يتغطي الـ 4 حالات:
1. **Loading** - Skeleton / Spinner
2. **Empty** - رسالة "لا توجد بوستات" أو "لا توجد إشعارات"
3. **Error** - رسالة خطأ مع إعادة المحاولة
4. **Success** - المحتوي الطبيعي

## 8. API Integration

- Axios instance مع base URL من env
- Interceptor للـ JWT token
- Interceptor للـ Error handling
- RTL headers في كل requests

## 9. Non-Functional Requirements

- **لا يوجد أي تحويلات مالية** علي الموقع
- **خصوصية**: المستخدم المجهول هويته مش ظاهرة
- **أمان**: الـ JWT محمي، الـ API مش مكشوف
- **قابلية التوسع**: أضيف فيتشرز بسهولة مع الوقت
- **اختبارات**: Unit tests للمكونات الأساسية

## 10. Future Features (Phase 2)
- Volunteers system (متطوعين يوصلوا التبرعات)
- جمعية خيرية تضيف منشورات عن حملاتها
- تقارير وتبرعات مباشرة (مرحلة متقدمة)
