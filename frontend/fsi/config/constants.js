export const DICGC_LIMIT = 500000
export const FSI_MAX = 850

export const MODULE_WEIGHTS = {
  depositInsurance: 0.20,
  liquidity: 0.20,
  fdDiversification: 0.15,
  bankSafety: 0.15,
  upiFraud: 0.15,
  subscriptionLeak: 0.10,
  merchantTrust: 0.05,
}

export const BANK_TIERS = {
  PSB: 85,
  LARGE_PVT: 80,
  SMALL_PVT: 65,
  SFB: 55,
  COOP: 45,
  PAYMENT: 40,
}

export const GRADES = [
  { min: 750, grade: "A+", label: "Fortress", color: "#00E5A0" },
  { min: 650, grade: "A", label: "Strong", color: "#4CAF50" },
  { min: 550, grade: "B", label: "Stable", color: "#8BC34A" },
  { min: 450, grade: "C", label: "Moderate", color: "#FFC107" },
  { min: 350, grade: "D", label: "Vulnerable", color: "#FF9800" },
  { min: 0, grade: "F", label: "Exposed", color: "#F44336" }
]
