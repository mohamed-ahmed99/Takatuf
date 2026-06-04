import SectionTitle from "../../components/SectionTitle"
import Card from "../../components/Card"
import { IconQuote } from "../../components/Icons"
import useScrollReveal from "../../hooks/useScrollReveal"

const testimonials = [
  {
    quote:
      "كنت محتاج لابتوب عشان أذاكر عليه في الثانوية العامة. نزلت طلب في تكاتف، وفي خلال أسبوع الجمعية كلمتني ووصلتلي الجهاز. الحمد لله.",
    name: "أحمد",
    role: "طالب ثانوية عامة",
  },
  {
    quote:
      "كان عندي كرسي مكتب قديم مش بستخدمه. فكرت أتبرع بيه، نزلته في تكاتف ووصل لأسرة محتاجة. أحساس جميل إنك تعرف إن حاجة بسيطة زي كدة فرحت ناس.",
    name: "سارة",
    role: "متبرعة",
  },
  {
    quote:
      "الجمعية بتاعتنا انضمت لتكاتف ولقينا ناس كتير عايزة تساعد. المنصة سهلة وسريعة وبتوصل التبرعات لمستحقيها بكل شفافية.",
    name: "م. خالد",
    role: "ممثل جمعية خيرية",
  },
]

function TestimonialsSection() {
  const [ref, visible] = useScrollReveal(0.05)

  return (
    <section id="testimonials" className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <SectionTitle
          title="قصص نجاح"
          subtitle="ناس حقيقية، قصص حقيقية — أثر تكاتف في حياتهم"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <Card padding="lg" className="group h-full flex flex-col hover:shadow-xl hover:shadow-black/5 relative border-0 shadow-lg shadow-black/5">
                {/* Decorative quote mark */}
                <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                  <IconQuote className="w-5 h-5 text-secondary/30" />
                </div>

                <div className="flex-1">
                  <p className="text-text-dark leading-relaxed text-sm mb-6 relative z-10">
                    {t.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-5 border-t border-border/60 mt-auto">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white font-bold rounded-xl text-sm shrink-0 shadow-md shadow-primary/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
