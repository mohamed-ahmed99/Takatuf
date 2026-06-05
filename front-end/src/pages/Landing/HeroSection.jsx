import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"

function HeroSection() {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[#0a3d5e] to-[#0d4f6e] pt-[72px]">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-secondary/12 to-transparent rounded-full -top-80 -left-60 animate-float-slow opacity-70" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-secondary/8 to-transparent rounded-full -bottom-40 -right-40 animate-float-medium opacity-60" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-l from-white/5 to-transparent rounded-full top-1/4 right-[20%] animate-float-fast opacity-40" />
        <div className="absolute w-[200px] h-[200px] bg-secondary/10 rounded-full bottom-1/3 left-[15%] animate-float-slow opacity-50" />
        <div className="absolute w-[120px] h-[120px] bg-white/5 rounded-full top-[15%] left-[25%] animate-float-medium opacity-30" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 text-center max-w-[950px] px-6 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/8 backdrop-blur-xl border border-white/12 rounded-full text-secondary text-sm font-semibold mb-8 animate-fade-up">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-40" />
            <span className="relative bg-secondary rounded-full w-2 h-2" />
          </span>
          منصة تطوعية خيرية مصرية
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 animate-fade-up [animation-delay:150ms] [animation-fill-mode:both]">
          <span className="block">
            عندك حاجة{" "}
            <span className="relative">
              <span className="text-secondary">مش محتاجها</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-secondary/20 rounded-full blur-sm" />
            </span>
            ؟
          </span>
          <span className="block mt-2">
            هي بالنسبة لغيرك{" "}
            <span className="text-secondary">حلم</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-[700px] mx-auto animate-fade-up [animation-delay:300ms] [animation-fill-mode:both]">
          <strong className="text-secondary font-bold">تكاتف</strong> بتجمع المحتاجين بالمتبرعين
          والجمعيات الخيرية في منصة واحدة.
          عايز كرسي؟ لابتوب؟ موبايل؟{" "}
          <span className="text-white/90 font-medium">احنا نوصل الخير لمستحقيه.</span>
          <br />
          <span className="text-white/40 text-sm">بدون أي تحويلات مالية — تطوعي بالكامل</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-20 animate-fade-up [animation-delay:450ms] [animation-fill-mode:both]">
          <Button variant="secondary" size="xl" className="shadow-xl shadow-secondary/20" onClick={() => navigate("/auth?tab=signup")}>
            انضم كمتبرع
          </Button>
          <Button variant="outline-secondary" size="xl" onClick={() => navigate("/auth?tab=signup")}>
            أنا محتاج
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap animate-fade-up [animation-delay:600ms] [animation-fill-mode:both]">
          <div className="text-center group">
            <span className="block text-3xl md:text-4xl font-extrabold text-secondary mb-1 transition-all duration-300 group-hover:scale-110">+١٢٠</span>
            <span className="text-sm text-white/50">مستفيد</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="text-center group">
            <span className="block text-3xl md:text-4xl font-extrabold text-secondary mb-1 transition-all duration-300 group-hover:scale-110">+٨</span>
            <span className="text-sm text-white/50">جمعية خيرية</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block" />
          <div className="text-center group">
            <span className="block text-3xl md:text-4xl font-extrabold text-secondary mb-1 transition-all duration-300 group-hover:scale-110">+٤٠</span>
            <span className="text-sm text-white/50">تبرع مكتمل</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
