export function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi)
}

export function computeHHI(amounts) {
  const total = amounts.reduce((s, a) => s + a, 0)
  if (total === 0) return 1

  return amounts.reduce((s, a) => {
    const sh = a / total
    return s + sh * sh
  }, 0)
}
