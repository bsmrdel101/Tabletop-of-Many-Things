import React from "react";
import './FormModal.scss';


export default function FormModal({ children }: any) {
  return (
    <div className="form-modal">
      { children }
    </div>
  );
}
