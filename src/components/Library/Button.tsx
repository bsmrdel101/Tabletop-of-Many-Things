import { generateClasses, parseClasses } from "../../scripts/tools/utils";

interface Props extends ButtonHTML {
  children: any
  className?: string
  variant?: ('hover' | 'brown' | 'small' | 'large' | 'hover-scale' | 'search' | 'X' | 'edit' | 'circle' | 'center' | 'plain' | 'link' | 'bold' | 'danger' | 'secondary' | 'fit')[]
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
      {variant.includes('edit') ?
        <img src="/images/icons/pen.svg" alt="pen" draggable={false} />
        :
        children
      }
    </button>
  );
}
