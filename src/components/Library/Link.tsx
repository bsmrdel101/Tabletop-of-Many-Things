import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useMemo } from "react";
import { Link as LinkElement } from "react-router";

interface Props extends LinkHTML {
  to: string
  children?: any
  className?: string
  variants?: ('')[]
}


export default function Link({ to, children, className = '', variants = [], ...props }: Props) {
  const classes = useMemo(() => generateClasses(className, variants, 'link'), []);

  
  return (
    <LinkElement
      to={to}
      {...parseClasses(classes)}
      {...props}
    >
      { children }
    </LinkElement>
  );
}
