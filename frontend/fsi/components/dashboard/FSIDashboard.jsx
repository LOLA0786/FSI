import { useEffect, useState } from "react"
import { runEngine } from "../../engine/runEngine"
import { DEMO_PROFILES } from "../../data/demoProfiles"

export default function FSIDashboard() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    setResult(runEngine(DEMO_PROFILES.fortress))
  }, [])

  if (!result) return null

  return (
    <div>
      <h1>FSI Score: {result.fsiScore}</h1>
      <pre>{JSON.stringify(result.modules, null, 2)}</pre>
    </div>
  )
}
