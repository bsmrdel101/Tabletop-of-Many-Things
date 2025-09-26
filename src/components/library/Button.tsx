import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import { useMemo } from "react";

interface Props extends ButtonHTML {
  children?: any
  className?: string
  variants?: ('secondary' | 'secondary-blue' | 'border' | 'empty' | 'danger' | 'dark' | 'link' | 'thin' | 'small' | 'pink' | 'blue' | 'image' | 'flat' | 'X' | 'large' | 'bold' | 'save' | 'plain' | 'left-icon')[]
  type?: 'submit' | 'reset' | 'button'
}


export default function Button({ children, className = '', variants = [], type = 'button', ...props }: Props) {
  const classes = useMemo(() => generateClasses(className, variants, 'button'), []);

  
  return (
    <button
      type={type}
      {...parseClasses(classes)}
      {...props}
    >
      { children }
    </button>
  );
}
