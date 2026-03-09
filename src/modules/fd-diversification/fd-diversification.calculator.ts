import { calculateHHI, clamp } from "../../shared/utils/math.utils"

export function calculateFDDiversificationScore(fds: any[]): number {
  if (fds.length === 0) return 50

  const perBank: Record<string, number> = {}

  for (const fd of fds) {
    perBank[fd.bankId] = (perBank[fd.bankId] || 0) + fd.principalINR
  }

  const hhi = calculateHHI(Object.values(perBank))
  const bankCount = Object.keys(perBank).length

  let score = (1 - hhi) * 100

  if (bankCount < 3) {
    score *= bankCount / 3
  }

  return clamp(score, 0, 100)
}
