import { IconButton } from "natmfat/components/IconButton";
import { RiCheckIcon } from "natmfat/icons/RiCheckIcon";
import { RiClipboardIcon } from "natmfat/icons/RiClipboardIcon";
import { useRef, useState } from "react";

export function CopyIconButton({
  text,
  delay = 750,
}: {
  text: string;
  delay?: number;
}) {
  const [check, setCheck] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <IconButton
      alt="Copy API"
      onClick={() => {
        copyToClipboard(text);
        if (ref.current) {
          clearTimeout(ref.current);
        }
        setCheck(true);
        ref.current = setTimeout(() => setCheck(false), delay);
      }}
    >
      {check ? (
        <RiCheckIcon className="text-positive-default" />
      ) : (
        <RiClipboardIcon />
      )}
    </IconButton>
  );
}

/**
 * Copy text to the clipboard
 * @param text Text to copy to clipboard
 * @link https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 */
function copyToClipboard(text: string) {
  if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
