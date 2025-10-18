import { z } from "zod";

export const Email = z.string().email();
export const UUID = z.string().uuid();
export const PositiveInt = z.number().int().positive();

export function isEmail(value: string): boolean {
  return Email.safeParse(value).success;
}

export function isUUID(value: string): boolean {
  return UUID.safeParse(value).success;
}

export function isPositiveInt(value: number): boolean {
  return PositiveInt.safeParse(value).success;
}
