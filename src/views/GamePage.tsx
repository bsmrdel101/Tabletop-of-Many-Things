import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TokensMenu from "../components/Menus/TokensMenu/TokensMenu";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { getGame } from "../scripts/controllers/dashboardController";
import { getUser } from "../scripts/controllers/userController";
import { emitServerEvent } from "../scripts/socket-io";
import { Game, User } from "../scripts/types";
import MapToolbar from "../components/MapToolbar/MapToolbar";
import MapsMenu from "../components/Menus/MapsMenu";
import RightSideContent from "../components/RightSideContent/RightSideContent";
import CreaturesModal from "../components/Modals/CreaturesModal/CreaturesModal";
import GridCanvas from "../components/Canvas";
import { getMap } from "../scripts/controllers/mapsController";
import { setGrid } from "../redux/reducers/gridSlice";
import { useAppDispatch } from "../redux/hooks";
import RightClickMenu from "../components/RightClickMenus/RightClickMenu";


export let roomRef: string;
export let userRef: User;
export let gameRef: Game;

export default function GamePage() {
  const { room }: any = useParams();
  roomRef = room;
  const [userType, setUserType] = useState<'dm' | 'player'>('player');
  let gameStarted = false;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameStarted) joinGame();
  }, []);

  const joinGame = async () => {
    gameStarted = true;
    const user = await getUser();
    userRef = user;
    const game: Game = await getGame(room);
    const map = await getMap(game.map_id);
    gameRef = game;
    // Check if the game exists
    if (!game) {
      console.error('game doesn\'t exist');
      return;
    }

    dispatch(
      setGrid({
        cellSize: map.cellSize,
        gridColor: map.gridColor,
        gridOpacity: map.gridOpacity,
        offsetX: map.offsetX,
        offsetY: map.offsetY,
      })
    );

    emitServerEvent('JOIN_ROOM', [room, () => {
      setUserType(user.id === game.dm ? 'dm' : 'player');
    }]);
  };


  return (
    <div className="game-page">
      <Sidebar userType={userType} />
      <div className="game-content">
        <Toolbar room={room} />
        <div className="game-content--box">
          <div className="grid-container">
            <MapToolbar userType={userType} />
            <GridCanvas />
          </div>
          <RightSideContent />
        </div>
      </div>

      {/* Menus */}
      <TokensMenu />
      <MapsMenu />
      <CreaturesModal />

      {/* Right click menu */}
      <div onContextMenu={(e) => { e.preventDefault(); }}>
        <RightClickMenu />
      </div>
    </div>
  );
}
