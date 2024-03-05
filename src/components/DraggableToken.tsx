import { useAppSelector } from "../redux/hooks";
import { fetchGameData } from "../redux/reducers/gameSlice";
import { fetchCoordGridData } from "../redux/reducers/gridCoordSlice";
import { emitServerEvent } from "../scripts/config/socket-io";
import { getNumberFromSize } from "../scripts/tools/stringUtils";

interface Props {
  asset: Asset
  creature?: Creature
  className?: string
}


export default function DraggableToken({ asset, creature, className }: Props) {
  const { room, map } = useAppSelector(fetchGameData).game;
  const { currentZoom, panOffsetX, panOffsetY } = useAppSelector(fetchCoordGridData);

  const handleDropToken = (e: DragEvent) => {
    emitServerEvent('ADD_TOKEN_TO_BOARD', [e.clientX, e.clientY, { id: asset.id, image: asset.image, creature: creature, size: getNumberFromSize(creature.size) }, map.id, currentZoom, panOffsetX, panOffsetY, room]);
  };


  return (
    <img
      className={className}
      draggable={true}
      src={asset.image}
      alt="token"
      onDragEnd={(e) => handleDropToken(e as any)}
    />
  );
}
