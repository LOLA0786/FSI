import { DICGC_LIMIT } from "../../config/constants"
import { clamp } from "../utils/math"

export function computeDepositInsurance(deposits) {
  const perBank = {}

  for (const d of deposits) {
    perBank[d.bankId] = (perBank[d.bankId] || 0) + d.balanceINR
  }

  let insured = 0
  let total = 0

  for (const bal of Object.values(perBank)) {
    total += bal
    insured += Math.min(bal, DICGC_LIMIT)
  }

  return total === 0 ? 100 : clamp((insured / total) * 100, 0, 100)
}
