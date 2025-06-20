import { cn } from "natmfat/lib/cn";

export const Twemoji = ({
  emoji,
  className,
}: {
  emoji: string;
  className?: string;
}) => {
  return (
    <img
      className={cn(
        "mx-[0.05em] ml-[0.1em] inline-block h-[1em] w-[1em] align-[-0.1em]",
        className,
      )}
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/${emoji.codePointAt(0)?.toString(16)}.svg`}
      height="72"
      width="72"
      alt={emoji}
    />
  );
};
