import { Schemas } from "@repo/types";

export type OrderStatus = Schemas.OrderStatus;

const transitions: Record<Schemas.OrderStatus, Schemas.OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PAID", "CANCELLED"],
  PAID: ["PROCESSING", "REFUNDED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "REFUNDED"],
  DELIVERED: [],
  CANCELLED: [],
  REFUNDED: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return transitions[from]?.includes(to) ?? false;
}

export class OrderStateMachine {
  private _status: OrderStatus;
  constructor(initial: OrderStatus = "PENDING") {
    this._status = initial;
  }
  get status(): OrderStatus {
    return this._status;
  }
  transition(to: OrderStatus) {
    if (!canTransition(this._status, to)) {
      throw new Error(`Invalid transition: ${this._status} -> ${to}`);
    }
    this._status = to;
    return this._status;
  }
}
