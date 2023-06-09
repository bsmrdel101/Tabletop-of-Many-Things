import React, { DragEvent } from "react";
import { Token } from "../../../scripts/types";
import { roomRef } from "../../../views/GamePage";
import { emitServerEvent } from "../../../scripts/socket-io";
import { selectedMap } from "../MapsMenu";


interface Props {
  token: Token
}

export default function MenuTokenIcon({ token }: Props) {
  const handleDropToken = (e: DragEvent) => {
    emitServerEvent('ADD_TOKEN_TO_BOARD', [e.clientX, e.clientY, token, selectedMap.id, roomRef]);
  };

  return (
    <img
      src={token.image}
      className="menu__item menu__item--token"
      onDragEnd={(e: DragEvent) => handleDropToken(e)}
    />
  );
}
