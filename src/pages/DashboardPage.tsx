import { useState } from "react";
import LogoutBtn from "../components/LogoutBtn";
import { changeRoute } from "../scripts/tools/router";
import GameList from "../components/Dashboard/GameList";
import GameListHistory from "../components/Dashboard/GameListHistory";
import { getGame } from "../scripts/controllers/dashboardController";
import { useAppSelector } from "../redux/hooks";
import { getMap } from "../scripts/controllers/mapsController";
import { fetchUser } from "../redux/reducers/userSlice";
import { useAtom } from "jotai";
import { gameAtom } from "../scripts/atoms/state";


export default function DashboardPage() {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const user = useAppSelector(fetchUser);
  const [gameData, setGameData] = useAtom(gameAtom);

  const joinGame = async (roomCode: string) => {
    const game: Game = await getGame(roomCode);
    const map: Board = await getMap(game.map_id, game.id);
    
    setGameData({
      game: game,
      room: roomCode,
      map: map
    });

    if (!game) {
      console.warn('game doesn\'t exist');
      return;
    }

    changeRoute(`/game/${roomCode}`);
  };

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    joinGame(roomCodeInput);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__container">
        <h1>Tabletop of <br /> Many Things</h1>
      </div>

      <div className="dashboard-page__container--right-side">
        <form onSubmit={(e) => handleJoinRoom(e)}>
          <input
            className="dashboard-page__join-room-input"
            placeholder="room code"
            value={roomCodeInput}
            onChange={(e) => setRoomCodeInput(e.target.value)}
            required
          />
          <button type="submit">Join Room</button>
        </form>
        <div style={{ display:'flex', gap:'1rem' }}>
          <GameList joinGame={joinGame} />
          <GameListHistory joinGame={joinGame} />
        </div>
      </div>

      <div className="dashboard-page__user-box">
        <p>{ user.username }</p>
        <LogoutBtn />
      </div>
    </div>
  );
}
