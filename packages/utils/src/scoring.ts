import { getCoinRules } from "@repo/config";

export type ScoreContext = {
  currency?: string;
  amount?: number; // e.g. purchase amount if unit is currency
  quantity?: number; // e.g. number of items if unit is ITEM
  distanceKm?: number; // e.g. if unit is KM
};

export function score(action: string, ctx: ScoreContext = {}): number {
  const rules = getCoinRules();
  const def = rules.actions[action];
  if (!def) return 0;

  const fixed = def.fixed ?? 0;
  if (def.perUnit !== undefined) {
    switch (def.unit) {
      case "USD": {
        const amount = ctx.amount ?? 0;
        return Math.floor(fixed + amount * (def.perUnit ?? 0) * (def.multiplier ?? 1));
      }
      case "ITEM": {
        const q = ctx.quantity ?? 0;
        return Math.floor(fixed + q * (def.perUnit ?? 0) * (def.multiplier ?? 1));
      }
      case "KM": {
        const km = ctx.distanceKm ?? 0;
        return Math.floor(fixed + km * (def.perUnit ?? 0) * (def.multiplier ?? 1));
      }
      default:
        return fixed;
    }
  }
  return fixed;
}

export function clampScore(scoreValue: number): number {
  const caps = getCoinRules().caps;
  if (!caps) return scoreValue;
  const daily = caps.daily ?? Infinity;
  return Math.min(scoreValue, daily);
}
