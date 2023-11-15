import { changeRoute } from "../scripts/tools/router";
import { emitServerEvent, socket } from "../scripts/config/socket-io";
import { useState } from "react";


interface Props {
  room: string
}

export default function Toolbar({ room }: Props) {
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [playerList, setPlayerList] = useState([]);

  const leaveGame = () => {
    socket.disconnect();
    changeRoute('/');
  };

  const togglePlayerList = () => {
    emitServerEvent('GET_PLAYER_LIST', [room, (playerList: string[]) => {
      setPlayerList(playerList);
    }]);
    setShowPlayerList(!showPlayerList);
  };

  return (
    <div className="toolbar">
      {/* <button className="toolbar__btn" onClick={togglePlayerList}>{ showPlayerList ? 'Hide' : 'Show' } Player List</button> */}
      <p className="toolbar__text">Room: {room}</p>
      <a className="toolbar__leave-btn" onClick={leaveGame}>Leave Game</a>

      {showPlayerList &&
        <div className="toolbar__player-list">
          {playerList.map((username: string, i) => {
            return (
              <p key={i}>{ username }</p>
            );
          })}
        </div>
      }
    </div>
  );
}
