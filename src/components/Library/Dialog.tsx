import { generateClasses, parseClasses } from "../../scripts/tools/utils";
import React, { useEffect, useRef } from "react";
import Draggable from "./Draggable";
import Button from "./Button";

interface Props {
  children: React.ReactNode
  className?: string
  variants?: ('basic' | 'creature-stats')[]
  title?: string
  closeOnOutsideClick?: boolean
  width?: string
  height?: string
  open?: boolean
  setOpen?: (open: boolean) => void
  deleteOnClose?: boolean
  noTitleStyles?: boolean
}

export default function Dialog({ children, className, variants, title, closeOnOutsideClick, width, height, open, setOpen, deleteOnClose, noTitleStyles, ...props }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const classes = generateClasses(className, variants, 'dialog');

  useEffect(() => {
    bindEventListeners();
  }, []);
  
  const bindEventListeners = () => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDialog();
      }
    };
  
    if (closeOnOutsideClick) {
      window.addEventListener('click', handleOutsideClick);
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }
  };

  const closeDialog = () => {
    if (setOpen) setOpen(false);
    if (deleteOnClose) ref.current.remove();
  };


  return (
    <Draggable handle=".dialog__handlebar">
      <dialog
        open={open}
        ref={ref}
        className={'dialog'}
        style={{ width: width, height: height }}
        {...parseClasses(classes)}
        {...props}
      >
        <div className="dialog__handlebar draggable">
          <h3 className="dialog__title">{ title }</h3>
        </div>
        <div>
          <Button variants={['X']} onClick={closeDialog}>X</Button>
          <div className="dialog__content">
            { children }
          </div>
        </div>
      </dialog>
    </Draggable>
  );
}
