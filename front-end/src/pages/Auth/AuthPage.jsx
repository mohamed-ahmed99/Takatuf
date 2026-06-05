import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import AuthNavbar from "../../components/AuthNavbar"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { IconSparkles } from "../../components/Icons"

function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mode, setMode] = useState(searchParams.get("tab") === "signup" ? "signup" : "login")

  const switchMode = (newMode) => {
    setMode(newMode)
    setSearchParams(newMode === "signup" ? { tab: "signup" } : {})
  }

  return (
    <div className="min-h-screen bg-bg-light pt-[72px]">
      <AuthNavbar />

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-12">
        <div className="max-w-[1100px] w-full flex flex-col lg:flex-row items-stretch gap-0 rounded-3xl shadow-xl shadow-black/5 overflow-hidden bg-white">
          {/* Left / Top: Brand side */}
          <div className="lg:w-[45%] bg-gradient-to-br from-primary via-[#0a3d5e] to-primary p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-secondary/8 rounded-full blur-2xl animate-float-slow" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/8 rounded-full blur-xl animate-float-medium" />
            </div>

            <div className="relative z-10 text-center lg:text-right">
              <div className="flex items-center gap-2.5 mb-6 lg:justify-start justify-center">
                <span className="w-12 h-12 flex items-center justify-center bg-secondary text-primary text-xl font-extrabold rounded-2xl shadow-lg shadow-secondary/20">
                  ت
                </span>
                <span className="text-3xl font-extrabold text-secondary">تكاتف</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">
                {mode === "login" ? "مرحباً بعودتك 🤝" : "انضم لعائلة تكاتف 🎉"}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {mode === "login"
                  ? "سجل دخولك عشان تتابع طلباتك، تتضامن مع المحتاجين، وتكون جزء من التكافل الاجتماعي."
                  : "أنشئ حسابك مجاناً وابدأ رحلة الخير. سواء كنت محتاج، متبرع، أو جمعية خيرية — مكانك هنا."}
              </p>

              <div className="hidden lg:block space-y-4">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-6 h-6 flex items-center justify-center bg-secondary/20 text-secondary rounded-lg shrink-0">
                    <IconSparkles className="w-3.5 h-3.5" />
                  </span>
                  مجاني بالكامل — بدون أي رسوم
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-6 h-6 flex items-center justify-center bg-secondary/20 text-secondary rounded-lg shrink-0">
                    <IconSparkles className="w-3.5 h-3.5" />
                  </span>
                  منصة موثقة بجمعيات خيرية رسمية
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-6 h-6 flex items-center justify-center bg-secondary/20 text-secondary rounded-lg shrink-0">
                    <IconSparkles className="w-3.5 h-3.5" />
                  </span>
                  بدون أي تحويلات مالية — تطوعي بالكامل
                </div>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Form side */}
          <div className="lg:w-[55%] p-8 lg:p-14 flex flex-col justify-center">
            {/* Tabs */}
            <div className="flex bg-bg-light rounded-2xl p-1.5 mb-8 border border-border">
              <button
                onClick={() => switchMode("login")}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  mode === "login"
                    ? "bg-white text-primary shadow-sm shadow-black/5 border border-border"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => switchMode("signup")}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-white text-primary shadow-sm shadow-black/5 border border-border"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                إنشاء حساب
              </button>
            </div>

            {/* Form */}
            <div className="animate-fade-up">
              {mode === "login" ? <LoginForm /> : <SignupForm />}
            </div>

            {/* Mobile features */}
            <div className="lg:hidden mt-8 pt-6 border-t border-border space-y-3">
              <p className="text-xs text-text-muted text-center">
                مجاني بالكامل — موثق بجمعيات خيرية — بدون تحويلات مالية
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
