import styles from "./twemoji.module.css";

export const Twemoji = ({ emoji }: { emoji: string }) => {
  return (
    <img
      className={styles.emoji}
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/${emoji.codePointAt(0)?.toString(16)}.svg`}
      height="72"
      width="72"
      alt={emoji}
    />
  );
};
