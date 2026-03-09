'use strict';

const { MODULE_WEIGHTS, FSI_SCORE_MAX } =
  require('../../shared/constants/fsi.constants');

function explainScore(moduleScores) {

  const explanation = {};

  let total = 0;

  for (const [key, score] of Object.entries(moduleScores)) {

    const weight = MODULE_WEIGHTS[key.toUpperCase()];
    const contribution =
      Math.round((score / 100) * weight * FSI_SCORE_MAX);

    explanation[key] = contribution;
    total += contribution;

  }

  return {
    contributions: explanation,
    total
  };

}

module.exports = { explainScore };

