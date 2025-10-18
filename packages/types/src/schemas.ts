import { z } from "zod";

// Placeholder enums for core domain
export const UserRole = z.enum(["ADMIN", "USER", "DRIVER"]);
export type UserRole = z.infer<typeof UserRole>;

export const ItemCategory = z.enum(["PHYSICAL", "DIGITAL", "SERVICE"]);
export type ItemCategory = z.infer<typeof ItemCategory>;

export const OrderStatus = z.enum([
  "PENDING",
  "CONFIRMED",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
]);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const DriveStatus = z.enum(["CREATED", "EN_ROUTE", "COMPLETED", "CANCELLED"]);
export type DriveStatus = z.infer<typeof DriveStatus>;

export const RewardType = z.enum(["POINTS", "VOUCHER", "DISCOUNT"]);
export type RewardType = z.infer<typeof RewardType>;

export const WalletType = z.enum(["FIAT", "CRYPTO"]);
export type WalletType = z.infer<typeof WalletType>;

// Common primitive schemas
export const ID = z.string().min(1);
export const ISODateTime = z.string().datetime();
export const CurrencyCode = z.string().length(3);

export const Location = z.object({
  lat: z.number().finite(),
  lng: z.number().finite(),
});
export type Location = z.infer<typeof Location>;

// Domain schemas
export const User = z.object({
  id: ID,
  email: z.string().email(),
  name: z.string().min(1).optional(),
  role: UserRole,
  createdAt: ISODateTime,
  updatedAt: ISODateTime.optional(),
});
export type User = z.infer<typeof User>;

export const Item = z.object({
  id: ID,
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  currency: CurrencyCode,
  category: ItemCategory,
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type Item = z.infer<typeof Item>;

export const OrderItem = z.object({
  itemId: ID,
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  currency: CurrencyCode,
});
export type OrderItem = z.infer<typeof OrderItem>;

export const Order = z.object({
  id: ID,
  userId: ID,
  items: z.array(OrderItem).min(1),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
  status: OrderStatus,
  createdAt: ISODateTime,
  updatedAt: ISODateTime.optional(),
});
export type Order = z.infer<typeof Order>;

export const Drive = z.object({
  id: ID,
  orderId: ID.optional(),
  driverId: ID.optional(),
  status: DriveStatus,
  origin: Location,
  destination: Location,
  startedAt: ISODateTime.optional(),
  completedAt: ISODateTime.optional(),
});
export type Drive = z.infer<typeof Drive>;

export const Reward = z.object({
  id: ID,
  userId: ID,
  type: RewardType,
  amount: z.number().nonnegative(),
  issuedAt: ISODateTime,
  expiresAt: ISODateTime.optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type Reward = z.infer<typeof Reward>;

export const Wallet = z.object({
  id: ID,
  userId: ID,
  type: WalletType,
  balance: z.number(),
  currency: CurrencyCode,
  updatedAt: ISODateTime.optional(),
});
export type Wallet = z.infer<typeof Wallet>;
