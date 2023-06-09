import React from "react";
import Chat from "./Chat";
import DiceBox from "./DiceBox";


export default function RightSideContent() {
  const popOutChat = () => {
    document.querySelector('.chat').classList.toggle('chat--pop-out');
  };

  const popOutDiceBox = () => {
    document.querySelector('.dice-box').classList.toggle('dice-box--pop-out');
  };

  return (
    <div className="right-content">
      <button className="right-side-button--chat" onClick={popOutChat}>Chat</button>
      <button className="right-side-button--dice" onClick={popOutDiceBox}>Dice Box</button>
      <Chat />
      <DiceBox />
    </div>
  );
}
