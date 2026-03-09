import { clamp } from "../utils/math"

export function computeLiquidity(liquid, income) {
  const expenses = income * 0.70

  const months =
    (liquid.savingsBalanceINR + liquid.liquidMutualFundsINR) / expenses

  if (months >= 6) return 100
  if (months >= 3) return clamp(60 + ((months - 3) / 3) * 40, 60, 100)
  if (months >= 1) return clamp(20 + ((months - 1) / 2) * 40, 20, 60)

  return clamp(months * 20, 0, 20)
}
