import { useEffect } from "react";
import { initializeCanvas } from "../scripts/canvas/canvas";
import { useAtom } from "jotai";
import { gameAtom, rightClickMenuAtom } from "../scripts/atoms/state";


export default function Canvas() {
  const [gameData, setGameData] = useAtom<GameState>(gameAtom);
  const [rightClickMenu, setRightClickMenu] = useAtom(rightClickMenuAtom);

  useEffect(() => {
    initializeCanvas(gameData.map, gameData.game, gameData.room, updateMapAtom, updateContextMenuAtom);
  }, [gameData.map]);

  const updateMapAtom = (map: Map_5e) => {
    setGameData({ ...gameData, map });
  };

  const updateContextMenuAtom = (data: RightClickMenuState) => {
    setRightClickMenu({ ...rightClickMenu, ...data });
  };

  
  return (
    <>
      <canvas className="canvas--bg" id="bg-canvas"></canvas>
      <canvas className="canvas--grid" id="grid-canvas"
        onContextMenu={(e) => { e.preventDefault(); }}
      ></canvas>
    </>
  );
}
