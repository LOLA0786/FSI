'use strict';

function calculateFDDiversificationScore(fds) {

  const banks = new Set(fds.map(f => f.bankId));
  const count = banks.size;

  let score;

  if (count >= 3) score = 100;
  else if (count === 2) score = 70;
  else score = 40;

  return {
    score,
    recommendations:
      count < 3
        ? ['Spread fixed deposits across at least 3 banks']
        : []
  };
}

module.exports = { calculateFDDiversificationScore };
