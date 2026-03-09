'use strict';

function parseDateSafe(d) {

  const m = String(d).match(/^(\d{2})\/(\d{2})\/(\d{2,4})$/);

  if (m) {
    let [_, dd, mm, yy] = m;
    if (yy.length === 2) yy = "20" + yy;
    return new Date(`${yy}-${mm}-${dd}T00:00:00Z`).toISOString();
  }

  const t = new Date(d);
  if (!isNaN(t.getTime())) return t.toISOString();

  return null;
}

function detectMCC(desc) {

  const d = desc.toLowerCase();

  if (d.includes("uber")) return 4121;
  if (d.includes("petrol") || d.includes("fuel")) return 5541;
  if (d.includes("amazon")) return 5411;
  if (d.includes("swiggy") || d.includes("zomato")) return 5812;
  if (d.includes("pharmacy") || d.includes("apollo")) return 5912;

  return null;
}

function normalizeTransactions(txns) {

  const out = [];

  for (let i = 0; i < txns.length; i++) {

    const t = txns[i];

    const ts = parseDateSafe(t.date);
    if (!ts) continue;

    const desc = t.description || "";

    out.push({
      txnId: "txn_" + i,
      amountINR: Math.abs(Number(t.amount ?? 0)),
      merchantId: desc,
      timestamp: ts,
      mcc: detectMCC(desc)
    });

  }

  return out;
}

module.exports = { normalizeTransactions };
