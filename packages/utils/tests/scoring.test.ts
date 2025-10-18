import { describe, it, expect } from "vitest";
import { score, clampScore } from "../src/scoring";

describe("scoring", () => {
  it("awards fixed points for signup", () => {
    expect(score("signup")).toBeGreaterThan(0);
  });
  it("awards per USD for purchase", () => {
    expect(score("purchase", { amount: 20 })).toBeGreaterThan(0);
  });
  it("clamps to daily cap", () => {
    const s = clampScore(999999);
    expect(s).toBeLessThanOrEqual(1000);
  });
});
