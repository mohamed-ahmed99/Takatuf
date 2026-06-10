import SectionTitle from "../../components/SectionTitle"
import useScrollReveal from "../../hooks/useScrollReveal"
import { IconUsers, IconBuilding, IconCheckCircle, IconFileText } from "../../components/Icons"

const stats = [
  { icon: IconUsers, number: "+١٢٠", label: "مستفيد ساعدناه", prefix: "فرد" },
  { icon: IconBuilding, number: "+٨", label: "جمعية شغالة معانا", prefix: "مؤسسة" },
  { icon: IconCheckCircle, number: "+٤٠", label: "تبرع وصل للي يستحقه", prefix: "حالة" },
  { icon: IconFileText, number: "+١٥", label: "طلب مساعدة", prefix: "طلب" },
]

function StatisticsSection() {
  const [ref, visible] = useScrollReveal(0.05)

  return (
    <section id="statistics" className="py-24 md:py-32 px-6 relative overflow-hidden bg-primary-dark">
      {/* Animated Deep Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-primary-light)_0%,_transparent_70%)] opacity-30"></div>
        
        {/* Floating Particles/Blobs */}
        <div className="absolute top-[20%] left-[15%] w-[30vw] h-[30vw] rounded-full bg-secondary-dark/10 blur-[80px] animate-blob mix-blend-screen" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[100px] animate-blob mix-blend-screen" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
      </div>

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-up">
          <SectionTitle
            title={<span className="text-4xl md:text-5xl font-black text-white">تكاتف بالأرقام</span>}
            subtitle={<span className="text-lg text-white/70 mt-4 block">كل رقم هنا بيعبر عن قصة حقيقية غيرت حياة حد للأحسن</span>}
            light
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className={`group relative ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
                style={{ transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms` }}
              >
                {/* Background Glow on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-secondary/30 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Glass Card */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 lg:p-10 glass-panel-dark rounded-3xl border border-white/10 group-hover:border-secondary/30 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  
                  {/* Subtle Inner Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 text-secondary rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-secondary/10 group-hover:text-white transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <Icon className="w-8 h-8 drop-shadow-md" />
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="block text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70 tracking-tight group-hover:from-secondary group-hover:to-white transition-all duration-500">
                        {s.number}
                      </span>
                    </div>
                    
                    <span className="text-sm md:text-base font-medium text-white/50 group-hover:text-white/80 transition-colors duration-300 text-center">
                      {s.label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
