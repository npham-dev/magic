import { ThemeProvider, View } from "natmfat";
import type { ReactNode } from "react";

export const Wrapper = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <ThemeProvider value="dark">
      <View className="h-screen w-screen items-center justify-center">
        <View className={className}>{children}</View>
      </View>
    </ThemeProvider>
  );
};
