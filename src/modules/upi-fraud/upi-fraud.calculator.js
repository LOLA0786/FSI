'use strict';

const { UPI_FRAUD } =
  require('../../shared/constants/fsi.constants');

function calculateUPIFraudScore(txns) {

  if (!txns || txns.length === 0) {
    return { score: 100, recommendations: [] };
  }

  let penalty = 0;

  const highValue = txns.filter(t =>
    t.amountINR > UPI_FRAUD.HIGH_VALUE_SINGLE_TXN_INR
  );

  penalty += Math.min(highValue.length * 20, 40);

  const lateNight = txns.filter(t => {
    const h = new Date(t.timestamp).getHours();
    return h >= 0 && h < 5;
  });

  penalty += Math.min(lateNight.length * 5, 20);

  const score = Math.max(100 - penalty, 0);

  return {
    score,
    recommendations:
      score < 70
        ? ['Enable UPI limits and review suspicious transactions']
        : []
  };
}

module.exports = { calculateUPIFraudScore };
