export * as Schemas from "./schemas";
export type {
  User,
  Item,
  Order,
  Drive,
  Reward,
  Wallet,
  UserRole,
  ItemCategory,
  OrderStatus,
  DriveStatus,
  RewardType,
  WalletType,
  Location,
  OrderItem,
} from "./schemas";
export type ID = string & { readonly __brand: unique symbol }

export interface User {
  id: ID
  email: string
  name?: string
}
