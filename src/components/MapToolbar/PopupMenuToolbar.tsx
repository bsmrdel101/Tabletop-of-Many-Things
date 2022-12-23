import React from "react";
import './MapToolbar.scss';


interface Props {
  children: any
}

export default function PopupMenuToolbar({ children }: Props) {
  return (
    <div className="popup-menu-toolbar">
      {children}
    </div>
  );
}
