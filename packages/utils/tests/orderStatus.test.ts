import { describe, it, expect } from "vitest";
import { canTransition, OrderStateMachine } from "../src/orderStatus";

describe("order status", () => {
  it("allows valid transitions", () => {
    expect(canTransition("PENDING", "CONFIRMED")).toBe(true);
  });
  it("blocks invalid transitions", () => {
    expect(canTransition("DELIVERED", "PAID")).toBe(false);
  });
  it("state machine transitions", () => {
    const sm = new OrderStateMachine("PENDING");
    sm.transition("CONFIRMED");
    sm.transition("PAID");
    expect(() => sm.transition("PENDING")).toThrowError();
  });
});
