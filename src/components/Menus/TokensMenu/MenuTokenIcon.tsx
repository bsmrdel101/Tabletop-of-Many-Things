import { DragEvent } from "react";
import { Token } from "../../../scripts/types";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { useAppSelector } from "../../../redux/hooks";
import { fetchGameData } from "../../../redux/reducers/gameSlice";


interface Props {
  token: Token
}

export default function MenuTokenIcon({ token }: Props) {
  const { room, map } = useAppSelector(fetchGameData).game;
  
  const handleDropToken = (e: DragEvent) => {
    emitServerEvent('ADD_TOKEN_TO_BOARD', [e.clientX, e.clientY, token, map.id, room]);
  };

  return (
    <img
      src={token.image}
      className="menu__item menu__item--token"
      onDragEnd={(e: DragEvent) => handleDropToken(e)}
    />
  );
}
