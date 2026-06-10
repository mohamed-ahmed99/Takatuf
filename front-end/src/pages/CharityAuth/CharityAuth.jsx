import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthNavbar from "../../components/AuthNavbar"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { IconBuilding, IconSparkles, IconShield, IconUsers, IconCheckCircle } from "../../components/Icons"

function CharityLoginForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = "الإيميل مطلوب"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (Object.keys(newErrors).length) return setErrors(newErrors)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="الإيميل الرسمي للجمعية" name="email" type="email" dir="ltr" placeholder="admin@charity.org" value={form.email} onChange={handleChange} error={errors.email} />
      <Input label="كلمة المرور" name="password" type="password" dir="ltr" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-text-muted cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-border accent-secondary" />
          خليني فاكرك
        </label>
        <a href="#" className="text-secondary font-semibold hover:text-secondary-dark transition-colors">
          نسيت الباسورد؟
        </a>
      </div>
      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">دخول الجمعية</Button>
    </form>
  )
}

function CharitySignupForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    licenseNumber: "", address: "",
    password: "", confirmPassword: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "اسم الجمعية مطلوب"
    if (!form.email.trim()) newErrors.email = "الإيميل مطلوب"
    if (!form.phone.trim()) newErrors.phone = "رقم التليفون مطلوب"
    if (!form.licenseNumber.trim()) newErrors.licenseNumber = "رقم الترخيص مطلوب"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (form.password.length < 6) newErrors.password = "لازم تكون 6 حروف على الأقل"
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "كلمتين المرور مش متطابقتين"
    if (Object.keys(newErrors).length) return setErrors(newErrors)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="اسم الجمعية" name="name" placeholder="اسم الجمعية الخيرية" value={form.name} onChange={handleChange} error={errors.name} />
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="الإيميل الرسمي" name="email" type="email" dir="ltr" placeholder="admin@charity.org" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="رقم التليفون" name="phone" type="tel" dir="ltr" placeholder="0100 000 0000" value={form.phone} onChange={handleChange} error={errors.phone} />
      </div>
      <Input label="رقم الترخيص الرسمي" name="licenseNumber" placeholder="رقم ترخيص وزارة التضامن" value={form.licenseNumber} onChange={handleChange} error={errors.licenseNumber} />
      <Input label="عنوان مقر الجمعية" name="address" placeholder="مقر الجمعية" value={form.address} onChange={handleChange} error={errors.address} />
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="كلمة المرور" name="password" type="password" dir="ltr" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
        <Input label="تأكيد كلمة المرور" name="confirmPassword" type="password" dir="ltr" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
      </div>
      <div className="p-4 bg-secondary/8 rounded-2xl border border-secondary/20 text-sm text-primary-dark leading-relaxed">
        <p className="font-bold mb-1 text-secondary-dark">ملحوظة مهمة:</p>
        بعد التسجيل، هيتم مراجعة طلبك من فريق تكاتف والتأكد من الترخيص قبل تفعيل الحساب.
      </div>
      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">سجّل الجمعية</Button>
    </form>
  )
}

const FEATURES = [
  { icon: IconCheckCircle, text: "توثيق رسمي من وزارة التضامن" },
  { icon: IconUsers,       text: "تواصل مباشر مع المحتاجين والمتبرعين" },
  { icon: IconShield,      text: "إدارة الطلبات بكل شفافية وأمان" },
  { icon: IconSparkles,    text: "إحصائيات وإنجازات الجمعية في بروفايل خاص" },
]

function CharityAuth() {
  const [mode, setMode] = useState("login")
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-light">
      <AuthNavbar />

      <div className="min-h-screen flex items-center justify-center px-4 py-28">
        <div className="w-full max-w-[1120px] flex flex-col lg:flex-row items-stretch rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(5,36,64,0.22)]">

          {/* ── LEFT BRAND PANEL ── */}
          <div className="lg:w-[42%] relative bg-primary-dark flex flex-col justify-between p-10 lg:p-14 overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(150,212,200,0.15)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(150,212,200,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(150,212,200,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-secondary/10 blur-[60px] animate-float-slow pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-secondary/8 blur-[50px] animate-float-medium pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center shadow-lg">
                  <IconBuilding className="w-6 h-6 text-secondary" />
                </div>
                <span className="text-3xl font-black text-secondary tracking-tight">تكاتف</span>
              </div>

              <h2 className="text-2xl lg:text-[1.75rem] font-black text-white leading-[1.2] mb-3">
                {mode === "login" ? (
                  <>أهلاً بالجمعية<br /><span className="text-secondary">في تكاتف 🏛️</span></>
                ) : (
                  <>سجّلوا جمعيتكم<br /><span className="text-secondary">وكونوا جزء منا 🎉</span></>
                )}
              </h2>
              <p className="text-white/55 text-sm leading-relaxed max-w-[320px]">
                {mode === "login"
                  ? "دخول الجمعية لمتابعة الطلبات وإدارة التبرعات والتواصل مع المستفيدين."
                  : "سجلوا جمعيتكم وكونوا شركاء في منظومة تكاتف للخير الموثوق."}
              </p>
            </div>

            <div className="relative z-10 hidden lg:flex flex-col gap-4 mt-10">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-secondary" />
                  </span>
                  <span className="text-white/55 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT FORM PANEL ── */}
          <div className="lg:w-[58%] bg-white flex flex-col justify-center p-8 lg:p-14">
            <div className="flex gap-1 p-1.5 bg-bg-light rounded-2xl border border-border mb-8">
              {[
                { id: "login",  label: "دخول الجمعية" },
                { id: "signup", label: "تسجيل جمعية جديدة" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id)}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    mode === tab.id
                      ? "bg-white text-primary-dark shadow-sm border border-border"
                      : "text-text-muted hover:text-primary-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="animate-fade-up">
              {mode === "login" ? <CharityLoginForm /> : <CharitySignupForm />}
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-text-muted">
                حساب لمتبرع أو محتاج؟{" "}
                <button
                  onClick={() => navigate("/auth")}
                  className="text-secondary font-bold hover:text-secondary-dark transition-colors"
                >
                  اضغط هنا
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CharityAuth