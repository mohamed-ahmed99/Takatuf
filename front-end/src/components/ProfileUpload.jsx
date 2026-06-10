import { useRef } from "react"
import { IconCamera } from "./Icons"

function ProfileUpload({ coverImage, profileImage, onCoverChange, onProfileChange }) {
  const coverRef = useRef(null)
  const profileRef = useRef(null)

  return (
    <div className="relative mb-14">
      <div
        onClick={() => coverRef.current?.click()}
        className="relative w-full h-40 rounded-2xl overflow-hidden cursor-pointer group bg-bg-light border-2 border-dashed border-border hover:border-secondary hover:bg-secondary/5 transition-all duration-300"
      >
        {coverImage ? (
          <img src={URL.createObjectURL(coverImage)} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
            <span className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border text-text-muted group-hover:text-secondary group-hover:border-secondary transition-all duration-300">
              <IconCamera className="w-5 h-5" />
            </span>
            <span className="text-xs text-text-muted group-hover:text-secondary transition-colors">صورة الغلاف</span>
          </div>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-medium text-white bg-black/50 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          تغيير الغلاف
        </span>
        <input ref={coverRef} type="file" name="coverImage" accept="image/*" onChange={onCoverChange} className="hidden" />
      </div>

      <div
        onClick={() => profileRef.current?.click()}
        className="absolute -bottom-10 right-6 w-24 h-24 rounded-full overflow-hidden cursor-pointer group border-4 border-white shadow-lg shadow-black/10 bg-bg-light"
      >
        {profileImage ? (
          <img src={URL.createObjectURL(profileImage)} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 bg-bg-light">
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-border text-text-muted group-hover:text-secondary transition-colors">
              <IconCamera className="w-4 h-4" />
            </span>
            <span className="text-[10px] text-text-muted group-hover:text-secondary transition-colors">الصورة</span>
          </div>
        )}
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="w-8 h-8 flex items-center justify-center bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <IconCamera className="w-4 h-4 text-primary" />
          </span>
        </span>
        <input ref={profileRef} type="file" name="profileImage" accept="image/*" onChange={onProfileChange} className="hidden" />
      </div>
    </div>
  )
}

export default ProfileUpload
