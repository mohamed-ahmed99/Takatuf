import SectionTitle from "../../components/SectionTitle"
import { IconPencil, IconHandshake, IconCheckCircle } from "../../components/Icons"
import useScrollReveal from "../../hooks/useScrollReveal"

const steps = [
  {
    icon: IconPencil,
    number: "١",
    title: "بتنزل طلبك",
    description:
      "بتكتب طلب بسيط بالحاجة اللي إنت محتاجها (كرسي، لابتوب، هدوم) وتختار الجمعية اللي تستلم منها.",
  },
  {
    icon: IconHandshake,
    number: "٢",
    title: "الناس بتساعد",
    description:
      "الناس بتعمل 'تضامن' عشان الطلب ينتشر، واللي عنده الحاجة بيتواصل مع الجمعية عشان يتبرع بيها.",
  },
  {
    icon: IconCheckCircle,
    number: "٣",
    title: "الجمعية بتوصل التبرع",
    description:
      "الجمعية بتتأكد من الحالة، تستلم الحاجة من المتبرع وتوصلها لحد عندك بأمان.",
  },
]

function HowItWorksSection() {
  const [ref, visible] = useScrollReveal(0.1)

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary-light/20 blur-[100px] animate-blob" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-primary-light/10 blur-[120px] animate-blob" style={{ animationDelay: '5s' }}></div>
      </div>

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-24 animate-fade-up">
          <SectionTitle
            title={<span className="text-4xl md:text-5xl font-black text-primary-dark">إزاي تكاتف بتشتغل؟</span>}
            subtitle={<span className="text-lg text-text-muted mt-4 block">تلات خطوات سهلة تخليك جزء من عيلة تكاتف</span>}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[80px] left-[calc(16.66%+30px)] right-[calc(16.66%+30px)] h-[3px] bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-secondary-light via-secondary to-secondary-dark rounded-full transition-all duration-[2000ms] ease-in-out ${visible ? 'w-full' : 'w-0'}`}></div>
            <div className="absolute top-0 right-0 h-full w-[100px] bg-white/50 blur-sm animate-shimmer"></div>
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className={`relative transition-all duration-1000 ease-out ${
                  visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{ transitionDelay: `${i * 300}ms` }}
              >
                <div className="flex flex-col items-center group">
                  {/* Glowing Icon Node */}
                  <div className="relative z-10 mb-8">
                    <div className="absolute inset-0 bg-secondary rounded-2xl blur-lg opacity-40 group-hover:opacity-70 group-hover:scale-125 transition-all duration-500"></div>
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(5,36,64,0.15)] flex items-center justify-center relative z-20 border border-gray-100 group-hover:-translate-y-2 transition-transform duration-500">
                      <Icon className="w-10 h-10 text-primary-dark group-hover:text-secondary-dark transition-colors duration-300" />
                      
                      {/* Floating Number Badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-secondary to-secondary-dark text-white font-bold rounded-full flex items-center justify-center shadow-lg shadow-secondary/40 border-2 border-white">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(5,36,64,0.08)] transition-all duration-500 flex-1">
                    <h3 className="text-2xl font-bold text-primary-dark mb-4">{step.title}</h3>
                    <p className="text-text-muted leading-relaxed text-[15px]">{step.description}</p>
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

export default HowItWorksSection
