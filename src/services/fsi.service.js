'use strict';

const { runFSIEngine } =
  require('../core/engine/fsi.engine');

function calculateFSI(input) {

  const result = runFSIEngine(input);

  return {
    score: result.fsiScore,
    grade: result.grade,
    modules: result.modules,
    recommendations: result.recommendations
  };

}

module.exports = { calculateFSI };
