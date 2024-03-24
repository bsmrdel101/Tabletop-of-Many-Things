import { FormEvent, useState } from "react";
import { emitServerEvent, onServerEvent } from "../../scripts/config/socket-io";
import { useAppSelector } from "../../redux/hooks";
import { fetchUser } from "../../redux/reducers/userSlice";
import Input from "../Library/Input";
import { useAtom } from "jotai";
import { gameAtom } from "../../scripts/atoms/state";


export default function Chat() {
  const user = useAppSelector(fetchUser);
  const [gameData, setGameData] = useAtom(gameAtom);
  const [chat, setChat] = useState([]);
  const [messageText, setMessageText] = useState(localStorage.getItem('messageText') || '');

  const handleTypingMessage = (text: string) => {
    localStorage.setItem('messageText', text);
    setMessageText(text);
  };

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (messageText === '') return;
    emitServerEvent('SEND_MESSAGE', [{ text: messageText, sender: user.username }, gameData.room]);
    setMessageText('');
    localStorage.setItem('messageText', '');
  };

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
              <span className={`chat__log--sender ${user.username === msg.sender && 'chat__log--sender--self'}`}>
                {msg.sender}:
              </span>
              {` ${msg.text}`}
            </p>
          );
        })}
      </div>
      <div className="chat__text-box">
        <form onSubmit={(e: FormEvent) => handleSubmitMessage(e)}>
          <Input
            value={messageText}
            onChange={(e: any) => handleTypingMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
