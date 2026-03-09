import { FSI_GRADE_MAP } from "../../shared/constants/grade-map"

export function resolveFSIGrade(score: number) {
  return FSI_GRADE_MAP.find(g => score >= g.min) || FSI_GRADE_MAP[FSI_GRADE_MAP.length - 1]
}
