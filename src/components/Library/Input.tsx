import { generateClasses, parseClasses } from "../../scripts/tools/utils";


interface Props extends InputHTML {
  children?: any
  className?: string
  variant?: ('thin' | 'small' | 'x-small' | 'search' | 'range' | 'label-stack' | 'label-no-stack' | 'label-space-between' | 'md-text' | 'label-full-width' | 'label-bold' | 'text-area' | 'h1' | 'fit')[]
  label?: string
  cols?: number
  rows?: number
}

export default function Input({ children, className = '', variant, label, cols, rows, ...props }: Props) {
  const labelClassList = ['label-stack', 'label-no-stack', 'label-space-between', 'label-full-width', 'label-bold'];
  const classes = generateClasses(className, variant ? variant.filter((v) => !labelClassList.includes(v)) : [], 'input');

  const labelClass = [];
  if (variant) {
    if (variant.includes('label-stack')) {
      labelClass.push('input--label-stack');
    }
    if (variant.includes('label-space-between')) {
      labelClass.push('input--label-space-between');
    }
    if (variant.includes('label-full-width')) {
      labelClass.push('input--label-full-width');
    }
    if (variant.includes('label-bold')) {
      labelClass.push('input--label-bold');
    }
  }

  return (
    <label className={labelClass.join(' ')}>
      { label }

      {variant && variant.includes('text-area') ?
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
