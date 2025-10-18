import { z } from "zod";

export const CoinRule = z.object({
  fixed: z.number().int().nonnegative().optional(),
  perUnit: z.number().nonnegative().optional(),
  unit: z.enum(["USD", "ITEM", "KM"]).optional(),
  multiplier: z.number().positive().optional()
}).refine((r) => r.fixed !== undefined || r.perUnit !== undefined, {
  message: "Either fixed or perUnit must be provided"
});

export const CoinRules = z.object({
  version: z.number().int().positive(),
  actions: z.record(z.string(), CoinRule),
  caps: z.object({
    daily: z.number().int().nonnegative().optional(),
    monthly: z.number().int().nonnegative().optional()
  }).optional()
});
export type CoinRules = z.infer<typeof CoinRules>;

export const ClassTaxonomy = z.object({
  version: z.number().int().positive(),
  classes: z.record(z.string(), z.array(z.string()))
});
export type ClassTaxonomy = z.infer<typeof ClassTaxonomy>;

export const FeatureFlag = z.object({
  enabled: z.boolean(),
  description: z.string().optional()
});
export type FeatureFlag = z.infer<typeof FeatureFlag>;

export const FeatureFlags = z.object({
  flags: z.record(z.string(), FeatureFlag)
});
export type FeatureFlags = z.infer<typeof FeatureFlags>;

export function validateWithZod<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    const path = issue?.path?.join(".") || "unknown";
    throw new Error(`Invalid config at ${path}: ${issue.message}`);
  }
  return result.data;
}
