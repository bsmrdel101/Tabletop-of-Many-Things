import { generateClasses, parseClasses } from "../../../scripts/tools/utils";
import React, { useEffect, useRef } from "react";

interface Props {
  variant?: ('default')[]
  children: React.ReactNode
  className?: string
  rows?: number
  cols?: number
  gap?: number
}


export default function Grid({ children, className, rows = 1, cols = 12, gap = 0, variant }: Props) {
  const ref = useRef(null) as any;
  const classes = generateClasses(`grid ${className}`, variant, 'grid');
    
  useEffect(() => {
    const grid = ref.current as HTMLDivElement;
    grid.style.setProperty('grid-template-rows', `repeat(${rows}, 1fr)`);
    grid.style.setProperty('grid-template-columns', `repeat(${cols}, 1fr)`);
    grid.style.setProperty('grid-gap', `${gap}rem`);
  }, []);


  return (
    <div {...parseClasses(classes)} ref={ref}>
      { children }
    </div>
  );
}
