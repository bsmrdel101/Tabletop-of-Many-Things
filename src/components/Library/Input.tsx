import { generateClasses, parseClasses } from "@/scripts/tools/utils";

interface Props extends InputHTML {
  className?: string
  labelClass?: string
  variants?: ('label-inline' | 'text-area' | 'label-no-bold' | 'fit' | 'label-thin')[]
  label?: string
  cols?: number
  rows?: number
}


export default function Input({ className = '', labelClass = '', variants = [], label, cols, rows, ...props }: Props) {
  const labelClassList = variants.filter((v) => v.includes('label'));
  const classes = generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'input');
  const labelClasses = generateClasses(labelClass, labelClassList, 'input');

  
  return (
    <label {...parseClasses(labelClasses)}>
      { label }

      {variants && variants.includes('text-area') ?
        <textarea
          {...parseClasses(classes)}
          {...props as any}
          cols={cols}
          rows={rows}
          autoComplete="off"
        />
        :
        <input
          autoComplete="off"
          {...parseClasses(classes)}
          {...props}
        />
      }
    </label>
  );
}
