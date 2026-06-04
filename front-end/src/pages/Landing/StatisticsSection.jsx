import SectionTitle from "../../components/SectionTitle"
import useScrollReveal from "../../hooks/useScrollReveal"
import { IconUsers, IconBuilding, IconCheckCircle, IconFileText } from "../../components/Icons"

const stats = [
  { icon: IconUsers, number: "+١٢٠", label: "مستفيد" },
  { icon: IconBuilding, number: "+٨", label: "جمعية خيرية" },
  { icon: IconCheckCircle, number: "+٤٠", label: "تبرع مكتمل" },
  { icon: IconFileText, number: "+١٥", label: "بوست منشور" },
]

function StatisticsSection() {
  const [ref, visible] = useScrollReveal(0.05)

  return (
    <section id="statistics" className="py-28 px-6 relative overflow-hidden bg-gradient-to-br from-primary via-[#0a3d5e] to-primary">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-40 h-40 bg-secondary/5 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-[10%] w-60 h-60 bg-secondary/5 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
      </div>

      {/* Light grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <SectionTitle
          title="تكاتف بالأرقام"
          subtitle="كل رقم هنا بيعبر عن أثر حقيقي في حياة ناس"
          light
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className={`text-center p-6 lg:p-8 bg-white/5 backdrop-blur-xl border border-white/8 rounded-2xl hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 group ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/8 text-secondary rounded-xl mb-5 group-hover:scale-110 group-hover:bg-secondary/15 transition-all duration-400">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="block text-3xl md:text-4xl font-black text-secondary mb-1 tracking-tight">
                  {s.number}
                </span>
                <span className="text-sm text-white/60">{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection
