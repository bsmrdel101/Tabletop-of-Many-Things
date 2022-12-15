import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import TokensMenu from "../../components/Menus/TokensMenu/TokensMenu";
import Sidebar from "../../components/Sidebar/Sidebar";
import Toolbar from "../../components/Toolbar/Toolbar";
import { getGame } from "../../controllers/dashboardController";
import { getUser } from "../../controllers/userController";
import { emitServerEvent } from "../../scripts/socket-io";
import { Game, User } from "../../scripts/types";
import './GamePage.scss';
import '../../components/Menus/Menus.scss';


export let roomRef: string;
export let userRef: User;

export default function GamePage() {
  const { room }: any = useParams();
  roomRef = room;
  const [userType, setUserType] = useState<'dm' | 'player'>('player');
  let gameStarted = false;

  useEffect(() => {
    if (!gameStarted) joinGame();
  }, []);

  const joinGame = async () => {
    gameStarted = true;
    const user = await getUser();
    userRef = user;
    const game: Game = await getGame(room);
    // Check if the game exists
    if (!game) {
      console.error('game doesn\'t exist');
      return;
    }

    emitServerEvent('JOIN_ROOM', [room, (type: 'dm' | 'player') => {
      setUserType(type === 'dm' && user.id === game.dm ? 'dm' : 'player');
    }]);
  };

  return (
    <div className="game-page">
      <Sidebar userType={userType} />
      <div className="game-content">
        <Toolbar room={room} />
        <div className="grid-container">
          <Grid width={40} height={40} />
        </div>
      </div>

      <TokensMenu />
    </div>
  );
}
