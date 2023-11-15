import { DragEvent } from "react";
import { Asset } from "../../../scripts/types";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { useAppSelector } from "../../../redux/hooks";
import { fetchGameData } from "../../../redux/reducers/gameSlice";
import { fetchCoordGridData } from "../../../redux/reducers/gridCoordSlice";


interface Props {
  asset: Asset
}

export default function AssetImage({ asset }: Props) {
  const { room, map } = useAppSelector(fetchGameData).game;
  const { currentZoom, panOffsetX, panOffsetY } = useAppSelector(fetchCoordGridData);
  
  const handleDropToken = (e: DragEvent) => {
    emitServerEvent('ADD_TOKEN_TO_BOARD', [e.clientX, e.clientY, asset, map.id, currentZoom, panOffsetX, panOffsetY, room]);
  };

  return (
    <img
      src={asset.image}
      className="menu__item menu__item--asset"
      onDragEnd={(e: DragEvent) => handleDropToken(e)}
    />
  );
}
