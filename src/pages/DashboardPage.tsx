import { useState } from "react";
import LogoutBtn from "../components/LogoutBtn";
import { changeRoute } from "../scripts/tools/router";
import GameList from "../components/Dashboard/GameList";
import GameListHistory from "../components/Dashboard/GameListHistory";
import { getGame } from "../scripts/controllers/dashboardController";
import { setGameData } from "../redux/reducers/gameSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMap } from "../scripts/controllers/mapsController";
import { fetchUser } from "../redux/reducers/userSlice";


export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const user = useAppSelector(fetchUser);

  const joinGame = async (roomCode: string) => {
    const game: Game = await getGame(roomCode);
    const map: Board = await getMap(game.map_id, game.id);

    dispatch(
      setGameData({
        game: game,
        room: roomCode,
        map: map
      })
    );
    // Check if the game exists
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
        {/* <div>
          <button>Play</button>
        </div> */}
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
