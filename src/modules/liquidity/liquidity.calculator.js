'use strict';

function calculateLiquidityScore(liquidAssets, monthlyIncome) {

  const expenses = monthlyIncome * 0.7;

  const liquid =
    liquidAssets.savingsBalanceINR +
    liquidAssets.liquidMutualFundsINR;

  const months = liquid / expenses;

  let score;

  if (months >= 6) score = 100;
  else if (months >= 3) score = 70;
  else if (months >= 1) score = 40;
  else score = 10;

  return {
    score,
    recommendations:
      score < 70
        ? ['Increase emergency fund to at least 3–6 months expenses']
        : []
  };
}

module.exports = { calculateLiquidityScore };
