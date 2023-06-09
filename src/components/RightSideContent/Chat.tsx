import React, { FormEvent, useState } from "react";
import { emitServerEvent, onServerEvent } from "../../scripts/socket-io";
import { ChatMsg } from "../../scripts/types";
import { roomRef, userRef } from "../../views/GamePage";


export default function Chat() {
  const [chat, setChat] = useState([]);
  const [messageText, setMessageText] = useState(localStorage.getItem('messageText') || '');

  const handleTypingMessage = (text: string) => {
    localStorage.setItem('messageText', text);
    setMessageText(text);
  };

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (messageText === '') return;
    // Emit message event
    emitServerEvent('SEND_MESSAGE', [{ text: messageText, sender: userRef.username }, roomRef]);
    setMessageText('');
    localStorage.setItem('messageText', '');
  };

  // Sends message in chat for everyone
  onServerEvent('SEND_MESSAGE', (msg: ChatMsg) => {
    setChat([...chat, msg]);
    setTimeout(() => document.querySelector('.chat__log').scrollTo(0, 999999), 50);
  });


  return (
    <div className="chat">
      <h3>Chat</h3>
      <div className="chat__log">
        {chat.map((msg: ChatMsg, i) => {
          return (
            <p key={i}>
              <span className={`chat__log--sender ${userRef.username === msg.sender && 'chat__log--sender--self'}`}>
                {msg.sender}:
              </span>
              {` ${msg.text}`}
            </p>
          );
        })}
      </div>
      <div className="chat__text-box">
        <form onSubmit={(e: FormEvent) => handleSubmitMessage(e)}>
          <input 
            value={messageText}
            onChange={(e) => handleTypingMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
