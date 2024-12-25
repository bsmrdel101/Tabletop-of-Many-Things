import { DragEvent } from "react";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { useAtom } from "jotai";
import { gameAtom } from "../../../scripts/atoms/state";
import { getGridCellCoords } from "../../../scripts/canvas/gridCanvas";
import { addTokenToMap } from "../../../scripts/controllers/5e/mapsController";

interface Props {
  asset: Asset
}


export default function AssetImage({ asset }: Props) {
  const [gameData] = useAtom(gameAtom);
  const { game, map, room } = gameData;

  const handleDropToken = async (e: DragEvent) => {
    const { x, y } = getGridCellCoords(e.clientX, e.clientY);
    const token: Token_5e = { id: null, assetId: asset.id, mapId: map.id, x, y, img: asset.img, size: 1, creature: null, character: null };
    await addTokenToMap(game.id, token, map.id, x, y);
    emitServerEvent('ADD_TOKEN_TO_BOARD', [room]);
  };


  return (
    <img
      src={asset.img}
      className="menu__item menu__item--asset"
      onDragEnd={(e: DragEvent) => handleDropToken(e)}
    />
  );
}
