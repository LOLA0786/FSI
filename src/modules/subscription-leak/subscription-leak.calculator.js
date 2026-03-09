'use strict';

const { SUBSCRIPTION_LEAK } =
  require('../../shared/constants/fsi.constants');

function calculateSubscriptionLeakScore(subs, income) {

  const total = subs.reduce((s, c) => s + c.monthlyAmountINR, 0);

  const ratio = total / income;

  let score;

  if (ratio <= SUBSCRIPTION_LEAK.SAFE_SPEND_PERCENT) score = 100;
  else if (ratio <= 0.10) score = 80;
  else if (ratio <= SUBSCRIPTION_LEAK.CRITICAL_SPEND_PERCENT) score = 60;
  else score = 40;

  return {
    score,
    recommendations:
      score < 80
        ? ['Audit and cancel unused subscriptions']
        : []
  };
}

module.exports = { calculateSubscriptionLeakScore };
