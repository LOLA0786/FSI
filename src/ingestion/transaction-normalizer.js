'use strict';

function normalizeTransactions(txns) {

  return txns.map((t, i) => ({
    txnId: "txn_" + i,
    amountINR: Math.abs(t.amountINR),
    merchantId: t.description,
    timestamp: new Date(t.date).toISOString(),
    mcc: null
  }));

}

module.exports = { normalizeTransactions };
