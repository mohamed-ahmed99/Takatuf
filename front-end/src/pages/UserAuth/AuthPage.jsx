import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import AuthNavbar from "../../components/AuthNavbar"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import { IconSparkles, IconShield, IconHeart } from "../../components/Icons"
import logoSrc from "../../assets/logo.png"


const FEATURES = [
  { icon: IconSparkles, text: "مجاني 100% — مفيش أي رسوم" },
  { icon: IconShield,   text: "آمن ومضمون عن طريق جمعيات رسمية" },
  { icon: IconHeart,    text: "تبرعات عينية فقط — مفيش فلوس" },
]

function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [mode, setMode] = useState(searchParams.get("tab") === "signup" ? "signup" : "login")

  const switchMode = (newMode) => {
    setMode(newMode)
    setSearchParams(newMode === "signup" ? { tab: "signup" } : {})
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <AuthNavbar />

      {/* Full-height centering wrapper */}
      <div className="min-h-screen flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-[1120px] flex flex-col lg:flex-row items-stretch rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(5,36,64,0.22)]">

          {/* ── LEFT BRAND PANEL ── */}
          <div className="lg:w-[42%] relative bg-primary-dark flex flex-col justify-between p-10 lg:p-14 overflow-hidden min-h-[300px]">

            {/* Layered gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(150,212,200,0.15)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(150,212,200,0.08)_0%,transparent_60%)]" />
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(150,212,200,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            {/* Animated orbs */}
            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-secondary/10 blur-[60px] animate-float-slow pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-secondary/8 blur-[50px] animate-float-medium pointer-events-none" />

            {/* Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <img src={logoSrc} alt="تكاتف" className="w-12 h-12 rounded-2xl object-cover shadow-lg shadow-secondary/30" />
                <span className="text-3xl font-black text-secondary tracking-tight">تكاتف</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl lg:text-[1.75rem] font-black text-white leading-[1.2] mb-3">
                {mode === "login" ? (
                  <>أهلاً بيك تاني<br /><span className="text-secondary">في تكاتف 🤝</span></>
                ) : (
                  <>خليك جزء من<br /><span className="text-secondary">عيلة تكاتف 🎉</span></>
                )}
              </h2>
              <p className="text-white/55 text-sm leading-relaxed max-w-[320px]">
                {mode === "login"
                  ? "دخول وكمّل من حيث وقفت. طلباتك وتبرعاتك في انتظارك."
                  : "سجّل مجاناً وابدأ رحلتك. سواء متبرع أو محتاج — مكانك هنا."}
              </p>
            </div>

            {/* Feature list – desktop only */}
            <div className="relative z-10 hidden lg:flex flex-col gap-4 mt-10">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-secondary" />
                  </span>
                  <span className="text-white/55 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT FORM PANEL ── */}
          <div className="lg:w-[58%] bg-white flex flex-col justify-center p-8 lg:p-14">

            {/* Mode toggle */}
            <div className="flex gap-1 p-1.5 bg-bg-light rounded-2xl border border-border mb-8">
              {[
                { id: "login",  label: "دخول" },
                { id: "signup", label: "حساب جديد" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => switchMode(tab.id)}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    mode === tab.id
                      ? "bg-white text-primary-dark shadow-sm border border-border"
                      : "text-text-muted hover:text-primary-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="animate-fade-up">
              {mode === "login" ? <LoginForm /> : <SignupForm />}
            </div>

            {/* Mobile feature strip */}
            <div className="lg:hidden mt-8 pt-6 border-t border-border">
              <p className="text-xs text-text-muted text-center">
                مجاني بالكامل · موثق بجمعيات خيرية · بدون تحويلات مالية
              </p>
            </div>

            {/* Charity CTA */}
            <div className="mt-6 pt-5 border-t border-border">
              <button
                onClick={() => navigate("/auth/charity")}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl border-2 border-dashed border-secondary/40 text-sm font-semibold text-primary hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group"
              >
                <span className="text-base">🏛️</span>
                <span>هل أنت جمعية خيرية؟ سجّل جمعيتك هنا</span>
                <span className="text-secondary group-hover:translate-x-[-4px] transition-transform duration-300 text-base">←</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AuthPage