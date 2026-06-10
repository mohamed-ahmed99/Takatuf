import { IconHeart } from "../../components/Icons"
import logoSrc from "../../assets/logo.png"

function FooterSection() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white py-16 md:py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/3 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <img src={logoSrc} alt="تكاتف" className="w-11 h-11 rounded-xl object-cover shadow-lg shadow-secondary/20" />
              <span className="text-2xl font-extrabold text-secondary">تكاتف</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              منصة معمولة للخير بتوصل اللي محتاج باللي عايز يتبرع عن طريق الجمعيات الخيرية. مع بعض بنعمل خير بجد.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-secondary mb-5 text-sm tracking-wide">روابط سريعة</h4>
            <ul className="space-y-3.5">
              {[
                { href: "#how-it-works", label: "إزاي بتشتغل" },
                { href: "#features", label: "ليه تكاتف" },
                { href: "#statistics", label: "تكاتف بالأرقام" },
                { href: "#testimonials", label: "قصص من تكاتف" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-secondary transition-all duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full group-hover:bg-secondary transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-secondary mb-5 text-sm tracking-wide">محتاج مساعدة؟</h4>
            <ul className="space-y-3.5">
              {["الأسئلة الشائعة", "سياسة الخصوصية", "شروط الاستخدام"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-secondary transition-all duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full group-hover:bg-secondary transition-colors duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-secondary mb-5 text-sm tracking-wide">كلمونا</h4>
            <ul className="space-y-3.5">
              {["info@takatuf.org", "0100 000 0000", "القاهرة، مصر"].map((item) => (
                <li key={item} className="text-white/50 text-sm inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary/30 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {year} تكاتف — كل الحقوق محفوظة</p>
          <p className="inline-flex items-center gap-1.5">
            اتعمل بحب <IconHeart className="w-4 h-4 text-red-400/80" /> عشان الخير
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
