import { cloneElement, ReactElement, useRef } from "react";
import ReactDraggable from "react-draggable";

interface Props {
  children: ReactElement<{ ref?: React.Ref<any> }>
  handle?: string
  x?: number
  y?: number
  cancel?: string
}


export default function Draggable({ children, handle, x = 50, y = 50, cancel }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <ReactDraggable
      handle={handle}
      bounds="body"
      defaultPosition={{ x, y }}
      nodeRef={nodeRef}
      cancel={cancel}
    >
      { cloneElement(children, { ref: nodeRef }) }
    </ReactDraggable>
  );
}
