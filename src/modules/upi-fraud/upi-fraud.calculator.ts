import { clamp } from "../../shared/utils/math.utils"

export function calculateUPIFraudRiskScore(txns: any[]): number {
  if (txns.length === 0) return 100

  let penalty = 0

  const highValue = txns.filter(t => t.amountINR > 100000)
  if (highValue.length) penalty += Math.min(highValue.length * 20, 40)

  const lateNight = txns.filter(t => {
    const hour = new Date(t.timestamp).getHours()
    return hour >= 0 && hour < 5
  })

  if (lateNight.length) penalty += Math.min(lateNight.length * 3, 15)

  const dailyTotals: Record<string, number> = {}

  for (const t of txns) {
    const day = t.timestamp.slice(0, 10)
    dailyTotals[day] = (dailyTotals[day] || 0) + t.amountINR
  }

  const highDaily = Object.values(dailyTotals).filter(v => v > 200000)
  if (highDaily.length) penalty += Math.min(highDaily.length * 25, 50)

  return clamp(100 - penalty, 0, 100)
}
