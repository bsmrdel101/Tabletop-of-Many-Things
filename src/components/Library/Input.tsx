import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useMemo } from "react";

interface Props extends InputHTML {
  className?: string
  labelClass?: string
  variants?: ('label-inline' | 'text-area' | 'label-no-bold' | 'fit' | 'label-large' | 'no-arrows' | 'label-thin')[]
  label?: string
  cols?: number
  rows?: number
  step?: 'any' | number
}


export default function Input({ className = '', labelClass = '', variants = [], label, cols, rows, step = 'any', ...props }: Props) {
  const labelClassList = useMemo(() => variants.filter((v) => v.includes('label')), []);
  const classes = useMemo(() => generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'input'), []);
  const labelClasses = useMemo(() => generateClasses(labelClass, labelClassList, 'input'), []);

  
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
        <input
          autoComplete="new-password"
          step={step}
          {...parseClasses(classes)}
          {...props}
        />
      }
    </label>
  );
}
