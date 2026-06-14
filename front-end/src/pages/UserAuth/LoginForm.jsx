import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useToast } from "../../context/ToastContext"
import { useAuth } from "../../context/AuthContext"

function LoginForm() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { login: authLogin } = useAuth()
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
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/log-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      const data = await response.json()

      if (data.status === "success") {
        authLogin(data.data)
        addToast("تم تسجيل الدخول بنجاح!", "success")
        setTimeout(() => navigate("/dashboard"), 1000)
      } else {
        if (data.action === "verify_email") {
          setErrors({ form: "البريد غير موثّق، تحقق من بريدك الإلكتروني أو انتظر 10 دقائق" })
          addToast("البريد غير موثّق", "error")
        } else {
          setErrors({ form: data.message || "فشل تسجيل الدخول" })
          addToast(data.message || "فشل تسجيل الدخول", "error")
        }
      }
    } catch {
      setErrors({ form: "فشل الاتصال بالخادم، تحقق من اتصالك" })
      addToast("فشل الاتصال بالخادم", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="البريد الإلكتروني" name="email" type="email" dir="ltr" placeholder="example@email.com" value={form.email} onChange={handleChange} error={errors.email} />
      <Input label="كلمة المرور" name="password" type="password" dir="ltr" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />

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
