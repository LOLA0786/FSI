'use strict';

const { FSI_SCORE_MAX, MODULE_WEIGHTS, GRADE_THRESHOLDS } =
  require('../../shared/constants/fsi.constants');

/**
 * Aggregates module scores into final FSI score
 */

function calculateFSIScore(moduleScores) {

  const rawScore =
    moduleScores.depositInsurance  * MODULE_WEIGHTS.DEPOSIT_INSURANCE +
    moduleScores.liquidity         * MODULE_WEIGHTS.LIQUIDITY +
    moduleScores.fdDiversification * MODULE_WEIGHTS.FD_DIVERSIFICATION +
    moduleScores.bankSafety        * MODULE_WEIGHTS.BANK_SAFETY +
    moduleScores.upiFraud          * MODULE_WEIGHTS.UPI_FRAUD +
    moduleScores.subscriptionLeak  * MODULE_WEIGHTS.SUBSCRIPTION_LEAK +
    moduleScores.merchantTrust     * MODULE_WEIGHTS.MERCHANT_TRUST;

  const fsiScore = Math.round((rawScore / 100) * FSI_SCORE_MAX);

  const gradeInfo = gradeFromScore(fsiScore);

  return {
    fsiScore,
    grade: gradeInfo.grade,
    gradeLabel: gradeInfo.label,
    gradeColor: gradeInfo.color,
    gradeEmoji: gradeInfo.emoji,
    moduleContributions: moduleScores
  };
}

function gradeFromScore(score) {
  for (const g of GRADE_THRESHOLDS) {
    if (score >= g.minScore) return g;
  }
  return GRADE_THRESHOLDS[GRADE_THRESHOLDS.length - 1];
}

module.exports = { calculateFSIScore };
