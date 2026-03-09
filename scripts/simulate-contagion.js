'use strict';

const { simulateBankContagion } =
  require('../src/modules/bank-contagion/bank-contagion.simulator');

const banks = [

  {
    id: "SBI",
    failureThreshold: 0.5,
    exposures: { HDFC: 0.3, ICICI: 0.2 }
  },

  {
    id: "HDFC",
    failureThreshold: 0.3,
    exposures: { COOP_A: 0.4 }
  },

  {
    id: "ICICI",
    failureThreshold: 0.3,
    exposures: { HDFC: 0.35 }
  },

  {
    id: "COOP_A",
    failureThreshold: 0.2,
    exposures: {}
  }

];

const result = simulateBankContagion({
  banks,
  initialFailure: "COOP_A"
});

const systemRisk =
  result.totalFailed.length <= 1 ? "LOW" :
  result.totalFailed.length <= 2 ? "MODERATE" :
  "HIGH";

console.log("\n═══ BANK CONTAGION SIMULATION ═══\n");

console.log("Initial Failure:", result.initialFailure);
console.log("Total Banks Failed:", result.totalFailed.join(", "));
console.log("Cascade Rounds:", result.cascadeRounds);
console.log("System Risk Level:", systemRisk);

console.log("\nTimeline:");

for (const step of result.timeline) {
  console.log("Round", step.round, "→", step.failures.join(", "));
}

console.log("\n══════════════════════════════\n");

