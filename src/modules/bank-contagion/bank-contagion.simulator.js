'use strict';

/**
 * BANK CONTAGION SIMULATOR
 * ─────────────────────────────────────────
 * Simulates cascading bank failures.
 *
 * Model:
 * 1. Initial bank failure triggers panic
 * 2. Weak banks with large withdrawals collapse
 * 3. Failures propagate until system stabilizes
 */

function simulateBankContagion({ banks, initialFailure }) {

  const failed = new Set();
  const timeline = [];

  failed.add(initialFailure);

  let round = 1;

  while (true) {

    const newlyFailed = [];

    for (const bank of banks) {

      if (failed.has(bank.id)) continue;

      let stress = 0;

      for (const f of failed) {

        const exposure = bank.exposures[f] || 0;

        stress += exposure;

      }

      if (stress >= bank.failureThreshold) {

        newlyFailed.push(bank.id);

      }

    }

    if (newlyFailed.length === 0) break;

    for (const b of newlyFailed) failed.add(b);

    timeline.push({
      round,
      failures: newlyFailed
    });

    round++;

  }

  return {
    initialFailure,
    totalFailed: Array.from(failed),
    cascadeRounds: timeline.length,
    timeline
  };

}

module.exports = { simulateBankContagion };

