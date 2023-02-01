import { roomRef, userRef } from "../views/GamePage/GamePage";
import { emitServerEvent } from "./socket-io";
import { Token } from "./components/token";
import { clamp, findCell, findRelativeCell, getCoords } from "./tools/utils";
import { Coord } from "./types";


const zoomMin = 4, zoomMax = 64;

export const dropToken = (selectedCell: Coord, token: Token, mousePos: Coord) => {
  const { el } = token;
  const cell: Element = findCell(selectedCell.x, selectedCell.y)!;

  if (el.classList.contains('menu__item')) {
    // If this is token is being dragged out from the menu, then place it exactly where the mouse cursor is.
    addTokenToBoard(cell, token);
  } else {
    // Else place it normally
    const relativeCell = findRelativeCell(cell, mousePos.x, mousePos.y);
    addTokenToBoard(relativeCell || cell, token);
  }
  
  // Store token data on map
  // updateMapTokens({ token: token, x: selectedCell.x, y: selectedCell.y, size: parseInt(el.getAttribute('size')) });
};

export const addTokenToBoard = (selectedCell: Element, token: Token) => {
  const { el } = token;
  const cell: Coord = getCoords(selectedCell);

  // Clone token being dragged from menu
  el.classList.remove('token--dragging');

  // Send a server event to place a token for every client
  const socketPlaceToken = (cell: Coord, token: Token, username: string, room: string) => {
    emitServerEvent('PLACE_TOKEN', [cell, token, username, room]);
  };
  
  // Handle placing token from menu
  if (!parseInt(selectedCell.getAttribute('data-cell-x')!)) {
    el.classList.remove('menu__item');
    el.classList.remove('menu__item--token');
  }
  socketPlaceToken(cell, token, userRef.username, roomRef);
};

export const zoomIn = () => {
  const grid: any = document.querySelector('.grid');
  const rs = getComputedStyle(grid);
  const zoomValue = parseInt(rs.getPropertyValue('--size'));
  grid.style.setProperty('--size', `${clamp(zoomValue + 1, zoomMin, zoomMax)}px`);
};

export const zoomOut = () => {
  const grid: any = document.querySelector('.grid');
  const rs = getComputedStyle(grid);
  const zoomValue = parseInt(rs.getPropertyValue('--size'));
  grid.style.setProperty('--size', `${clamp(zoomValue - 1, zoomMin, zoomMax)}px`);
};
