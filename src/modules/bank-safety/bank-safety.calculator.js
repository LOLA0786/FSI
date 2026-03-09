'use strict';

const { BANK_SAFETY } =
  require('../../shared/constants/fsi.constants');

function calculateBankSafetyScore(deposits) {

  let total = 0;
  let weighted = 0;

  for (const d of deposits) {

    const tier = BANK_SAFETY.BANK_TIERS[d.bankType];

    const baseScore = tier ? tier.baseScore : 60;

    total += d.balanceINR;
    weighted += baseScore * d.balanceINR;
  }

  const score = total === 0 ? 50 : Math.round(weighted / total);

  return {
    score,
    recommendations:
      score < 70
        ? ['Consider shifting deposits to stronger banks (PSB or large private banks)']
        : []
  };
}

module.exports = { calculateBankSafetyScore };
