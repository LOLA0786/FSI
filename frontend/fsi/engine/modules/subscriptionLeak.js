import { clamp } from "../utils/math"

export function computeSubscriptionLeak(charges, income) {
  const total = charges.reduce((s, c) => s + c.monthlyAmountINR, 0)
  const ratio = total / income

  if (ratio <= 0.05) return 100

  if (ratio >= 0.15) {
    return clamp(40 - ((ratio - 0.15) / 0.15) * 40, 0, 40)
  }

  return clamp(100 - ((ratio - 0.05) / 0.10) * 60, 40, 100)
}
