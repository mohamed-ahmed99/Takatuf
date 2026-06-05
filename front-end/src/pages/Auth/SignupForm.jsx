import { useState } from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"

const roles = [
  { value: "user", label: "مستخدم (محتاج / متبرع)" },
  { value: "charity", label: "جمعية خيرية" },
]

function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "الاسم مطلوب"
    if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    if (!form.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (form.password.length < 6) newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "كلمة المرور غير متطابقة"

    if (Object.keys(newErrors).length) return setErrors(newErrors)

    setLoading(true)
    // API call here
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Role selector */}
      <div className="flex gap-3 p-1.5 bg-bg-light rounded-xl border border-border">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            name="role"
            value={r.value}
            onClick={(e) => handleChange({ target: { name: "role", value: r.value } })}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              form.role === r.value
                ? "bg-white text-primary shadow-sm shadow-black/5 border border-border"
                : "text-text-muted hover:text-primary"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <Input
        label="الاسم"
        name="name"
        placeholder="الاسم بالكامل"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
      />

      <Input
        label="البريد الإلكتروني"
        name="email"
        type="email"
        dir="ltr"
        placeholder="example@email.com"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="رقم الهاتف"
        name="phone"
        type="tel"
        dir="ltr"
        placeholder="0100 000 0000"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <Input
        label="كلمة المرور"
        name="password"
        type="password"
        dir="ltr"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Input
        label="تأكيد كلمة المرور"
        name="confirmPassword"
        type="password"
        dir="ltr"
        placeholder="••••••••"
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        إنشاء الحساب
      </Button>
    </form>
  )
}

export default SignupForm
