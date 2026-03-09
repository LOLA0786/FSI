'use strict';

const { UPI_FRAUD } =
  require('../../shared/constants/fsi.constants');

function calculateMerchantTrustScore(txns) {

  const withMCC = txns.filter(t => t.mcc !== undefined);

  if (withMCC.length === 0) {
    return { score: 100, recommendations: [] };
  }

  const trusted = withMCC.filter(t =>
    UPI_FRAUD.TRUSTED_MCC_CODES.includes(t.mcc)
  );

  const score = Math.round((trusted.length / withMCC.length) * 100);

  return {
    score,
    recommendations:
      score < 70
        ? ['Verify merchants before making large payments']
        : []
  };
}

module.exports = { calculateMerchantTrustScore };
