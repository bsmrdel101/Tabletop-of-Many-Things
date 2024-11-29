import { useAtom } from "jotai";
import { getGridCellCoords } from "../scripts/canvas/gridCanvas";
import { emitServerEvent } from "../scripts/config/socket-io";
import { getNumberFromSize } from "../scripts/tools/stringUtils";
import { gameAtom } from "../scripts/atoms/state";
import { addTokenToMap } from "../scripts/controllers/5e/mapsController";

interface Props {
  asset: Asset
  creature?: Creature
  character?: Character
  className?: string
}


export default function DraggableToken({ asset, creature, character, className }: Props) {
  const [gameData] = useAtom(gameAtom);
  const { game, map, room } = gameData;

  const handleDropToken = async (e: DragEvent) => {
    const { x, y } = getGridCellCoords(e.clientX, e.clientY);
    const token: Token = { id: null, assetId: asset.id, mapId: map.id, x, y, image: asset.img, size: getNumberFromSize(creature.size), creature, character };
    await addTokenToMap(game.id, token, map.id, x, y);
    emitServerEvent('ADD_TOKEN_TO_BOARD', [room]);
  };


  return (
    <img
      className={className}
      draggable={true}
      src={asset.img}
      alt="token"
      onDragEnd={(e) => handleDropToken(e as any)}
    />
  );
}
