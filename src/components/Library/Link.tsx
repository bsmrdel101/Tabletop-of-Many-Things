import { generateClasses, parseClasses } from "@/tools/utils";
import { Link as LinkElement } from "react-router";

interface Props extends LinkHTML {
  to: string
  children?: any
  className?: string
  variants?: ('')[]
}


export default function Link({ to, children, className = '', variants = [], type, ...props }: Props) {
  const classes = generateClasses(className, variants, 'link');

  
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
