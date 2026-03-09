'use strict';

const { parseCSV } =
  require('../src/ingestion/statement-parser');

const { normalizeTransactions } =
  require('../src/ingestion/transaction-normalizer');

const { extractSignals } =
  require('../src/ingestion/signal-extractor');

const { runFSIEngine } =
  require('../src/core/engine/fsi.engine');

const file = process.argv[2];

if (!file) {
  console.log("Usage: node scripts/run-ingestion.js statement.csv");
  process.exit(1);
}

const raw = parseCSV(file);
const normalized = normalizeTransactions(raw);
const signals = extractSignals(normalized);

const input = {
  profile: {
    userId: "csv_user",
    netMonthlyIncomeINR: 80000
  },
  deposits: [],
  fixedDeposits: [],
  liquidAssets: {
    savingsBalanceINR: 50000,
    liquidMutualFundsINR: 0
  },
  upiTransactions: signals.upiTransactions,
  recurringCharges: signals.recurringCharges
};

const result = runFSIEngine(input);

console.log("\nFSI Score:", result.fsiScore);
console.log("Grade:", result.gradeLabel);


console.log("\nModule Scores:");

for (const [key, val] of Object.entries(result.modules)) {
  console.log("-", key, ":", val.score);
}

console.log("\nTop Recommendations:");

for (const r of result.recommendations.slice(0,5)) {
  console.log("-", r.module + ":", r.recommendation);
}

