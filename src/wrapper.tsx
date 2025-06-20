import { ThemeProvider, View } from "natmfat";
import { cn } from "natmfat/lib/cn";
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
        <View className={cn(className, "px-4")}>{children}</View>
      </View>
    </ThemeProvider>
  );
};
