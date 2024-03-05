import ReactDraggable from 'react-draggable';

interface Props {
  children: any;
  handle?: string;
}


export default function Draggable({ children, handle }: Props) {
  return (
    <ReactDraggable handle={handle} bounds="body" defaultPosition={{ x: 500, y: 50 }}>
      { children }
    </ReactDraggable>
  );
}
