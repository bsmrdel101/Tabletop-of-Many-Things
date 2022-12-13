import React, { useState } from "react";
import LogoutBtn from "../../components/LogoutBtn/LogoutBtn";
import { changeRoute } from "../../scripts/tools/router";
import { Game } from "../../scripts/types";
import './DashboardPage.scss';
import GameList from "../../components/GameList/GameList";
import GameListHistory from "../../components/GameListHistory/GameListHistory";
import { getGame } from "../../controllers/dashboardController";


export default function DashboardPage() {
  const [roomCodeInput, setRoomCodeInput] = useState('');

  const joinGame = async (roomCode: string) => {
    const game: Game = await getGame(roomCode);
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
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-container">
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
        <GameList joinGame={joinGame} />
        <GameListHistory joinGame={joinGame} />
        <LogoutBtn />
      </div>
    </div>
  );
}
