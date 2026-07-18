import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useMemo } from "react";

interface Props extends TableHTML {
  children?: any
  className?: string
  variants?: ('')[]
}


export default function Table({ children, className = '', variants = [], ...props }: Props) {
  const classes = useMemo(() => generateClasses(className, variants, 'table'), [className, variants]);

  
  return (
    <table
      {...parseClasses(classes)}
      {...props}
    >
      { children }
    </table>
  );
}
