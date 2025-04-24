import { generateClasses, parseClasses } from "@/tools/utils";

interface Props extends ButtonHTML {
  children?: any
  className?: string
  variants?: ('secondary' | 'border' | 'empty' | 'danger' | 'dark' | 'link' | 'thin' | 'small' | 'pink' | 'blue' | 'image' | 'flat' | 'X')[]
  type?: 'submit' | 'reset' | 'button'
}


export default function Button({ children, className = '', variants = [], type = 'button', ...props }: Props) {
  const classes = generateClasses(className, variants, 'button');

  
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
