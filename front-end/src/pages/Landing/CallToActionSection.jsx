import Button from "../../components/Button"
import { IconSparkles, IconArrowLeft } from "../../components/Icons"
import useScrollReveal from "../../hooks/useScrollReveal"

function CallToActionSection() {
  const [ref, visible] = useScrollReveal(0.1)

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-bg-light to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div ref={ref} className="max-w-[750px] mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-800 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-secondary/20 to-secondary/10 text-primary text-sm font-semibold rounded-full mb-6 shadow-sm">
            <IconSparkles className="w-4 h-4" />
            انضم لعائلة تكاتف
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-6 leading-tight">
            حان وقت{" "}
            <span className="text-secondary relative">
              الخير
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-secondary/20 rounded-full blur-sm" />
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-12 max-w-[600px] mx-auto">
            كل واحد فينا عنده حاجة بسيطة ممكن تغير حياة حد تاني.
            {" "}<span className="text-primary font-semibold">انضم لـ تكاتف</span> وكن جزء من التكافل الاجتماعي.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="secondary" size="xl" className="shadow-xl shadow-secondary/20">
              <IconSparkles className="w-5 h-5" />
              سجل دلوقتي
            </Button>
            <Button variant="outline-secondary" size="xl">
              تواصل معانا
              <IconArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
