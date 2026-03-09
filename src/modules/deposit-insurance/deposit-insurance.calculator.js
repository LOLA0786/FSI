'use strict';

const { DICGC_INSURED_LIMIT_INR } =
  require('../../shared/constants/fsi.constants');

/**
 * Calculates deposit insurance safety score.
 */
function calculateDepositInsuranceScore(deposits) {

  const perBank = {};

  for (const d of deposits) {
    perBank[d.bankId] = (perBank[d.bankId] || 0) + d.balanceINR;
  }

  let insured = 0;
  let total = 0;

  for (const bal of Object.values(perBank)) {
    total += bal;
    insured += Math.min(bal, DICGC_INSURED_LIMIT_INR);
  }

  const percentCovered = total === 0 ? 100 : (insured / total) * 100;

  return {
    score: Math.round(percentCovered),
    recommendations: percentCovered < 100
      ? ['Split deposits across banks to stay within ₹5L DICGC limit']
      : []
  };
}

module.exports = { calculateDepositInsuranceScore };
