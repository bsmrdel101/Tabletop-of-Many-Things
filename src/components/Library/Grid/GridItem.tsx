import { generateClasses, parseClasses } from "../../../scripts/tools/utils";

interface Props {
  variants?: ('no-style')[]
  children: React.ReactNode
  className?: string
  rowStart?: number
  colStart?: number
  rowEnd?: number
  colEnd?: number
}

export default function GridItem({ children, className, rowEnd = 0, colEnd = 0, rowStart = 0, colStart = 0, variants }: Props) {
  const classes = generateClasses(`grid__item ${className}`, variants, 'grid__item');

  
  return (
    <div
      {...parseClasses(classes)}
      style={{ gridRowStart: rowStart, gridRowEnd: rowEnd, gridColumnStart: colStart, gridColumnEnd: colEnd }}
    >
      { children }
    </div>
  );
}
