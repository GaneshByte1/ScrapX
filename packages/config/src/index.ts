import coinRulesJson from "./assets/coin-rules.json";
import classTaxonomyJson from "./assets/class-taxonomy.json";
import featureFlagsJson from "./assets/feature-flags.json";
import { CoinRules, ClassTaxonomy, FeatureFlags, validateWithZod } from "./schemas";

export type { CoinRules, ClassTaxonomy, FeatureFlags } from "./schemas";

export const getCoinRules = () => validateWithZod(CoinRules, coinRulesJson);
export const getClassTaxonomy = () => validateWithZod(ClassTaxonomy, classTaxonomyJson);
export const getFeatureFlags = () => validateWithZod(FeatureFlags, featureFlagsJson);

export function getConfig() {
  return {
    coinRules: getCoinRules(),
    classTaxonomy: getClassTaxonomy(),
    featureFlags: getFeatureFlags(),
  };
}
