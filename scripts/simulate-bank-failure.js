'use strict';

const { simulateBankFailure } =
  require('../src/modules/bank-failure-simulation/bank-failure-simulation.js');

const deposits = [
  { bankId: 'SBI', balanceINR: 400000 },
  { bankId: 'HDFC', balanceINR: 300000 },
  { bankId: 'COOP_BANK_A', balanceINR: 800000 }
];

const result = simulateBankFailure(deposits);

console.log("\n═══ BANK FAILURE SIMULATION ═══\n");

for (const bank of result.banks) {

  console.log("Bank:", bank.bankId);
  console.log("  Deposits:", bank.totalDeposits);
  console.log("  Insured :", bank.insuredAmount);
  console.log("  Uninsured Loss:", bank.uninsuredAmount);
  console.log("");

}

console.log("Total Deposits:", result.totalDeposits);
console.log("Total Uninsured Exposure:", result.totalUninsured);

console.log("\n══════════════════════════════\n");

