import { useNavigate } from "react-router-dom"

import { IconHeart, IconUsers, IconBuilding, IconSparkles, IconShield } from "../../components/Icons"
import logoSrc from "../../assets/logo.png"

function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-dark pt-[72px]">

      {/* ── Deep layered background ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_-10%,rgba(150,212,200,0.14)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_90%,rgba(150,212,200,0.07)_0%,transparent_70%)]" />

      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(150,212,200,0.9) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Animated ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full bg-secondary/10 blur-[120px] animate-blob"
          style={{ width: 700, height: 700, top: "-15%", right: "-10%", animationDuration: "16s" }}
        />
        <div
          className="absolute rounded-full bg-secondary/6 blur-[100px] animate-blob"
          style={{ width: 500, height: 500, bottom: "-10%", left: "-8%", animationDelay: "5s", animationDuration: "20s" }}
        />
        <div
          className="absolute rounded-full bg-white/4 blur-[80px] animate-float-slow"
          style={{ width: 300, height: 300, top: "40%", left: "20%" }}
        />
      </div>

      {/* ── Accent edge lines ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-dark to-transparent pointer-events-none" />

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Text Block ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-right order-2 lg:order-1">

            {/* Animated badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full border border-secondary/25 bg-white/5 backdrop-blur-sm text-secondary text-xs font-semibold tracking-wide animate-fade-up shadow-[0_0_20px_rgba(150,212,200,0.08)]">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-60" />
                <span className="relative rounded-full bg-secondary w-2 h-2" />
              </span>
              منصة تطوعية خيرية مصرية
              <span className="w-px h-3 bg-secondary/30" />
              <IconSparkles className="w-3.5 h-3.5 opacity-80" />
            </div>

            {/* Headline */}
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[3.6rem] xl:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6 animate-fade-up [animation-delay:150ms] [animation-fill-mode:both]">
              <span className="block">عندك حاجة</span>
              <span className="block mt-1">
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary-light via-secondary to-secondary-dark">
                    مش محتاجها
                  </span>
                  {/* Underline glow */}
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-l from-secondary/60 to-transparent" />
                </span>
                <span className="text-white">؟</span>
              </span>
              <span className="block mt-1 text-white/85">
                هي لغيرك{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary to-white font-black">
                  أمل
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-[500px] mb-10 animate-fade-up [animation-delay:300ms] [animation-fill-mode:both]">
              في مصر ناس كتير محتاجة حاجات بسيطة — وناس تانية عندها الحاجات دي مش بتستخدمها.{" "}
              <span className="text-secondary font-semibold">تكاتف</span>{" "}
              بتجمعهم في منصة واحدة عشان نوصل الخير بكل ثقة وأمان.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14 animate-fade-up [animation-delay:450ms] [animation-fill-mode:both]">
              <button
                onClick={() => navigate("/auth?tab=signup")}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base text-primary-dark bg-secondary overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_0_30px_rgba(150,212,200,0.3)] hover:shadow-[0_0_50px_rgba(150,212,200,0.5)]"
              >
                <span className="absolute inset-0 bg-gradient-to-l from-secondary-light to-secondary opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-2">
                  <IconSparkles className="w-4.5 h-4.5" />
                  ابدأ رحلة الخير
                </span>
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base text-white border border-white/20 bg-white/5 backdrop-blur-sm hover:border-secondary/50 hover:bg-secondary/8 transition-all duration-500 hover:-translate-y-0.5"
              >
                تسجيل الدخول
              </button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 sm:gap-12 flex-wrap animate-fade-up [animation-delay:600ms] [animation-fill-mode:both]">
              {[
                { num: "+١٢٠", label: "مستفيد", icon: IconUsers },
                { num: "+٨", label: "جمعية خيرية", icon: IconBuilding },
                { num: "+٤٠", label: "تبرع مكتمل", icon: IconHeart },
              ].map((s) => (
                <div key={s.label} className="group text-center cursor-default">
                  <div className="flex items-center gap-1.5 justify-center mb-0.5">
                    <s.icon className="w-3.5 h-3.5 text-secondary/60 group-hover:text-secondary transition-colors duration-300" />
                    <span className="text-2xl sm:text-3xl font-black text-secondary group-hover:drop-shadow-[0_0_12px_rgba(150,212,200,0.7)] transition-all duration-500">
                      {s.num}
                    </span>
                  </div>
                  <span className="text-xs text-white/40 font-medium group-hover:text-white/60 transition-colors duration-300">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Visual / Ecosystem ── */}
          <div className="relative h-[480px] lg:h-[560px] order-1 lg:order-2 animate-fade-up [animation-delay:200ms] [animation-fill-mode:both]">

            {/* Outer rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[380px] h-[380px] rounded-full border border-secondary/8 animate-float-slow" />
              <div className="absolute w-[280px] h-[280px] rounded-full border border-secondary/12" style={{ animation: "float-medium 7s ease-in-out infinite reverse" }} />
            </div>

            {/* Center logo node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-secondary/20 rounded-3xl blur-2xl scale-150 animate-pulse-soft" />
                {/* Card */}
                <div className="relative w-28 h-28 bg-gradient-to-br from-primary-light to-primary-dark rounded-3xl border border-secondary/25 shadow-2xl flex items-center justify-center overflow-hidden">
                  <img src={logoSrc} alt="تكاتف" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* SVG connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 480" fill="none">
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(150,212,200,0)" />
                  <stop offset="50%" stopColor="rgba(150,212,200,0.5)" />
                  <stop offset="100%" stopColor="rgba(150,212,200,0)" />
                </linearGradient>
                <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(150,212,200,0)" />
                  <stop offset="50%" stopColor="rgba(150,212,200,0.5)" />
                  <stop offset="100%" stopColor="rgba(150,212,200,0)" />
                </linearGradient>
                <linearGradient id="lg3" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgba(150,212,200,0)" />
                  <stop offset="50%" stopColor="rgba(150,212,200,0.5)" />
                  <stop offset="100%" stopColor="rgba(150,212,200,0)" />
                </linearGradient>
              </defs>
              {/* Lines from center to cards */}
              <line x1="240" y1="240" x2="100" y2="100" stroke="url(#lg1)" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="240" y1="240" x2="390" y2="130" stroke="url(#lg2)" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="240" y1="240" x2="240" y2="410" stroke="url(#lg3)" strokeWidth="1.5" strokeDasharray="6 4" />
              {/* Dots at endpoints */}
              <circle cx="240" cy="240" r="4" fill="rgba(150,212,200,0.9)" />
              <circle cx="100" cy="100" r="2.5" fill="rgba(150,212,200,0.6)" />
              <circle cx="390" cy="130" r="2.5" fill="rgba(150,212,200,0.6)" />
              <circle cx="240" cy="410" r="2.5" fill="rgba(150,212,200,0.6)" />
            </svg>

            {/* ── Floating role cards ── */}
            {/* Card 1: محتاج – top-left */}
            <div className="absolute top-[5%] left-[2%] animate-float-slow" style={{ animationDelay: "0s" }}>
              <div className="glass-panel-dark rounded-2xl px-4 py-3 flex items-center gap-3 border border-secondary/15 hover:border-secondary/35 transition-all duration-500 hover:-translate-y-1 group shadow-xl">
                <span className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 group-hover:bg-secondary/25 transition-colors duration-300">
                  <IconUsers className="w-5 h-5 text-secondary" />
                </span>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">المحتاج</p>
                  <p className="text-white/40 text-xs">بينشر طلبه بأمان</p>
                </div>
              </div>
            </div>

            {/* Card 2: جمعية – top-right */}
            <div className="absolute top-[10%] right-[0%] animate-float-medium" style={{ animationDelay: "1.5s" }}>
              <div className="glass-panel-dark rounded-2xl px-4 py-3 flex items-center gap-3 border border-secondary/15 hover:border-secondary/35 transition-all duration-500 hover:-translate-y-1 group shadow-xl">
                <span className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 group-hover:bg-secondary/25 transition-colors duration-300">
                  <IconBuilding className="w-5 h-5 text-secondary" />
                </span>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">الجمعية الخيرية</p>
                  <p className="text-white/40 text-xs">بتوثق وتضمن</p>
                </div>
              </div>
            </div>

            {/* Card 3: متبرع – bottom-center */}
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 animate-float-fast" style={{ animationDelay: "2s" }}>
              <div className="glass-panel-dark rounded-2xl px-4 py-3 flex items-center gap-3 border border-secondary/15 hover:border-secondary/35 transition-all duration-500 hover:-translate-y-1 group shadow-xl">
                <span className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 group-hover:bg-secondary/25 transition-colors duration-300">
                  <IconHeart className="w-5 h-5 text-secondary" />
                </span>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">المتبرع</p>
                  <p className="text-white/40 text-xs">بيتبرع بالحاجة</p>
                </div>
              </div>
            </div>

            {/* Card 4: Floating notification – right middle */}
            <div className="absolute top-[48%] right-[3%] animate-float-slow" style={{ animationDelay: "3s" }}>
              <div className="glass-panel-dark rounded-2xl px-4 py-3 border border-secondary/15 shadow-xl min-w-[170px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-bold">تم التسليم!</span>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">
                  وصل الـ لابتوب لأحمد<br />
                  <span className="text-secondary">✓ عن طريق رسالة</span>
                </p>
              </div>
            </div>

            {/* Trust badge */}
            <div className="absolute top-[58%] left-[2%] animate-float-medium" style={{ animationDelay: "4s" }}>
              <div className="glass-panel-dark rounded-2xl px-3 py-2.5 flex items-center gap-2 border border-secondary/15 shadow-xl">
                <IconShield className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-white/70 text-xs font-medium whitespace-nowrap">آمن ومضمون 100%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
