import { useState } from "react";
import LogoutBtn from "../components/LogoutBtn";
import { changeRoute } from "../scripts/tools/router";
import GameList from "../components/Dashboard/GameList";
import GameListHistory from "../components/Dashboard/GameListHistory";
import { getGame } from "../scripts/controllers/dashboardController";
import { useAppSelector } from "../redux/hooks";
import { getMap } from "../scripts/controllers/5e/mapsController";
import { fetchUser } from "../redux/reducers/userSlice";
import { useAtom } from "jotai";
import { gameAtom } from "../scripts/atoms/state";
import Input from "../components/Library/Input";
import Button from "../components/Library/Button";
import { Link } from "react-router-dom";


export default function DashboardPage() {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const user = useAppSelector(fetchUser);
  const [_, setGameData] = useAtom(gameAtom);

  const joinGame = async (roomCode: string) => {
    const game: Game = await getGame(roomCode);
    const map: Board = await getMap(game.mapId, game.id);
    setGameData({
      game: game,
      room: roomCode,
      map: map
    });

    if (!game) return;
    changeRoute(`/game/${roomCode}`);
  };

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    joinGame(roomCodeInput);
  };

  return (
    <div className="dashboard-page">
      <h1>Tabletop of <br /> Many Things</h1>

      <div className="dashboard-page__content">
        <form onSubmit={(e) => handleJoinRoom(e)}>
          <Input
            className="dashboard-page__join-room-input"
            placeholder="room code"
            value={roomCodeInput}
            onChange={(e: any) => setRoomCodeInput(e.target.value)}
            required
          />
          <Button variant={['plain']} type="submit">Join Room</Button>
        </form>

        <div className="dashboard-page__links-list">
          <Link to="/characters">Characters</Link>
        </div>

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
