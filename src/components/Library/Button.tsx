import { generateClasses, parseClasses } from "../../scripts/tools/utils";

interface Props extends ButtonHTML {
  children: any
  className?: string
  variants?: ('hover' | 'brown' | 'small' | 'large' | 'hover-scale' | 'search' | 'X' | 'edit' | 'circle' | 'center' | 'plain' | 'link' | 'bold' | 'danger' | 'secondary' | 'fit' | 'save')[]
  type?: 'submit' | 'reset' | 'button'
}

export default function Button({ children, className = '', variants, type, ...props }: Props) {
  const classes = generateClasses(className, variants, 'btn');

  return (
    <button
      type={type}
      {...parseClasses(classes)}
      {...props}
    >
      {variants && variants.includes('edit') ?
        <img src="/images/icons/pen.svg" alt="pen" draggable={false} />
        :
        children
      }
    </button>
  );
}
