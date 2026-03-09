import { clamp } from "../utils/math";

export function computeUPIFraud(txns) {
  if (txns.length === 0) return 100;

  let penalty = 0;

  const highVal = txns.filter(t => t.amountINR > 100000);
  if (highVal.length) penalty += Math.min(highVal.length * 20, 40);

  const unusual = txns.filter(t => {
    const h = new Date(t.timestamp).getHours();
    return h >= 0 && h < 5;
  });

  if (unusual.length) penalty += Math.min(unusual.length * 3, 15);

  const daily = {};
  for (const t of txns) {
    const d = t.timestamp.slice(0, 10);
    daily[d] = (daily[d] || 0) + t.amountINR;
  }

  const hv = Object.values(daily).filter(v => v > 200000);
  if (hv.length) penalty += Math.min(hv.length * 25, 50);

  return clamp(100 - penalty, 0, 100);
}
