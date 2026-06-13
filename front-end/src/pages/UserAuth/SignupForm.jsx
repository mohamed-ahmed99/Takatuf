import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfileUpload from "../../components/ProfileUpload"
import { useToast } from "../../context/ToastContext"

function placeholderFile() {
  const canvas = document.createElement('canvas')
  canvas.width = 100; canvas.height = 100
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#052440'
  ctx.fillRect(0, 0, 100, 100)
  ctx.fillStyle = '#96D4C8'
  ctx.font = 'bold 40px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ت', 50, 55)
  return new Promise((resolve) => canvas.toBlob((b) => resolve(new File([b], 'placeholder.png', { type: 'image/png' }))))
}

function SignupForm() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState({ profileImage: null, coverImage: null })
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    type: "donor", dateOfBirth: "", gender: "", governorate: "", city: "", district: "",
    nationalId: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleCoverChange = (e) => {
    setFiles({ ...files, coverImage: e.target.files[0] })
  }

  const handleProfileChange = (e) => {
    setFiles({ ...files, profileImage: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب"
    if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    if (!form.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب"
    if (!form.nationalId.trim()) newErrors.nationalId = "الرقم القومي مطلوب"
    if (!form.gender) newErrors.gender = "يرجى اختيار الجنس"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (form.password.length < 6) newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "كلمة المرور غير متطابقة"
    if (Object.keys(newErrors).length) return setErrors(newErrors)

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("fullName", form.fullName)
      formData.append("email", form.email)
      formData.append("phone", form.phone)
      formData.append("phoneNumber", form.phone)
      formData.append("password", form.password)
      formData.append("accountType", "user")
      formData.append("gender", form.gender)
      formData.append("dateOfBirth", form.dateOfBirth)
      formData.append("nationalId", form.nationalId)
      formData.append("governorate", form.governorate)
      formData.append("city", form.city)
      formData.append("district", form.district)
      formData.append("profileImage", files.profileImage || await placeholderFile())
      formData.append("coverImage", files.coverImage || await placeholderFile())

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/sign-up`, {
        method: 'POST', body: formData,
      })
      const data = await response.json()

      if (data.status === "success") {
        if (data.action === "verify_email") {
          addToast("تم التسجيل بنجاح! تحقق من بريدك الإلكتروني لتفعيل الحساب", "success")
          setTimeout(() => navigate("/verify-email"), 1000)
        } else {
          addToast(data.message || "تم إنشاء الحساب بنجاح!", "success")
          setTimeout(() => navigate("/dashboard"), 1000)
        }
      } else {
        if (data.action === "verify_email") {
          setErrors({ form: "هذا البريد مرتبط بحساب غير موثّق، تحقق من بريدك أو انتظر 10 دقائق ثم حاول مرة أخرى" })
          addToast("البريد غير موثّق، تحقق من بريدك الإلكتروني", "error")
          setTimeout(() => navigate("/verify-email"), 1000)
        } else {
          setErrors({ form: data.message || "فشل إنشاء الحساب" })
          addToast(data.message || "فشل إنشاء الحساب", "error")
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
      <ProfileUpload
        coverImage={files.coverImage}
        profileImage={files.profileImage}
        onCoverChange={handleCoverChange}
        onProfileChange={handleProfileChange}
      />

      <div className="flex gap-3 p-1.5 bg-bg-light rounded-xl border border-border">
        {[
          { value: "donor", label: "متبرع" },
          { value: "needy", label: "محتاج" },
        ].map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => handleChange({ target: { name: "type", value: t.value } })}
            className={`flex-1 py-3.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              form.type === t.value
                ? "bg-white text-primary shadow-sm shadow-black/5 border border-border"
                : "text-text-muted hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="الاسم الكامل" name="fullName" placeholder="الاسم بالكامل" value={form.fullName} onChange={handleChange} error={errors.fullName} />
        <Input label="رقم الهاتف" name="phone" type="tel" dir="ltr" placeholder="0100 000 0000" value={form.phone} onChange={handleChange} error={errors.phone} />
      </div>

      <Input label="الرقم القومي" name="nationalId" dir="ltr" placeholder="14 رقم" value={form.nationalId} onChange={handleChange} error={errors.nationalId} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-semibold text-text-dark">الجنس</label>
          <div className="flex gap-3 p-1 bg-bg-light rounded-xl border border-border">
            {["ذكر", "أنثى"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleChange({ target: { name: "gender", value: g } })}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  form.gender === g
                    ? "bg-white text-primary shadow-sm shadow-black/5 border border-border"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.gender && <span className="text-xs text-red-500">{errors.gender}</span>}
        </div>
        <Input label="تاريخ الميلاد" name="dateOfBirth" type="date" dir="ltr" value={form.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
      </div>

      <Input label="البريد الإلكتروني" name="email" type="email" dir="ltr" placeholder="example@email.com" value={form.email} onChange={handleChange} error={errors.email} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="المحافظة" name="governorate" placeholder="المحافظة" value={form.governorate} onChange={handleChange} error={errors.governorate} />
        <Input label="المدينة" name="city" placeholder="المدينة" value={form.city} onChange={handleChange} error={errors.city} />
      </div>

      <Input label="الحي/الشارع" name="district" placeholder="الحي أو الشارع (اختياري)" value={form.district} onChange={handleChange} error={errors.district} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="كلمة المرور" name="password" type="password" dir="ltr" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
        <Input label="تأكيد كلمة المرور" name="confirmPassword" type="password" dir="ltr" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        إنشاء الحساب
      </Button>
    </form>
  )
}

export default SignupForm
