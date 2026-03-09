/**
 * FSI ENGINE UNIT TESTS
 */

'use strict';
const { runFSIEngine } = require('../../../../src/core/engine/fsi.engine.js');
const { FSI_SCORE_MAX, FSI_SCORE_MIN } = require('../../../../src/shared/constants/fsi.constants.js');
// ─── TEST FIXTURES ─────────────────────────────────────────────────────────

const IDEAL_PROFILE = {
  profile: {
    userId: 'user_ideal_001',
    netMonthlyIncomeINR: 100000,
  },
  deposits: [
    { bankId: 'SBI', bankType: 'PSB', balanceINR: 400000 },
    { bankId: 'HDFC', bankType: 'LARGE_PVT', balanceINR: 300000 },
    { bankId: 'ICICI', bankType: 'LARGE_PVT', balanceINR: 200000 },
  ],
  fixedDeposits: [
    { bankId: 'SBI', principalINR: 200000, maturityDate: '2026-12-31' },
    { bankId: 'HDFC', principalINR: 200000, maturityDate: '2027-06-30' },
    { bankId: 'ICICI', principalINR: 200000, maturityDate: '2027-12-31' },
  ],
  liquidAssets: {
    savingsBalanceINR: 300000,
    liquidMutualFundsINR: 200000,
  },
  upiTransactions: [
    { txnId: 't001', amountINR: 5000, merchantId: 'BigBazaar', timestamp: '2025-01-15T10:00:00Z', mcc: 5411 },
    { txnId: 't002', amountINR: 2000, merchantId: 'Apollo', timestamp: '2025-01-16T11:00:00Z', mcc: 5912 },
  ],
  recurringCharges: [
    { merchantName: 'Netflix', monthlyAmountINR: 500 },
    { merchantName: 'Spotify', monthlyAmountINR: 200 },
  ],
};

const VULNERABLE_PROFILE = {
  profile: {
    userId: 'user_vulnerable_001',
    netMonthlyIncomeINR: 30000,
  },
  deposits: [
    { bankId: 'COOP_BANK_A', bankType: 'COOP', balanceINR: 800000 },
  ],
  fixedDeposits: [
    { bankId: 'COOP_BANK_A', principalINR: 500000, maturityDate: '2026-06-30' },
  ],
  liquidAssets: {
    savingsBalanceINR: 5000,
    liquidMutualFundsINR: 0,
  },
  upiTransactions: [
    { txnId: 'v001', amountINR: 150000, merchantId: 'unknown', timestamp: '2025-01-20T02:30:00Z', mcc: 9999 },
    { txnId: 'v002', amountINR: 200000, merchantId: 'unknown', timestamp: '2025-01-20T03:00:00Z', mcc: 9999 },
  ],
  recurringCharges: [
    { merchantName: 'Sub1', monthlyAmountINR: 2000 },
    { merchantName: 'Sub2', monthlyAmountINR: 2000 },
    { merchantName: 'Sub3', monthlyAmountINR: 1500 },
  ],
};


// ─── ASSERT HELPERS ─────────────────────────────────────────────────────────

function assert(condition, message) {
  if (!condition) throw new Error('ASSERTION FAILED: ' + message);
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`ASSERTION FAILED: ${message} — expected ${expected}, got ${actual}`);
  }
}


// ─── TEST RUNNER ────────────────────────────────────────────────────────────

function runTests() {

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log('  PASS:', name);
      passed++;
    } catch (err) {
      console.error('  FAIL:', name);
      console.error('    ', err.message);
      failed++;
    }
  }

  console.log('\n═══ FSI ENGINE TESTS ═══\n');


  // ─── IDEAL PROFILE ─────────────────────────────────────────────────────

  console.log('Ideal Profile:');

  test('engine returns result object', () => {
    const result = runFSIEngine(IDEAL_PROFILE);
    assert(typeof result === 'object', 'result must be object');
  });

  test('score within range', () => {
    const result = runFSIEngine(IDEAL_PROFILE);
    assert(result.fsiScore >= FSI_SCORE_MIN, 'score >= min');
    assert(result.fsiScore <= FSI_SCORE_MAX, 'score <= max');
  });

  test('ideal score >= 600', () => {
    const result = runFSIEngine(IDEAL_PROFILE);
    assert(result.fsiScore >= 600, 'expected strong score');
  });

  test('module scores exist', () => {
    const result = runFSIEngine(IDEAL_PROFILE);

    const modules = result.modules;
    const keys = [
      'depositInsurance',
      'liquidity',
      'fdDiversification',
      'bankSafety',
      'upiFraud',
      'subscriptionLeak',
      'merchantTrust'
    ];

    for (const key of keys) {
      assert(modules[key] !== undefined, key + ' missing');
      assert(modules[key].score >= 0 && modules[key].score <= 100, key + ' score invalid');
    }
  });


  // ─── VULNERABLE PROFILE ───────────────────────────────────────────────

  console.log('\nVulnerable Profile:');

  test('engine runs', () => {
    const result = runFSIEngine(VULNERABLE_PROFILE);
    assert(result !== null, 'result must exist');
  });

  test('score identifies risk', () => {
    const result = runFSIEngine(VULNERABLE_PROFILE);
    assert(result.fsiScore < 400, 'expected vulnerable score');
  });

  test('liquidity low', () => {
    const result = runFSIEngine(VULNERABLE_PROFILE);
    assert(result.modules.liquidity.score < 20, 'liquidity should be weak');
  });


  // ─── SUMMARY ─────────────────────────────────────────────────────────

  console.log(`\nRESULTS: ${passed} passed, ${failed} failed\n`);

  if (failed > 0) process.exit(1);
}

runTests();
