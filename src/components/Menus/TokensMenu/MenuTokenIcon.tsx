import React from "react";
import { getGame } from "../../../controllers/dashboardController";
import { updateMapTokens } from "../../../controllers/mapsController";
import { useAppSelector } from "../../../redux/hooks";
import { selectedCell } from "../../../redux/reducers/tokenSlice";
import { dropToken } from "../../../scripts/gridEvents";
import { Token } from "../../../scripts/token";
import { Coord, Game } from "../../../scripts/types";
import { roomRef } from "../../../views/GamePage/GamePage";
import './Token.scss';


interface Props {
  token: Token
}

export default function MenuTokenIcon({ token }: Props) {
  const cell = useAppSelector(selectedCell);
  let mousePos: Coord = { x: 1, y: 1 };

  // Gets the position of the mouse at the start of drag
  const handleTokenStartDrag = (e: any) => {
    // Store position data
    const tokenPos = e.target.getBoundingClientRect();
    mousePos = {
      x: e.x - tokenPos.x,
      y: e.y - tokenPos.y
    };
  };

  const handleDropToken = async () => {
    dropToken(cell, token, mousePos);
    // Store token data on map
    const game: Game = await getGame(roomRef);
    updateMapTokens({ token: token, x: cell.x, y: cell.y, size: parseInt(token.el.getAttribute('size')), game });
  };

  return (
    <img
      src={token.image}
      className="menu__item menu__item--token"
      onDragStart={(e) => handleTokenStartDrag(e)}
      onDragEnd={() => handleDropToken()}
    />
  );
}
