import { saveIndicatorAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import { useEffect } from "react";

interface Props {
  duration?: number
}


export default function saveIndicator({ duration = 2000 }: Props) {
  const [open, setOpen] = useAtom<boolean>(saveIndicatorAtom);
  
  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => setOpen(false), duration);

    return () => clearTimeout(timeout);
  }, [open]);


  if (!open) return null;

  return (
    <div className="save-indicator">
      <p>Saved</p>
    </div>
  );
}
