import { BANK_TIERS } from "../../config/constants"
import { clamp } from "../utils/math"

export function computeBankSafety(deposits) {
  const total = deposits.reduce((s, d) => s + d.balanceINR, 0)

  if (total === 0) return 50

  return clamp(
    deposits.reduce((s, d) => {
      const tier = BANK_TIERS[d.bankType] || 65
      return s + tier * (d.balanceINR / total)
    }, 0),
    0,
    100
  )
}
