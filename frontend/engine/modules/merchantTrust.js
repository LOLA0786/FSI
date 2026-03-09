import { clamp } from "../utils/math";

export function computeMerchantTrust(txns) {
  const TRUSTED_MCC = [5411, 5912, 5541, 5812, 4121, 7011];

  const withMCC = txns.filter(t => t.mcc != null);

  if (withMCC.length === 0) return 100;

  const trusted = withMCC.filter(t => TRUSTED_MCC.includes(t.mcc));

  return clamp((trusted.length / withMCC.length) * 100, 0, 100);
}
