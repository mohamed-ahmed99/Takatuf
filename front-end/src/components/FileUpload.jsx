import { useRef } from "react"
import { IconCamera } from "./Icons"

function FileUpload({ name, accept = "image/*", file, onChange }) {
  const inputRef = useRef(null)

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="relative w-full h-32 rounded-2xl border-2 border-dashed border-border bg-bg-light flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group overflow-hidden"
    >
      {file ? (
        <>
          <img src={URL.createObjectURL(file)} alt="" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black/30 rounded-2xl" />
          <span className="relative z-10 text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full truncate max-w-[80%]">{file.name}</span>
        </>
      ) : (
        <>
          <span className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border text-text-muted group-hover:text-secondary group-hover:border-secondary transition-all duration-300">
            <IconCamera className="w-5 h-5" />
          </span>
          <span className="text-xs text-text-muted group-hover:text-secondary transition-colors">اختر صورة</span>
        </>
      )}

      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md shadow-secondary/30 group-hover:scale-110 transition-transform">
        +
      </span>

      <input ref={inputRef} type="file" name={name} accept={accept} onChange={onChange} className="hidden" />
    </div>
  )
}

export default FileUpload
