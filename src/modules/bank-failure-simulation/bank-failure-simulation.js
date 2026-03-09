'use strict';

const { DICGC_INSURED_LIMIT_INR } =
  require('../../shared/constants/fsi.constants');

/**
 * Simulates bank failure scenarios and calculates uninsured loss.
 */

function simulateBankFailure(deposits) {

  const perBank = {};

  for (const d of deposits) {
    perBank[d.bankId] = (perBank[d.bankId] || 0) + d.balanceINR;
  }

  const results = [];

  for (const [bankId, balance] of Object.entries(perBank)) {

    const insured = Math.min(balance, DICGC_INSURED_LIMIT_INR);
    const uninsured = Math.max(balance - insured, 0);

    results.push({
      bankId,
      totalDeposits: balance,
      insuredAmount: insured,
      uninsuredAmount: uninsured
    });

  }

  const totalDeposits = results.reduce((s,r)=>s+r.totalDeposits,0);
  const totalUninsured = results.reduce((s,r)=>s+r.uninsuredAmount,0);

  return {
    totalDeposits,
    totalUninsured,
    banks: results
  };

}

module.exports = { simulateBankFailure };
