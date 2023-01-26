import React, { useEffect } from "react";
import { makeDraggable } from "../../../scripts/tools/utils";
import './FormModal.scss';


interface Props {
  children: any
  title: string
  close: any
}

export default function FormModal({ children, title, close }: Props) {
  useEffect(() => {
    makeDraggable(document.querySelector('.form-modal'), '.form-modal__title');
  }, []);

  return (
    <div className="form-modal">
      <h2 className="form-modal__title">{ title }</h2>
      <button className="form-modal__close-btn" onClick={close}>X</button>
      { children }
    </div>
  );
}
