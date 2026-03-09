export const DEMO_PROFILES = {
  fortress: {
    label: "Ideal Portfolio",
    profile: { income: 100000 },
    deposits: [
      { bankId: "SBI", bankType: "PSB", balanceINR: 400000 },
      { bankId: "HDFC", bankType: "LARGE_PVT", balanceINR: 300000 },
      { bankId: "ICICI", bankType: "LARGE_PVT", balanceINR: 200000 }
    ],
    fds: [
      { bankId: "SBI", principalINR: 200000 },
      { bankId: "HDFC", principalINR: 200000 },
      { bankId: "ICICI", principalINR: 200000 }
    ],
    liquidAssets: {
      savingsBalanceINR: 300000,
      liquidMutualFundsINR: 200000
    },
    txns: [],
    subs: []
  }
}
