import { useEffect } from "react";
import { makeDraggable } from "../../scripts/tools/utils";


interface Props {
  children: any
  title: string
  close: any
}

export default function Modal({ children, title, close }: Props) {
  useEffect(() => {
    makeDraggable(document.getElementById(`modal-${title}`));
  }, []);

  return (
    <div className="modal" id={`modal-${title}`}>
      <h2 className="modal__title">{ title }</h2>
      <button className="modal__close-btn" onClick={close}>X</button>
      { children }
    </div>
  );
}
