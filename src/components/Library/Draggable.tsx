import { cloneElement, ReactElement, useRef } from "react";
import ReactDraggable from "react-draggable";

interface Props {
  children: ReactElement<{ ref?: React.Ref<any> }>
  handle?: string
  x?: number
  y?: number
}


export default function Draggable({ children, handle, y = 50, x = 50 }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <ReactDraggable
      handle={handle}
      bounds="body"
      defaultPosition={{ x, y }}
      nodeRef={nodeRef}
    >
      { cloneElement(children, { ref: nodeRef }) }
    </ReactDraggable>
  );
}
