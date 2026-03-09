/**
 * FSI ENGINE — ORCHESTRATOR
 * Single entry point for the entire FSI calculation pipeline.
 */

'use strict';

const { validateFSIInput }               = require('../validators/input.validator');
const { calculateFSIScore }              = require('../scoring/fsi.scorer');

const { calculateDepositInsuranceScore } = require('../../modules/deposit-insurance/deposit-insurance.calculator');
const { calculateLiquidityScore }        = require('../../modules/liquidity/liquidity.calculator');
const { calculateFDDiversificationScore }= require('../../modules/fd-diversification/fd-diversification.calculator');
const { calculateBankSafetyScore }       = require('../../modules/bank-safety/bank-safety.calculator');
const { calculateUPIFraudScore }         = require('../../modules/upi-fraud/upi-fraud.calculator');
const { calculateSubscriptionLeakScore } = require('../../modules/subscription-leak/subscription-leak.calculator');
const { calculateMerchantTrustScore }    = require('../../modules/merchant-trust/merchant-trust.calculator');

const MODULE = 'core/engine/fsi.engine';

/**
 * Runs the complete FSI pipeline.
 */
function runFSIEngine(rawInput) {

  // ── 1. VALIDATE INPUT ─────────────────────────────────────
  const input = validateFSIInput(rawInput);

  // ── 2. RUN MODULES ────────────────────────────────────────
  const depositInsuranceResult  = calculateDepositInsuranceScore(input.deposits);
  const liquidityResult         = calculateLiquidityScore(
                                    input.liquidAssets,
                                    input.profile.netMonthlyIncomeINR
                                  );
  const fdDiversificationResult = calculateFDDiversificationScore(input.fixedDeposits);
  const bankSafetyResult        = calculateBankSafetyScore(input.deposits);
  const upiFraudResult          = calculateUPIFraudScore(input.upiTransactions);
  const subscriptionLeakResult  = calculateSubscriptionLeakScore(
                                    input.recurringCharges,
                                    input.profile.netMonthlyIncomeINR
                                  );
  const merchantTrustResult     = calculateMerchantTrustScore(input.upiTransactions);

  // ── 3. AGGREGATE SCORE ────────────────────────────────────
  const scoreResult = calculateFSIScore({
    depositInsurance:  depositInsuranceResult.score,
    liquidity:         liquidityResult.score,
    fdDiversification: fdDiversificationResult.score,
    bankSafety:        bankSafetyResult.score,
    upiFraud:          upiFraudResult.score,
    subscriptionLeak:  subscriptionLeakResult.score,
    merchantTrust:     merchantTrustResult.score
  });

  // ── 4. CONSOLIDATE RECOMMENDATIONS ────────────────────────
  const recommendations = _consolidateRecommendations({
    depositInsuranceResult,
    liquidityResult,
    fdDiversificationResult,
    bankSafetyResult,
    upiFraudResult,
    subscriptionLeakResult,
    merchantTrustResult
  });

  // ── 5. BUILD FINAL RESULT ─────────────────────────────────
  return {
    meta: {
      userId: input.profile.userId,
      generatedAt: new Date().toISOString(),
      engineVersion: '1.0.0'
    },

    fsiScore: scoreResult.fsiScore,
    grade: scoreResult.grade,
    gradeLabel: scoreResult.gradeLabel,
    gradeColor: scoreResult.gradeColor,
    gradeEmoji: scoreResult.gradeEmoji,

    moduleContributions: scoreResult.moduleContributions,

    modules: {
      depositInsurance:  depositInsuranceResult,
      liquidity:         liquidityResult,
      fdDiversification: fdDiversificationResult,
      bankSafety:        bankSafetyResult,
      upiFraud:          upiFraudResult,
      subscriptionLeak:  subscriptionLeakResult,
      merchantTrust:     merchantTrustResult
    },

    recommendations
  };
}


/**
 * Consolidates recommendations from all modules.
 * Lower scoring modules surface their recommendations first.
 */
function _consolidateRecommendations(results) {

  const modules = [
    { module: 'Deposit Insurance', score: results.depositInsuranceResult.score,  recs: results.depositInsuranceResult.recommendations },
    { module: 'Liquidity',         score: results.liquidityResult.score,         recs: results.liquidityResult.recommendations },
    { module: 'FD Diversification',score: results.fdDiversificationResult.score, recs: results.fdDiversificationResult.recommendations },
    { module: 'Bank Safety',       score: results.bankSafetyResult.score,        recs: results.bankSafetyResult.recommendations },
    { module: 'UPI Fraud',         score: results.upiFraudResult.score,          recs: results.upiFraudResult.recommendations },
    { module: 'Subscription Leak', score: results.subscriptionLeakResult.score,  recs: results.subscriptionLeakResult.recommendations },
    { module: 'Merchant Trust',    score: results.merchantTrustResult.score,     recs: results.merchantTrustResult.recommendations }
  ];

  modules.sort((a, b) => a.score - b.score);

  const consolidated = [];

  for (const { module, recs } of modules) {
    for (const rec of recs) {
      consolidated.push({
        module,
        recommendation: rec
      });
    }
  }

  return consolidated;
}

module.exports = Object.freeze({ runFSIEngine });
