import SectionTitle from "../../components/SectionTitle"
import Card from "../../components/Card"
import { IconPencil, IconHandshake, IconCheckCircle } from "../../components/Icons"
import useScrollReveal from "../../hooks/useScrollReveal"

const steps = [
  {
    icon: IconPencil,
    number: "١",
    title: "ينشر المحتاج طلبه",
    description:
      "المحتاج بكتب طلب بسيط بالحاجة اللي محتاجها (كرسي، لابتوب، موبايل، ملابس) ويحدد الجمعية الخيرية اللي هيستلم منها التبرع.",
  },
  {
    icon: IconHandshake,
    number: "٢",
    title: "الناس تتضامن وتتبرع",
    description:
      "المجتمع بيدعم الطلب بـ 'تضامن' عشان ينتشر، والمتبرع اللي عنده الحاجة أو يقدر يشتريها يتواصل مع الجمعية.",
  },
  {
    icon: IconCheckCircle,
    number: "٣",
    title: "الجمعية توصل التبرع",
    description:
      "الجمعية بتتأكد من حالة المحتاج، تستلم التبرع من المتبرع، وتوصله بأمان وثقة للمستحق.",
  },
]

function HowItWorksSection() {
  const [ref, visible] = useScrollReveal(0.1)

  return (
    <section id="how-it-works" className="py-28 px-6 bg-white relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <SectionTitle
          title="إزاي تكاتف بتشتغل؟"
          subtitle="تلات خطوات بسيطة تخليك جزء من التكافل الاجتماعي"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[72px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-0.5 bg-gradient-to-r from-secondary/10 via-secondary/40 to-secondary/10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full animate-pulse" />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className={`transition-all duration-800 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <Card
                  hoverable
                  padding="lg"
                  glow={visible}
                  className="text-center relative group h-full border-0 shadow-lg shadow-black/5"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-gradient-to-br from-secondary to-secondary-dark text-primary text-sm font-extrabold rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 z-10">
                    {step.number}
                  </div>

                  {/* Icon circle */}
                  <div className="flex items-center justify-center mb-6 mt-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary/25 via-secondary/10 to-transparent text-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-secondary/20 transition-all duration-400">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm">{step.description}</p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
