import { useEffect } from "react";


export function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      if (!el.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}
