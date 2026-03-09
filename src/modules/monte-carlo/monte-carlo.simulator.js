'use strict';

const { runFSIEngine } =
  require('../../core/engine/fsi.engine');

function randomShock(profile) {

  const clone =
    JSON.parse(JSON.stringify(profile));

  // income shock
  if (Math.random() < 0.3) {
    clone.profile.netMonthlyIncomeINR *= 0.8;
  }

  // unexpected expense
  if (Math.random() < 0.25) {
    clone.liquidAssets.savingsBalanceINR -= 20000;
  }

  // fraud event
  if (Math.random() < 0.1) {
    clone.upiTransactions.push({
      txnId: "fraud",
      amountINR: 100000,
      timestamp: new Date().toISOString(),
      mcc: 9999
    });
  }

  return clone;
}

function runMonteCarlo(profile, iterations = 1000) {

  const scores = [];

  for (let i = 0; i < iterations; i++) {

    const shocked = randomShock(profile);

    const result = runFSIEngine(shocked);

    scores.push(result.fsiScore);

  }

  const avg =
    scores.reduce((a,b)=>a+b,0) / scores.length;

  const below400 =
    scores.filter(s => s < 400).length;

  const below300 =
    scores.filter(s => s < 300).length;

  return {
    simulations: iterations,
    averageFSI: Math.round(avg),
    probabilityBelow400: below400 / iterations,
    probabilityBelow300: below300 / iterations,
    worstCase: Math.min(...scores)
  };

}

module.exports = { runMonteCarlo };

