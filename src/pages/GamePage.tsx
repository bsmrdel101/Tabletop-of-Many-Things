import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TokensMenu from "../components/Menus/AssetsMenu/AssetsMenu";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { getGame } from "../scripts/controllers/dashboardController";
import { emitServerEvent } from "../scripts/config/socket-io";
import MapToolbar from "../components/MapToolbar/MapToolbar";
import MapsMenu from "../components/Menus/MapsMenu";
import RightSideContent from "../components/RightSideContent/RightSideContent";
import Canvas from "../components/Canvas";
import { getMap } from "../scripts/controllers/5e/mapsController";
import { setGrid } from "../redux/reducers/gridSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RightClickMenu from "../components/RightClickMenus/RightClickMenu";
import { fetchUser } from "../redux/reducers/userSlice";
import { getAllCreatures } from "../scripts/controllers/5e/creaturesController";
import { setCreatureData } from "../redux/reducers/creaturesSlice";
import CreaturesDialog from "../components/Dialogs/5e/Creatures/CreaturesDialog";
import { useAtom } from "jotai";
import { creaturesDialogAtom } from "../scripts/atoms/dialogs";
import { gameAtom } from "../scripts/atoms/state";


export default function GamePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(fetchUser);
  const [gameData, setGameData] = useAtom(gameAtom);
  const { room }: any = useParams();
  const [userType, setUserType] = useState<'dm' | 'player'>('player');
  const [creaturesModalOpen, setCreaturesModalOpen] = useAtom(creaturesDialogAtom);

  useEffect(() => {
    const setupGame = async () => {
      const game: Game = await getGame(room);
      const map: Map_5e = await getMap(game.map.id, game.id);
      
      if (!game) {
        console.error('game doesn\'t exist');
        return;
      }
  
      setGameData({
        game: game,
        room: room,
        map: map
      });
  
      dispatch(
        setGrid({
          cellSize: map.cellSize,
          gridColor: map.gridColor,
          gridOpacity: map.gridOpacity,
          offsetX: map.offsetX,
          offsetY: map.offsetY,
        })
      );

      const creatures: Creature_5e[] = await getAllCreatures(game.id);
      dispatch(setCreatureData(creatures));
  
      emitServerEvent('JOIN_ROOM', [user.username, room, (type: 'dm' | 'player') => {
        setUserType(type);
      }]);
    };
    setupGame();
  }, []);


  return (
    <div className="game-page">
      {gameData.game &&
        <>
          <Sidebar userType={userType} />
          <div className="game-content">
            <Toolbar room={room} />
            <div className="game-content--box">
              <div className="grid-container">
                <MapToolbar userType={userType} />
                <Canvas />
              </div>
              <RightSideContent />
            </div>
          </div>

          <TokensMenu />
          <MapsMenu />
          <CreaturesDialog open={creaturesModalOpen} setOpen={setCreaturesModalOpen} />

          <div onContextMenu={(e) => { e.preventDefault(); }}>
            <RightClickMenu />
          </div>
        </>
      }
    </div>
  );
}
