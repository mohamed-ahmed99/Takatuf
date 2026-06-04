import SectionTitle from "../../components/SectionTitle"
import Card from "../../components/Card"
import useScrollReveal from "../../hooks/useScrollReveal"
import { IconGift, IconShield, IconEyeOff, IconMapPin, IconHeart, IconBan } from "../../components/Icons"

const features = [
  {
    icon: IconGift,
    title: "مجاني بالكامل",
    description: "التطوع والمشاركة في تكاتف مجاني بدون أي مصاريف أو عمولات. كل اللي بنسعاه هو توصيل الخير.",
  },
  {
    icon: IconShield,
    title: "آمن وموثق",
    description: "كل الطلبات بتعدي على جمعيات خيرية موثقة بتتأكد من صحة الحالة قبل التوصيل.",
  },
  {
    icon: IconEyeOff,
    title: "هوية مجهولة",
    description: "تقدر تنشر طلبك بهوية مجهولة مع ضمان الجمعية الخيرية، وخصوصيتك في أمان.",
  },
  {
    icon: IconMapPin,
    title: "تغطية جغرافية",
    description: "البوستات بتظهر على مستوي الإدارة، المحافظة، أو مصر كلها — حسب رغبتك.",
  },
  {
    icon: IconHeart,
    title: "تضامن اجتماعي",
    description: "دعم الطلبات بـ 'تضامن' يخليها تنتشر أكتر والناس كلها تشوفها وتساعد.",
  },
  {
    icon: IconBan,
    title: "بدون تحويلات مالية",
    description: "تكاتف منصة تطوعية بحتة — مفيش أي فلوس بتتحول عبر الموقع خالص.",
  },
]

function FeaturesSection() {
  const [ref, visible] = useScrollReveal(0.05)

  return (
    <section id="features" className="py-28 px-6 bg-bg-light relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <SectionTitle
          title="مميزات تكاتف"
          subtitle="صممنا المنصة عشان تكون سهلة، آمنة، وكلها ثقة"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className={`transition-all duration-700 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Card hoverable padding="lg" className="text-center group h-full border-0 shadow-md shadow-black/5">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary rounded-2xl mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all duration-400">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3">{f.title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm">{f.description}</p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
