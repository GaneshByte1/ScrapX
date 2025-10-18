import type { FC } from "react";
import { Text, View } from "react-native";

export type BadgeProps = {
  children?: any;
  variant?: "neutral" | "success" | "warning" | "danger";
  className?: string;
  style?: any;
};

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, { container: string; text: string }> = {
  neutral: { container: "bg-gray-100", text: "text-gray-800" },
  success: { container: "bg-green-100", text: "text-green-800" },
  warning: { container: "bg-yellow-100", text: "text-yellow-800" },
  danger: { container: "bg-red-100", text: "text-red-800" },
};

export const Badge: FC<BadgeProps> = ({ children, variant = "neutral", className, style }) => {
  const v = variantClasses[variant];
  return (
    <View className={`px-2 py-1 rounded-full ${v.container} ${className ?? ""}`} style={style}>
      <Text className={`text-xs font-medium ${v.text}`}>{children}</Text>
    </View>
  );
};

export default Badge;
