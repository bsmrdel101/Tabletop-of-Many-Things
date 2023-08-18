import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TokensMenu from "../components/Menus/TokensMenu/TokensMenu";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { getGame } from "../scripts/controllers/dashboardController";
import { emitServerEvent } from "../scripts/config/socket-io";
import { Game, Map } from "../scripts/types";
import MapToolbar from "../components/MapToolbar/MapToolbar";
import MapsMenu from "../components/Menus/MapsMenu";
import RightSideContent from "../components/RightSideContent/RightSideContent";
import CreaturesModal from "../components/Modals/CreaturesModal/CreaturesModal";
import GridCanvas from "../components/Canvas";
import { getMap } from "../scripts/controllers/mapsController";
import { setGrid } from "../redux/reducers/gridSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RightClickMenu from "../components/RightClickMenus/RightClickMenu";
import { fetchUser } from "../redux/reducers/userSlice";
import { fetchGameData, setGameData } from "../redux/reducers/gameSlice";


export default function GamePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(fetchUser);
  const { game } = useAppSelector(fetchGameData).game;
  const { room }: any = useParams();
  const [userType, setUserType] = useState<'dm' | 'player'>('player');


  useEffect(() => {
    const setupGame = async () => {
      const game: Game = await getGame(room);
      const map: Map = await getMap(game.map_id, game.id);
      
      // Check if the game exists
      if (!game) {
        console.error('game doesn\'t exist');
        return;
      }
  
      dispatch(
        setGameData({
          game: game,
          room: room,
          map: map
        })
      );
  
      dispatch(
        setGrid({
          cellSize: map.cellSize,
          gridColor: map.gridColor,
          gridOpacity: map.gridOpacity,
          offsetX: map.offsetX,
          offsetY: map.offsetY,
        })
      );
  
      emitServerEvent('JOIN_ROOM', [user.username, room, (type: 'dm' | 'player') => {
        setUserType(type);
      }]);
    };
    setupGame();
  }, []);


  return (
    <div className="game-page">
      {game &&
        <>
          <Sidebar userType={userType} />
          <div className="game-content">
            <Toolbar room={room} />
            <div className="game-content--box">
              <div className="grid-container">
                <MapToolbar userType={userType} />
                <GridCanvas userType={userType} />
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
        </>
      }
    </div>
  );
}
