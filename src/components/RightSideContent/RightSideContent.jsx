import React from "react";
import Chat from "./Chat/Chat";
import DiceBox from "./DiceBox/DiceBox";
import './RightSideContent.scss';

export default function RightSideContent() {
  return (
    <div className="right-content">
      <Chat />
      <DiceBox />
    </div>
  );
}
