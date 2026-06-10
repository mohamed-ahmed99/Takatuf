import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { IconSparkles, IconArrowLeft } from "../../components/Icons"
import useScrollReveal from "../../hooks/useScrollReveal"

function CallToActionSection() {
  const [ref, visible] = useScrollReveal(0.1)
  const navigate = useNavigate()

  return (
    <section className="py-24 md:py-32 px-6 bg-bg-light relative overflow-hidden">
      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        
        <div
          className={`relative rounded-[3rem] overflow-hidden transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
          }`}
        >
          {/* Deep Immersive Gradient Background */}
          <div className="absolute inset-0 bg-primary-dark"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-light)_0%,_transparent_80%)] opacity-80"></div>
          
          {/* Floating Blob Accents */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary-dark/40 blur-[100px] rounded-full mix-blend-screen animate-blob"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/20 blur-[120px] rounded-full mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>

          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="relative z-20 px-6 py-20 md:py-28 text-center flex flex-col items-center justify-center">
            
            {/* Glowing Badge */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2 border border-secondary/30 bg-secondary/10 backdrop-blur-xl text-secondary-light text-sm font-bold rounded-full mb-8 shadow-[0_0_20px_rgba(150,212,200,0.2)]">
              <IconSparkles className="w-5 h-5 text-accent animate-pulse" />
              انضم لعيلة تكاتف
            </div>

            {/* Massive Title */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.2] tracking-tight max-w-[800px]">
              يلا نعمل{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">خير</span>
                <span className="absolute -bottom-2 left-0 right-0 h-4 bg-accent/50 -rotate-2 scale-110 -z-10 blur-[4px]"></span>
              </span>
            </h2>

            {/* Subtle Description */}
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-[600px] font-medium">
              كل واحد فينا عنده حاجة بسيطة ممكن تفرح حد تاني وتغير حياته.
              {" "}<span className="text-white font-bold">انضم لـ تكاتف</span> وخليك جزء من مجتمع بيسند بعضه بجد.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="xl" 
                className="w-full sm:w-auto px-10 py-4 text-lg font-bold shadow-[0_0_40px_-10px_var(--color-secondary)] hover:shadow-[0_0_60px_-15px_var(--color-secondary)] hover:-translate-y-1 transition-all duration-500"
                onClick={() => navigate("/auth?tab=signup")}
              >
                <IconSparkles className="w-5 h-5 ml-2 inline-block" />
                سجل دلوقتي
              </Button>
              <Button 
                variant="outline-secondary" 
                size="xl" 
                className="w-full sm:w-auto px-10 py-4 text-lg font-semibold bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-white"
              >
                كلمونا
                <IconArrowLeft className="w-5 h-5 mr-2 inline-block" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
