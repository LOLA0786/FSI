import { DICGC_LIMIT_INR } from "../../shared/constants/fsi.constants"
import { clamp } from "../../shared/utils/math.utils"

export function calculateDepositInsuranceExposureScore(deposits: any[]): number {
  const perBank: Record<string, number> = {}

  for (const d of deposits) {
    perBank[d.bankId] = (perBank[d.bankId] || 0) + d.balanceINR
  }

  let insured = 0
  let total = 0

  for (const bal of Object.values(perBank)) {
    total += bal
    insured += Math.min(bal, DICGC_LIMIT_INR)
  }

  return total === 0 ? 100 : clamp((insured / total) * 100, 0, 100)
}
