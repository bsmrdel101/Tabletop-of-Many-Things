import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useMemo } from "react";

interface Props extends InputHTML {
  className?: string
  labelClass?: string
  variants?: ('')[]
  label?: string
}


export default function Checkbox({ className = '', labelClass = '', variants = [], label, ...props }: Props) {
  const labelClassList = useMemo(() => variants.filter((v) => v.includes('label')), [className, variants]);
  const classes = useMemo(() => generateClasses(className, variants ? variants.filter((v) => !labelClassList.includes(v)) : [], 'checkbox'), [className, variants]);
  const labelClasses = useMemo(() => generateClasses(labelClass, labelClassList, 'checkbox'), [className, variants]);

  
  return (
    <label {...parseClasses(labelClasses)}>
      { label }

      <input
        type="checkbox"
        {...parseClasses(classes)}
        {...props}
      />
    </label>
  );
}
