import { generateClasses, parseClasses } from "../../scripts/tools/utils";

interface Props extends SelectHTML {
  children: any
  className?: string
  labelClass?: string
  variant?: ('label-inline' | 'label-space-between' | 'label-full-width' | 'label-stack' | 'large' | 'fit' | 'label-bold' | 'gap')[]
  label?: string
}


export default function Select({ children, className, labelClass, variant = [], type, label, ...props }: Props) {
  const labelClassList = variant.filter((v) => v.includes('label'));
  const classes = generateClasses(className, variant ? variant.filter((v) => !labelClassList.includes(v)) : [], 'select');
  const labelClasses = generateClasses(labelClass, labelClassList, 'select');

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
