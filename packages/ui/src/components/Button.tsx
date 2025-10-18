import type { FC } from "react";
import { Pressable, Text } from "react-native";

export type ButtonProps = {
  label?: string;
  children?: any;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  style?: any;
};

const getBaseClass = (variant: ButtonProps["variant"], disabled?: boolean) => {
  const base = "rounded-md items-center justify-center";
  const colors = disabled
    ? "bg-gray-300"
    : variant === "secondary"
    ? "bg-gray-100 border border-gray-300"
    : variant === "ghost"
    ? "bg-transparent"
    : "bg-primary-600";
  const text = disabled ? "text-gray-500" : variant === "secondary" ? "text-gray-900" : variant === "ghost" ? "text-primary-600" : "text-white";
  return { container: `${base} ${colors}`, text };
};

const getSizeClass = (size: ButtonProps["size"]) => {
  switch (size) {
    case "sm":
      return "px-3 py-2";
    case "lg":
      return "px-5 py-3";
    case "md":
    default:
      return "px-4 py-2.5";
  }
};

export const Button: FC<ButtonProps> = ({ label, children, variant = "primary", size = "md", disabled, onPress, className, style }) => {
  const base = getBaseClass(variant, disabled);
  const sizeCls = getSizeClass(size);
  return (
    <Pressable accessibilityRole="button" className={`${base.container} ${sizeCls} ${className ?? ""}`} style={style} onPress={disabled ? undefined : onPress} disabled={disabled}>
      <Text className={`font-medium ${base.text}`}>{label ?? children}</Text>
    </Pressable>
  );
};

export default Button;
