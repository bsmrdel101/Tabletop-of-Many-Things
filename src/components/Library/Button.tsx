import { generateClasses, parseClasses } from "../../scripts/tools/utils";

interface Props extends ButtonHTML {
  children: any
  className?: string
  variant?: ('brown' | 'small' | 'large' | 'hover-scale' | 'search' | 'X' | 'circle' | 'center' | 'plain')[]
  type?: 'submit' | 'reset' | 'button'
}

export default function Button({ children, className = '', variant, type, ...props }: Props) {
  const classes = generateClasses(className, variant, 'btn');

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
