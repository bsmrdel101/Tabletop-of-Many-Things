import { useEffect, useRef } from "react";


/**
 * Runs a debounced callback function when state changes.
 * @param {T} values - Object with form state.
 * @param {(values: T) => void | Promise<void>} saveFn - Callback function.
 * @param {number} delay - Time before saveFn is run.
 */
export default function useAutoSave<T extends Record<string, any>>(values: T, saveFn: (values: T) => void | Promise<void>, delay: number = 300) {
  const lastSaved = useRef<T>(values);
  const saving = useRef(false);

  useEffect(() => {
    if (saving.current) {
      saving.current = false;
      return;
    }

    const changed = Object.keys(values).some((key) =>
      values[key] !== lastSaved.current[key]
    );
    if (!changed) return;

    const timeout = setTimeout(async () => {
      saving.current = true;
      await saveFn(values);
      lastSaved.current = values;
    }, delay);

    return () => clearTimeout(timeout);
  }, [values, delay, saveFn]);
}
