/**
 * FSI CONSTANTS
 * All magic numbers for the Financial Safety Engine live HERE and ONLY HERE.
 */

'use strict';

// ─── REGULATORY LIMITS ───────────────────────────────────────────────────────

/**
 * DICGC deposit insurance limit per depositor per bank (India).
 * Source: DICGC Act 1961, amended 2020.
 */
const DICGC_INSURED_LIMIT_INR = 500000;

/**
 * Minimum recommended emergency liquidity buffer.
 */
const LIQUIDITY_SAFE_MONTHS = 3;
const LIQUIDITY_EXCELLENT_MONTHS = 6;


// ─── FSI SCORE SCALE ─────────────────────────────────────────────────────────

const FSI_SCORE_MIN = 0;
const FSI_SCORE_MAX = 850;


// ─── MODULE WEIGHTS ──────────────────────────────────────────────────────────

const MODULE_WEIGHTS = Object.freeze({
  DEPOSIT_INSURANCE:   0.20,
  LIQUIDITY:           0.20,
  FD_DIVERSIFICATION:  0.15,
  BANK_SAFETY:         0.15,
  UPI_FRAUD:           0.15,
  SUBSCRIPTION_LEAK:   0.10,
  MERCHANT_TRUST:      0.05,
});

(function assertWeightsSumToOne() {
  const sum = Object.values(MODULE_WEIGHTS).reduce((a, b) => a + b, 0);
  const EPSILON = 0.0001;

  if (Math.abs(sum - 1.0) > EPSILON) {
    throw new Error(
      'FSI_CONSTANTS INTEGRITY FAILURE: MODULE_WEIGHTS must sum to 1.0, got ' + sum
    );
  }
})();


// ─── GRADE THRESHOLDS ────────────────────────────────────────────────────────

const GRADE_THRESHOLDS = Object.freeze([
  { minScore: 750, grade: 'A+', label: 'Fortress',   color: '#00C896', emoji: '🏰' },
  { minScore: 650, grade: 'A',  label: 'Strong',     color: '#4CAF50', emoji: '💪' },
  { minScore: 550, grade: 'B',  label: 'Stable',     color: '#8BC34A', emoji: '⚓' },
  { minScore: 450, grade: 'C',  label: 'Moderate',   color: '#FFC107', emoji: '⚠️' },
  { minScore: 350, grade: 'D',  label: 'Vulnerable', color: '#FF9800', emoji: '🔻' },
  { minScore: 0,   grade: 'F',  label: 'Exposed',    color: '#F44336', emoji: '🚨' },
]);


// ─── UPI FRAUD LIMITS ────────────────────────────────────────────────────────

const UPI_FRAUD = Object.freeze({
  HIGH_VALUE_SINGLE_TXN_INR: 100000,
  HIGH_VELOCITY_DAILY_INR: 200000,
  TRUSTED_MCC_CODES: Object.freeze([
    5411, 5912, 5541, 5812, 4121, 7011
  ]),
});


// ─── FD DIVERSIFICATION ──────────────────────────────────────────────────────

const FD_DIVERSIFICATION = Object.freeze({
  HHI_POOR_THRESHOLD: 0.25,
  HHI_EXCELLENT_THRESHOLD: 0.10,
  MIN_BANKS_FOR_GOOD_SCORE: 3,
});


// ─── SUBSCRIPTION LEAK ───────────────────────────────────────────────────────

const SUBSCRIPTION_LEAK = Object.freeze({
  SAFE_SPEND_PERCENT: 0.05,
  CRITICAL_SPEND_PERCENT: 0.15,
});


// ─── BANK SAFETY TIERS ───────────────────────────────────────────────────────

const BANK_SAFETY = Object.freeze({
  BANK_TIERS: Object.freeze({
    PSB:       { tier: 1, label: 'Public Sector Bank', baseScore: 85 },
    LARGE_PVT: { tier: 2, label: 'Large Private Bank', baseScore: 80 },
    SMALL_PVT: { tier: 3, label: 'Small Private Bank', baseScore: 65 },
    SFB:       { tier: 4, label: 'Small Finance Bank', baseScore: 55 },
    COOP:      { tier: 5, label: 'Co-operative Bank',  baseScore: 45 },
    PAYMENT:   { tier: 6, label: 'Payments Bank',      baseScore: 40 },
  }),
});


// ─── EXPORTS ─────────────────────────────────────────────────────────────────

module.exports = Object.freeze({
  DICGC_INSURED_LIMIT_INR,
  LIQUIDITY_SAFE_MONTHS,
  LIQUIDITY_EXCELLENT_MONTHS,
  FSI_SCORE_MIN,
  FSI_SCORE_MAX,
  MODULE_WEIGHTS,
  GRADE_THRESHOLDS,
  UPI_FRAUD,
  FD_DIVERSIFICATION,
  SUBSCRIPTION_LEAK,
  BANK_SAFETY,
});
