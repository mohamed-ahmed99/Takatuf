import { useEffect, useState } from "react"

const serverDomain = import.meta.env.VITE_API_URL

function App() {

  const [serverMessage, setServerMessage] = useState(null)


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${serverDomain}/`)
      const data = await res.json()
      console.log(data)
      setServerMessage(data.message)
    }
    getData()
  }, [])

  return (
    <>
      <h1>Welcome to Takatuf Project</h1>
      <a href={`${serverDomain}`}>check server</a>
      {serverMessage && <p>{serverMessage}</p>}
    </>
  )
}

export default App
