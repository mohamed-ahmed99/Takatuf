import SectionTitle from "../../components/SectionTitle"
import { IconQuote } from "../../components/Icons"
import useScrollReveal from "../../hooks/useScrollReveal"

const testimonials = [
  {
    quote:
      "كنت محتاج لابتوب عشان أذاكر عليه في الثانوية العامة. نزلت طلب في تكاتف، وفي خلال أسبوع الجمعية كلمتني ووصلتلي الجهاز. الحمد لله.",
    name: "أحمد منصور",
    role: "طالب ثانوية عامة",
  },
  {
    quote:
      "كان عندي كرسي مكتب قديم مش بستخدمه. فكرت أتبرع بيه، نزلته في تكاتف ووصل لأسرة محتاجة. إحساس جميل إنك تعرف إن حاجة بسيطة زي كدة فرحت ناس بجد.",
    name: "سارة عبد الرحمن",
    role: "متبرعة نشطة",
  },
  {
    quote:
      "الجمعية بتاعتنا انضمت لتكاتف ولقينا ناس كتير عايزة تساعد. المنصة سهلة وسريعة وبتوصل التبرعات لمستحقيها بكل شفافية وأمان.",
    name: "م. خالد يوسف",
    role: "ممثل جمعية رسالة",
  },
]

function TestimonialsSection() {
  const [ref, visible] = useScrollReveal(0.05)

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 bg-bg-light relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-light/30 blur-[120px] mix-blend-multiply opacity-60 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-light/20 blur-[100px] mix-blend-multiply opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div ref={ref} className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-up">
          <SectionTitle
            title={<span className="text-4xl md:text-5xl font-black text-primary-dark">قصص من تكاتف</span>}
            subtitle={<span className="text-lg text-text-muted mt-4 block">حكايات حقيقية من ناس تكاتف فرقت في حياتهم</span>}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative transition-all duration-1000 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="glass-panel rounded-3xl p-8 h-full flex flex-col group hover:-translate-y-3 hover:shadow-[0_20px_50px_-15px_rgba(5,36,64,0.15)] transition-all duration-500 border border-white/80">
                
                {/* Large Quote Icon Watermark */}
                <IconQuote className="absolute top-6 left-6 w-24 h-24 text-secondary/5 -z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700" />
                
                {/* Floating Quote Badge */}
                <div className="absolute -top-5 right-8 w-10 h-10 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 z-20">
                  <IconQuote className="w-5 h-5 text-white drop-shadow-sm" />
                </div>

                <div className="flex-1 mt-4">
                  <p className="text-text-dark leading-relaxed text-[16px] font-medium relative z-10 mb-8">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200/60 mt-auto">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary-light rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                    <div className="w-14 h-14 flex items-center justify-center bg-white border border-gray-100 text-primary-dark font-black rounded-2xl text-xl shrink-0 relative z-10">
                      {t.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-primary-dark text-lg group-hover:text-primary transition-colors">{t.name}</p>
                    <p className="text-sm text-secondary-dark font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
