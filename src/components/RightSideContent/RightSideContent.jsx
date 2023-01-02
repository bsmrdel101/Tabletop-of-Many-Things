import React from "react";
import Chat from "./Chat/Chat";
import DiceBox from "./DiceBox/DiceBox";
import './RightSideContent.scss';

export default function RightSideContent() {
  return (
    <div className="right-content">
      <button className="right-side-button--chat">Chat</button>
      <button className="right-side-button--dice">Dice Box</button>
      <Chat />
      <DiceBox />
    </div>
  );
}
