// AppText.tsx
import React from "react";
import { Text as RNText, TextProps } from "react-native";

type Weight ="thin" | "light" | "regular" | "medium" | "semibold" | "bold";

const weightToFamily: Record<Weight, string> = {
  thin: "Roboto_100Thin",
  light: "Roboto_300Light",
  regular: "Roboto_400Regular",
  medium: "Roboto_500Medium",
  semibold: "Roboto_600SemiBold",
  bold: "Roboto_700Bold",
};

type AppTextProps = TextProps & {
  weight?: Weight;
};

export function AppText({
  style,
  children,
  weight = "regular", // ✅ typed default
  ...props
}: AppTextProps) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: weightToFamily[weight] }, style]} // ✅ weight is typed
    >
      {children}
    </RNText>
  );
}
