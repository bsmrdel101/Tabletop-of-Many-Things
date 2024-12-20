import { generateClasses, parseClasses } from "../../scripts/tools/utils";

interface Props extends SelectHTML {
  children: any
  className?: string
  labelClass?: string
  variants?: ('label-inline' | 'label-space-between' | 'label-full-width' | 'label-stack' | 'large' | 'fit' | 'label-bold' | 'gap')[]
  label?: string
}


export default function Select({ children, className, labelClass, variants = [], type, label, ...props }: Props) {
  const labelClassList = variants.filter((v) => v.includes('label'));
  const classes = generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'select');
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
