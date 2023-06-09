import React from "react";


interface Props {
  text: string
}

export default function TextWarning({ text }: Props) {
  return (
    <div className="text-warning">
      <p>{ text }</p>
    </div>
  );
}
