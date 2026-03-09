import { clamp } from "../../shared/utils/math.utils"

export function calculateLiquidityBufferScore(liquidAssets: any, income: number): number {
  const monthlyExpenses = income * 0.7

  const months =
    (liquidAssets.savingsBalanceINR + liquidAssets.liquidMutualFundsINR) /
    monthlyExpenses

  if (months >= 6) return 100
  if (months >= 3) return clamp(60 + ((months - 3) / 3) * 40, 60, 100)
  if (months >= 1) return clamp(20 + ((months - 1) / 2) * 40, 20, 60)

  return clamp(months * 20, 0, 20)
}
