import { generateClasses, parseClasses } from "../../scripts/tools/utils";


interface Props extends InputHTML {
  children?: any
  className?: string
  variants?: ('thin' | 'small' | 'x-small' | 'search' | 'range' | 'label-stack' | 'label-no-stack' | 'label-space-between' | 'md-text' | 'label-full-width' | 'label-bold' | 'text-area' | 'h1' | 'fit')[]
  label?: string
  cols?: number
  rows?: number
}

export default function Input({ children, className = '', variants, label, cols, rows, ...props }: Props) {
  const labelClassList = ['label-stack', 'label-no-stack', 'label-space-between', 'label-full-width', 'label-bold'];
  const classes = generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'input');

  const labelClass = [];
  if (variants) {
    if (variants.includes('label-stack')) {
      labelClass.push('input--label-stack');
    }
    if (variants.includes('label-space-between')) {
      labelClass.push('input--label-space-between');
    }
    if (variants.includes('label-full-width')) {
      labelClass.push('input--label-full-width');
    }
    if (variants.includes('label-bold')) {
      labelClass.push('input--label-bold');
    }
  }

  return (
    <label className={labelClass.join(' ')}>
      { label }

      {variants && variants.includes('text-area') ?
        <textarea
          {...parseClasses(classes)}
          {...props as any}
          cols={cols}
          rows={rows}
        />
        :
        <input
          {...parseClasses(classes)}
          {...props}
        />
      }
      { children }
    </label>
  );
}
