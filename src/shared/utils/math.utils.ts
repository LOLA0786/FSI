export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function calculateHHI(values: number[]): number {
  const total = values.reduce((s, v) => s + v, 0)
  if (total === 0) return 1

  return values.reduce((s, v) => {
    const share = v / total
    return s + share * share
  }, 0)
}
