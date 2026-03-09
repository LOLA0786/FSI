'use strict';

const { runMonteCarlo } =
  require('../src/modules/monte-carlo/monte-carlo.simulator');

const scenario =
  require('../scenarios/bank_run.json');

const result =
  runMonteCarlo(scenario, 2000);

console.log("\n═══ MONTE CARLO FINANCIAL RISK ═══\n");

console.log("Simulations:", result.simulations);
console.log("Average FSI:", result.averageFSI);
console.log("Worst Case FSI:", result.worstCase);

console.log("Probability FSI < 400:",
  (result.probabilityBelow400 * 100).toFixed(2) + "%");

console.log("Probability FSI < 300:",
  (result.probabilityBelow300 * 100).toFixed(2) + "%");

console.log("\n═════════════════════════════════\n");

