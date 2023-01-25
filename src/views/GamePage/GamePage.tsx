import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import TokensMenu from "../../components/Menus/TokensMenu/TokensMenu";
import Sidebar from "../../components/Sidebar/Sidebar";
import Toolbar from "../../components/Toolbar/Toolbar";
import { getGame } from "../../controllers/dashboardController";
import { getUser } from "../../controllers/userController";
import { emitServerEvent } from "../../scripts/socket-io";
import { Game, Map, User } from "../../scripts/types";
import MapToolbar from "../../components/MapToolbar/MapToolbar";
import MapsMenu from "../../components/Menus/MapsMenu/MapsMenu";
import RightSideContent from "../../components/RightSideContent/RightSideContent";
import { getMap } from "../../controllers/mapsController";
import './GamePage.scss';
import '../../components/Menus/Menus.scss';


export let roomRef: string;
export let userRef: User;

export default function GamePage() {
  const { room }: any = useParams();
  roomRef = room;
  const [userType, setUserType] = useState<'dm' | 'player'>('player');
  let gameStarted = false;
  const [gridSize, setGridSize] = useState(0);

  useEffect(() => {
    if (!gameStarted) joinGame();
    determineGridSize();
  }, [gridSize]);

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

    emitServerEvent('JOIN_ROOM', [room, () => {
      setUserType(user.id === game.dm ? 'dm' : 'player');
    }]);
  };

  // Determine grid size from map
  const determineGridSize = async () => {
    const game: Game = await getGame(room);
    const map: Map = await getMap(game.map_id);
    setGridSize(map.gridSize);
  };

  return (
    <div className="game-page">
      <Sidebar userType={userType} />
      <div className="game-content">
        <Toolbar room={room} />
        <div className="game-content--box">
          <div className="grid-container">
            <MapToolbar userType={userType} />
            <Grid defaultGridSize={gridSize} />
          </div>
          <RightSideContent />
        </div>
      </div>

      {/* Menus */}
      <TokensMenu />
      <MapsMenu />
    </div>
  );
}
