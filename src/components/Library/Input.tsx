import { generateClasses, parseClasses } from "@/tools/utils";
import { useEffect, useRef } from "react";

interface Props extends InputHTML {
  children?: any
  className?: string
  labelClass?: string
  variants?: ('thin' | 'small' | 'x-small' | 'search' | 'label-stack' | 'label-no-stack' | 'label-space-between' | 'md-text' | 'label-full-width' | 'label-bold' | 'text-area' | 'label-inline' | 'label-no-margin' | 'no-style' | 'label-fit-content' | 'autofill-input' | 'no-arrows')[]
  label?: string
  cols?: number
  rows?: number
  autofill?: string
  onAutofill?: (value: string) => void
}


export default function Input({ children, className = '', labelClass = '', autofill = '', onAutofill, variants = [], label, cols, rows, ...props }: Props) {
  const labelClassList = variants.filter((v) => v.includes('label'));
  const classes = generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'input');
  const labelClasses = generateClasses(labelClass, labelClassList, 'input');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && variants.includes('autofill-input') && autofill) {
        e.preventDefault();
        if (inputRef.current) {
          (inputRef.current as HTMLInputElement).value = autofill;
          const event = new Event('input', { bubbles: true });
          inputRef.current.dispatchEvent(event);
          onAutofill && onAutofill(autofill);
        }
      }
    };
    const currentInputRef = inputRef.current;
    if (currentInputRef) {
      currentInputRef.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (currentInputRef) {
        currentInputRef.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [autofill, variants]);

  
  return (
    <label {...parseClasses(labelClasses)}>
      { label }

      {variants && variants.includes('text-area') ?
        <textarea
          {...parseClasses(classes)}
          {...props as any}
          cols={cols}
          rows={rows}
          autoComplete="new-password"
        />
        :
        <>
          {!variants.includes('autofill-input') ?
            <input
              {...parseClasses(classes)}
              {...props}
              autoComplete="new-password"
            />
            :
            <div style={{ position: 'relative' }}>
              <input
                {...parseClasses(classes)}
                {...props}
                ref={inputRef}
                autoComplete="new-password"
              />
              <Input variants={['small', 'thin']} style={{ opacity: '0.5' }} value={autofill} onChange={() => {}} tabIndex={-1} />
            </div>
          }
        </>
      }
      { children }
    </label>
  );
}
