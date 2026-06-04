import Button from "./Button"

function ErrorMessage({ message = "حدث خطأ ما", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <span className="text-4xl">⚠️</span>
      <p className="text-red-500 font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage
