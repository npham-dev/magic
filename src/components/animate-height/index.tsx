"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

type AnimateHeightProps = {
  expand?: boolean;
  children?: ReactNode;

  /** Recalculate height whenever this changes (prevents unnecessary re-renders) */
  childrenHash?: string;
};

export const AnimateHeight = ({
  expand,
  children,
  childrenHash,
}: AnimateHeightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // calculate height of children
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const clonedRef = ref.current.cloneNode(true) as HTMLElement;
    clonedRef.removeAttribute("style");
    clonedRef.className =
      "h-fit fixed top-0 left-0 select-none pointer-events-none invisible opacity-0";
    clonedRef.style.width = `${ref.current.offsetWidth}px`;
    clonedRef.ariaHidden = "true";
    document.body.appendChild(clonedRef);
    setContentHeight(clonedRef.offsetHeight);
    clonedRef.remove();
  }, [childrenHash]);

  return (
    <div
      ref={ref}
      aria-hidden={!expand}
      className="duration-chill ease-chill transition-opaciy transition-height overflow-y-hidden"
      style={{
        ...(expand
          ? { height: `${contentHeight}px`, opacity: 1 }
          : { height: "0px", opacity: 0 }),
      }}
    >
      {children}
    </div>
  );
};
