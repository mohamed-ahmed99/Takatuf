import { useState } from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"

function LoginForm() {
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
    if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (Object.keys(newErrors).length) return setErrors(newErrors)

    setLoading(true)
    // API call here
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        label="كلمة المرور"
        name="password"
        type="password"
        dir="ltr"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-text-muted cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-border accent-secondary" />
          تذكرني
        </label>
        <a href="#" className="text-secondary font-medium hover:text-secondary-dark transition-colors">
          نسيت كلمة المرور؟
        </a>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        تسجيل الدخول
      </Button>
    </form>
  )
}

export default LoginForm



