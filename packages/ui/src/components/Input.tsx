import type { FC } from "react";
import { TextInput, View } from "react-native";

export type InputProps = {
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  className?: string;
  style?: any;
};

export const Input: FC<InputProps> = ({ value, onChangeText, placeholder, className, style }) => {
  return (
    <View className={`rounded-md border border-gray-300 bg-white ${className ?? ""}`} style={style}>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} className="px-3 py-2 text-gray-900" />
    </View>
  );
};

export default Input;
