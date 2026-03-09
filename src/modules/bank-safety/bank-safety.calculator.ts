import { BANK_TIERS } from "../../shared/constants/fsi.constants"
import { clamp } from "../../shared/utils/math.utils"

export function calculateBankSafetyScore(deposits: any[]): number {
  const total = deposits.reduce((s, d) => s + d.balanceINR, 0)

  if (total === 0) return 50

  const score = deposits.reduce((s, d) => {
    const tier = BANK_TIERS[d.bankType] || 65
    return s + tier * (d.balanceINR / total)
  }, 0)

  return clamp(score, 0, 100)
}
