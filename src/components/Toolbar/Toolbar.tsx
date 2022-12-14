import React from "react";
import { changeRoute } from "../../scripts/tools/router";
import { socket } from '../../components/App/App';
import './Toolbar.scss';
import { zoomIn, zoomOut } from "../../scripts/gridEvents";

interface Props {
  room: string
}

export default function Toolbar({ room }: Props) {
  const leaveGame = () => {
    socket.disconnect();
    changeRoute('/dashboard');
  };

  return (
    <div className="toolbar">
      <button className="toolbar__btn" onClick={zoomIn}>+</button>
      <button className="toolbar__btn" onClick={zoomOut}>-</button>
      <button className="toolbar__btn">Show Players</button>
      <p className="toolbar__text">Room: {room}</p>
      <a className="toolbar__leave-btn" onClick={leaveGame}>Leave Game</a>
    </div>
  );
}
