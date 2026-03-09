import { MODULE_WEIGHTS, FSI_MAX, GRADES } from "./constants";

import { computeDepositInsurance } from "./modules/depositInsurance";
import { computeLiquidity } from "./modules/liquidity";
import { computeFDDiversification } from "./modules/fdDiversification";
import { computeBankSafety } from "./modules/bankSafety";
import { computeUPIFraud } from "./modules/upiFraud";
import { computeSubscriptionLeak } from "./modules/subscriptionLeak";
import { computeMerchantTrust } from "./modules/merchantTrust";

function computeFSI(moduleScores) {
  const raw = Object.entries(MODULE_WEIGHTS).reduce(
    (s, [k, w]) => s + (moduleScores[k] / 100) * w * FSI_MAX,
    0
  );

  return Math.round(raw);
}

function gradeFromScore(score) {
  return GRADES.find(g => score >= g.min) || GRADES[GRADES.length - 1];
}

export function runEngine(input) {
  const m = {
    depositInsurance: computeDepositInsurance(input.deposits),
    liquidity: computeLiquidity(input.liquidAssets, input.profile.income),
    fdDiversification: computeFDDiversification(input.fds),
    bankSafety: computeBankSafety(input.deposits),
    upiFraud: computeUPIFraud(input.txns),
    subscriptionLeak: computeSubscriptionLeak(input.subs, input.profile.income),
    merchantTrust: computeMerchantTrust(input.txns),
  };

  const fsiScore = computeFSI(m);
  const grade = gradeFromScore(fsiScore);

  return { fsiScore, grade, modules: m };
}
