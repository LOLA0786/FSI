import { MODULE_WEIGHTS, FSI_MAX_SCORE } from "../../shared/constants/fsi.constants"

export function computeFSIScore(moduleScores: Record<string, number>): number {
  const raw = Object.entries(MODULE_WEIGHTS).reduce(
    (sum, [module, weight]) =>
      sum + (moduleScores[module] / 100) * weight * FSI_MAX_SCORE,
    0
  )

  return Math.round(raw)
}
