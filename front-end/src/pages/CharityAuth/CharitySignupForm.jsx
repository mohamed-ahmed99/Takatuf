import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfileUpload from "../../components/ProfileUpload"
import FileUpload from "../../components/FileUpload"
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

function placeholderDocument() {
  const pdfContent = "%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Count 1\n/Kids [ 3 0 R ]\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [ 0 0 612 792 ]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000056 00000 n \n0000000111 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n196\n%%EOF\n"
  const blob = new Blob([pdfContent], { type: 'application/pdf' })
  return new Promise((resolve) => resolve(new File([blob], 'placeholder.pdf', { type: 'application/pdf' })))
}

function CharitySignupForm() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState({ profileImage: null, coverImage: null, document: null })
  const [form, setForm] = useState({
    charityName: "", email: "", phone: "", fullName: "", nationalId: "",
    password: "", confirmPassword: "",
    about: "", establishmentDate: "", position: "",
    governorate: "", city: "", district: "",
    registrationNumber: "", taxNumber: "",
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

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.charityName.trim()) newErrors.charityName = "اسم الجمعية مطلوب"
    if (!form.fullName.trim()) newErrors.fullName = "اسم المسؤول مطلوب"
    if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    if (!form.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب"
    if (!form.nationalId.trim()) newErrors.nationalId = "الرقم القومي مطلوب"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (form.password.length < 6) newErrors.password = "يجب أن تكون 6 أحرف على الأقل"
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "كلمة المرور غير متطابقة"
    if (Object.keys(newErrors).length) return setErrors(newErrors)

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("accountType", "charity")
      formData.append("charityName", form.charityName)
      formData.append("fullName", form.fullName)
      formData.append("email", form.email)
      formData.append("phone", form.phone)
      formData.append("phoneNumber", form.phone)
      formData.append("password", form.password)
      formData.append("nationalId", form.nationalId)
      formData.append("about", form.about)
      formData.append("establishmentDate", form.establishmentDate)
      formData.append("position", form.position)
      formData.append("governorate", form.governorate)
      formData.append("city", form.city)
      formData.append("district", form.district)
      formData.append("registrationNumber", form.registrationNumber)
      formData.append("taxNumber", form.taxNumber)
      formData.append("profileImage", files.profileImage || await placeholderFile())
      formData.append("coverImage", files.coverImage || await placeholderFile())
      formData.append("document", files.document || await placeholderDocument())

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/sign-up`, {
        method: 'POST', body: formData, credentials: 'include',
      })
      const data = await response.json()

      if (data.status === "success") {
        if (data.action === "verify_email") {
          addToast("تم تسجيل الجمعية بنجاح! تفقد بريدك الإلكتروني لتفعيل الحساب", "success")
          setTimeout(() => navigate("/verify-email"), 1500)
        } else {
          addToast(data.message || "تم تسجيل الجمعية بنجاح!", "success")
          setTimeout(() => navigate("/dashboard"), 1000)
        }
      } else {
        if (data.action === "verify_email") {
          setErrors({ form: "حساب الجمعية غير موثق، سيتم تحويلك لتفعيل الحساب" })
          addToast("الحساب غير موثق", "error")
          setTimeout(() => navigate("/verify-email"), 1500)
        } else {
          // translate duplicate key errors to Arabic
          let msg = data.message || "فشل تسجيل الجمعية"
          if (msg.includes("registrationNumber")) msg = "رقم التسجيل مستخدم بالفعل، جرب رقمًا آخر"
          else if (msg.includes("taxNumber")) msg = "الرقم الضريبي مستخدم بالفعل"
          else if (msg.includes("email")) msg = "البريد الإلكتروني مستخدم بالفعل"
          setErrors({ form: msg })
          addToast(`Error From Backend: ${JSON.stringify(data)}`, "error")
        }
      }
    } catch (err) {
      console.error("Signup Error:", err)
      setErrors({ form: `إيرور السيرفر: ${err.message || "فشل الاتصال"}` })
      addToast("حدث خطأ في السيرفر", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.form && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
          {errors.form}
        </div>
      )}
      <ProfileUpload
        coverImage={files.coverImage}
        profileImage={files.profileImage}
        onCoverChange={handleCoverChange}
        onProfileChange={handleProfileChange}
      />

      <Input label="اسم الجمعية" name="charityName" placeholder="اسم الجمعية الخيرية" value={form.charityName} onChange={handleChange} error={errors.charityName} />

      <Input label="اسم المسؤول" name="fullName" placeholder="اسم شخص التواصل" value={form.fullName} onChange={handleChange} error={errors.fullName} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="البريد الإلكتروني" name="email" type="email" dir="ltr" placeholder="admin@charity.org" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="رقم الهاتف" name="phone" type="tel" dir="ltr" placeholder="0100 000 0000" value={form.phone} onChange={handleChange} error={errors.phone} />
      </div>

      <Input label="الرقم القومي" name="nationalId" dir="ltr" placeholder="14 رقم" value={form.nationalId} onChange={handleChange} error={errors.nationalId} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="المنصب" name="position" placeholder="مدير / منسق" value={form.position} onChange={handleChange} error={errors.position} />
        <Input label="تاريخ التأسيس" name="establishmentDate" type="date" dir="ltr" value={form.establishmentDate} onChange={handleChange} error={errors.establishmentDate} />
      </div>

      <Input label="عن الجمعية" name="about" placeholder="وصف مختصر للجمعية (اختياري)" value={form.about} onChange={handleChange} error={errors.about} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="رقم التسجيل" name="registrationNumber" placeholder="رقم قيد الجمعية" value={form.registrationNumber} onChange={handleChange} error={errors.registrationNumber} />
        <Input label="الرقم الضريبي" name="taxNumber" placeholder="الرقم الضريبي" value={form.taxNumber} onChange={handleChange} error={errors.taxNumber} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="المحافظة" name="governorate" placeholder="المحافظة" value={form.governorate} onChange={handleChange} error={errors.governorate} />
        <Input label="المدينة" name="city" placeholder="المدينة" value={form.city} onChange={handleChange} error={errors.city} />
      </div>

      <Input label="الحي/الشارع" name="district" placeholder="الحي أو الشارع (اختياري)" value={form.district} onChange={handleChange} error={errors.district} />

      <div>
        <label className="block text-sm font-bold text-primary mb-2">وثائق الدعم</label>
        <FileUpload name="document" accept="image/*,.pdf" file={files.document} onChange={handleFileChange} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="كلمة المرور" name="password" type="password" dir="ltr" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
        <Input label="تأكيد كلمة المرور" name="confirmPassword" type="password" dir="ltr" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
      </div>

      <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 text-sm text-primary leading-relaxed">
        <p className="font-semibold mb-1">ملحوظة:</p>
        بعد التسجيل، سيتم مراجعة طلبك من قبل فريق تكاتف والتأكد من توثيق الجمعية قبل تفعيل الحساب.
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">تسجيل الجمعية</Button>
    </form>
  )
}

export default CharitySignupForm
