'use strict';

const { runFSIEngine } = require('../src/core/engine/fsi.engine.js');

const exampleProfile = {
  profile: {
    userId: 'demo_user',
    netMonthlyIncomeINR: 100000,
  },
  deposits: [
    { bankId: 'SBI', bankType: 'PSB', balanceINR: 400000 },
    { bankId: 'HDFC', bankType: 'LARGE_PVT', balanceINR: 300000 },
  ],
  fixedDeposits: [
    { bankId: 'SBI', principalINR: 200000 },
  ],
  liquidAssets: {
    savingsBalanceINR: 200000,
    liquidMutualFundsINR: 100000,
  },
  upiTransactions: [
    { txnId: 't1', amountINR: 2000, timestamp: '2025-01-01T10:00:00Z', mcc: 5411 },
  ],
  recurringCharges: [
    { merchantName: 'Netflix', monthlyAmountINR: 500 },
  ],
};

const result = runFSIEngine(exampleProfile);

console.log("\n═══ FSI SCORE RESULT ═══\n");

console.log("FSI Score:", result.fsiScore);
console.log("Grade:", result.grade, "-", result.gradeLabel);
console.log("Generated:", result.meta.generatedAt);

console.log("\nModule Scores:");

for (const [name, data] of Object.entries(result.modules)) {
  console.log("-", name, ":", data.score);
}

console.log("\nRecommendations:");

for (const r of result.recommendations) {
  console.log("-", r.module + ":", r.recommendation);
}

console.log("\n═══════════════════════\n");

