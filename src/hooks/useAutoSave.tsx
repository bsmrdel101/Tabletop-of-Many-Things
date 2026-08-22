import { useEffect, useRef } from "react";


/**
 * Runs a debounced callback function when state changes.
 * @param {T} values - Object with form state.
 * @param {(values: T) => void | Promise<void>} saveFn - Callback function.
 * @param {number} delay - Time before saveFn is run.
 */
export default function useAutoSave<T>(values: T, saveFn: (values: T) => void | Promise<void>, delay: number = 500) {
  // const [, setOpen] = useAtom<boolean>(saveIndicatorAtom);
  const lastSaved = useRef<T>(values);
  const saving = useRef(false);

  useEffect(() => {
    if (saving.current) {
      saving.current = false;
      return;
    }

    if (Object.is(values, lastSaved.current)) return;

    const timeout = setTimeout(async () => {
      saving.current = true;
      await saveFn(values);
      lastSaved.current = values;
      // setOpen(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [values, delay, saveFn]);
}
