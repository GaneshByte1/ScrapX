import type { FC } from "react";
import { Text, View } from "react-native";

export type StatusTimelineProps = {
  steps: string[];
  current: string;
  className?: string;
  style?: any;
};

export const StatusTimeline: FC<StatusTimelineProps> = ({ steps, current, className, style }) => {
  const currentIndex = steps.indexOf(current);
  return (
    <View className={`flex-row items-center ${className ?? ""}`} style={style}>
      {steps.map((step, i) => {
        const isActive = i <= currentIndex;
        return (
          <View key={`${step}-${i}`} className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full ${isActive ? "bg-primary-600" : "bg-gray-300"}`} />
            <Text className={`ml-2 mr-4 text-xs ${isActive ? "text-gray-900" : "text-gray-500"}`}>{step}</Text>
            {i < steps.length - 1 && (
              <View className={`h-0.5 w-6 ${isActive ? "bg-primary-600" : "bg-gray-300"}`} />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default StatusTimeline;
