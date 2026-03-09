'use strict';

function extractSignals(transactions) {

  const recurringCharges = [];
  const upiTransactions = [];

  for (const txn of transactions) {

    upiTransactions.push(txn);

    if (txn.merchantId.toLowerCase().includes("netflix")) {
      recurringCharges.push({
        merchantName: "Netflix",
        monthlyAmountINR: txn.amountINR
      });
    }

  }

  return {
    upiTransactions,
    recurringCharges
  };

}

module.exports = { extractSignals };

function detectMCC(description) {

  const d = description.toLowerCase();

  if (d.includes("grocery")) return 5411;
  if (d.includes("petrol")) return 5541;
  if (d.includes("restaurant")) return 5812;
  if (d.includes("pharmacy")) return 5912;

  return null;
}

