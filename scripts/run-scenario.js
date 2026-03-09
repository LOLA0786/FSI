'use strict';

const fs = require('fs');
const path = require('path');

const { runFSIEngine } =
  require('../src/core/engine/fsi.engine');

const scenarioName = process.argv[2];

if (!scenarioName) {
  console.error("Usage: npm run scenario <scenario_name>");
  process.exit(1);
}

const scenarioPath =
  path.join(__dirname, "..", "scenarios", scenarioName + ".json");

if (!fs.existsSync(scenarioPath)) {
  console.error("Scenario not found:", scenarioName);
  process.exit(1);
}

const scenario =
  JSON.parse(fs.readFileSync(scenarioPath, "utf8"));

console.log("\n═══ FSI SCENARIO STRESS TEST ═══\n");

console.log("Scenario:", scenario.name);
console.log("Description:", scenario.description);

const scenarioResult = runFSIEngine(scenario);

/*
Baseline simulation (healthy financial profile)
*/

const baseline = {
  profile: { userId: "baseline", netMonthlyIncomeINR: 100000 },
  deposits: [
    { bankId: "SBI", bankType: "PSB", balanceINR: 400000 },
    { bankId: "HDFC", bankType: "LARGE_PVT", balanceINR: 300000 }
  ],
  fixedDeposits: [
    { bankId: "SBI", principalINR: 200000 }
  ],
  liquidAssets: {
    savingsBalanceINR: 200000,
    liquidMutualFundsINR: 100000
  },
  upiTransactions: [
    { txnId: "t1", amountINR: 2000, timestamp: "2025-01-01T10:00:00Z", mcc: 5411 }
  ],
  recurringCharges: [
    { merchantName: "Netflix", monthlyAmountINR: 500 }
  ]
};

const baselineResult = runFSIEngine(baseline);

const scoreDrop =
  baselineResult.fsiScore - scenarioResult.fsiScore;

const impact =
  scoreDrop < 100 ? "LOW" :
  scoreDrop < 200 ? "MODERATE" :
  "HIGH";

console.log("\nBaseline FSI:", baselineResult.fsiScore);
console.log("Scenario FSI:", scenarioResult.fsiScore);
console.log("Score Drop:", "-" + scoreDrop);
console.log("Risk Impact:", impact);

console.log("\nModule Scores:");

for (const [key, val] of Object.entries(scenarioResult.modules)) {
  console.log("-", key, ":", val.score);
}

console.log("\nTop Recommendations:");

for (const r of scenarioResult.recommendations.slice(0,5)) {
  console.log("-", r.module + ":", r.recommendation);
}

console.log("\n══════════════════════════════\n");


function calculateUninsuredExposure(deposits) {

  const limit = 500000;
  const perBank = {};
  let uninsured = 0;

  for (const d of deposits) {
    perBank[d.bankId] = (perBank[d.bankId] || 0) + d.balanceINR;
  }

  for (const balance of Object.values(perBank)) {
    if (balance > limit) uninsured += (balance - limit);
  }

  return uninsured;
}

const uninsured = calculateUninsuredExposure(scenario.deposits);

console.log("\nFinancial Exposure:");
console.log("Uninsured Deposits: ₹" + uninsured.toLocaleString("en-IN"));

