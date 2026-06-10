import SectionTitle from "../../components/SectionTitle"
import useScrollReveal from "../../hooks/useScrollReveal"
import { IconGift, IconShield, IconEyeOff, IconMapPin, IconHeart, IconBan } from "../../components/Icons"

const features = [
  {
    icon: IconGift,
    title: "ببلاش 100%",
    description: "مفيش أي فلوس أو عمولات. هدفنا الوحيد نوصل الخير للي محتاجه.",
  },
  {
    icon: IconShield,
    title: "أمان ومضمون",
    description: "كل الطلبات بتعدي على جمعيات خيرية مضمونة بتتأكد من الحالة قبل ما توصل الحاجة عشان نضمن الأمان.",
  },
  {
    icon: IconEyeOff,
    title: "هويتك في أمان",
    description: "تقدر تنزل طلبك من غير ما اسمك يبان، والجمعية بتضمنك وخصوصيتك محفوظة.",
  },
  {
    icon: IconMapPin,
    title: "بنوصل لكل مكان",
    description: "بوستاتك بتظهر في منطقتك، محافظتك، أو مصر كلها عشان توصل لأكبر عدد يقدر يساعد.",
  },
  {
    icon: IconHeart,
    title: "كلنا بنسند بعض",
    description: "لما تدوس 'تضامن' على أي طلب، بيتشاف أكتر والناس بتساعد أسرع.",
  },
  {
    icon: IconBan,
    title: "من غير أي فلوس",
    description: "تكاتف معمولة للخير وبس — مفيش أي فلوس بتتحول على الموقع، التبرعات كلها عينية.",
  },
]

function FeaturesSection() {
  const [ref, visible] = useScrollReveal(0.05)

  return (
    <section id="features" className="py-24 md:py-32 px-6 bg-bg-light relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-secondary-light/30 blur-[100px] mix-blend-multiply opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-light/40 blur-[120px] mix-blend-multiply opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
      </div>

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-up">
          <SectionTitle
            title={<span className="text-4xl md:text-5xl font-black text-primary-dark">إيه اللي بيميزنا؟</span>}
            subtitle={<span className="text-lg text-text-muted mt-4 block">عملنا المنصة عشان تكون سهلة وأمان وكلها ثقة</span>}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className={`transition-all duration-1000 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="glass-panel h-full rounded-3xl p-8 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(5,36,64,0.1)] transition-all duration-500 border border-white/60 relative overflow-hidden">
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon Container */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-white shadow-sm border border-gray-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-500 z-10">
                    <div className="absolute inset-0 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-colors duration-500"></div>
                    <Icon className="w-8 h-8 text-secondary-dark relative z-10 drop-shadow-sm" />
                  </div>

                  <h3 className="text-xl font-bold text-primary-dark mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                  <p className="text-text-muted leading-relaxed text-[15px] relative z-10">{f.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
