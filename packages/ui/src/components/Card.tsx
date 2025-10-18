import type { FC } from "react";
import { View } from "react-native";

export type CardProps = {
  children?: any;
  className?: string;
  style?: any;
  elevated?: boolean;
};

export const Card: FC<CardProps> = ({ children, className, style, elevated = true }) => {
  return (
    <View
      className={`rounded-lg bg-white border border-gray-200 ${elevated ? "shadow" : ""} ${className ?? ""}`}
      style={style}
    >
      {children}
    </View>
  );
};

export default Card;
