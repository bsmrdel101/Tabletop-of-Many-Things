import { generateClasses, parseClasses } from "@/tools/utils";

interface Props extends SelectHTML {
  children: any
  className?: string
  labelClass?: string
  variants?: ('label-thin' | 'fit')[]
  label?: string
}


export default function Select({ children, className = '', labelClass = '', variants = [], label, ...props }: Props) {
  const labelClassList = variants.filter((v) => v.includes('label'));
  const classes = generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'input');
  const labelClasses = generateClasses(labelClass, labelClassList, 'input');

  
  return (
    <label {...parseClasses(labelClasses)}>
      { label }

      <select
        {...parseClasses(classes)}
        {...props}
      >
        { children }
      </select>
    </label>
  );
}
