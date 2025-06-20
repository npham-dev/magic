import { useCallback, useEffect, useRef } from "react";

/**
 * Wraps a callback in a request animation frame loop
 * Okay to call many times becuase the browser is optimized for many
 * @param callback Callback
 */
export const useRequestAnimationFrame = (callback: () => void) => {
  const animationId = useRef<number | null>(null);

  const animate = useCallback(() => {
    callback();
    animationId.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    animationId.current = requestAnimationFrame(animate);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      animationId.current = null;
    };
  }, [animate]);
};
