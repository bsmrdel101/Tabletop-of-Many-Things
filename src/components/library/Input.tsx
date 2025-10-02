import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useMemo } from "react";

interface Props extends InputHTML {
  className?: string
  labelClass?: string
  variants?: ('label-inline' | 'text-area' | 'label-no-bold' | 'fit' | 'label-md' | 'label-lg' | 'label-xl' | 'no-arrows' | 'label-thin' | 'medium' | 'small' | 'x-small' | 'empty')[]
  label?: string
  cols?: number
  rows?: number
  step?: 'any' | number
  error?: string
}


export default function Input({ className = '', labelClass = '', variants = [], label, cols, rows, step = 'any', error, ...props }: Props) {
  const labelClassList = useMemo(() => variants.filter((v) => v.includes('label')), []);
  const classes = useMemo(() => generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'input'), []);
  const labelClasses = useMemo(() => generateClasses(labelClass, labelClassList, 'input'), []);

  
  return (
    <label {...parseClasses(labelClasses)}>
      { label }

      {variants && variants.includes('text-area') ?
        <textarea
          {...parseClasses(classes)}
          {...props as TextAreaHTML}
          style={error ? {outline: '3px solid #ff383896'} : {}}
          cols={cols}
          rows={rows}
          autoComplete="new-password"
        />
        :
        <input
          autoComplete="new-password"
          step={step}
          style={error ? {outline: '3px solid #ff383896'} : {}}
          {...parseClasses(classes)}
          {...props as InputHTML}
        />
      }
      { error && <p className="input__error">{ error }</p> }
    </label>
  );
}
