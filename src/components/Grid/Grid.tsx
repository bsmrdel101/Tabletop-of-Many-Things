import React, { useEffect, useState } from "react";
import { setSelectedCell } from "../../redux/reducers/tokenSlice";
import { bindEventsToGrid } from "../../scripts/gridInput";
import { emitServerEvent, onServerEvent } from "../../scripts/socket-io";
import { findCell } from "../../scripts/tools/utils";
import { Coord, Game, GridSize, Map, MapToken } from "../../scripts/types";
import { useAppDispatch } from "../../redux/hooks";
import { Token } from "../../scripts/token";
import { roomRef, userRef } from "../../views/GamePage/GamePage";
import { getGame } from "../../controllers/dashboardController";
import { deleteTokenFromMap, getMapTokens } from "../../controllers/mapsController";
import { getToken } from "../../controllers/tokensController";
import './Grid.scss';


interface Props {
  defaultGridSize: GridSize
}

export let selectedCellRef: Element;

export default function Grid({ defaultGridSize }: Props) {
  const [gridCells, setGridCells] = useState<Coord[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!document.querySelector('.grid__cell')) setupGrid(defaultGridSize);
    // load all tokens onto the board
    loadTokens();

    /* === SOCKET.IO === */
    // Add a token to the board
    onServerEvent('PLACE_TOKEN', ((selectedCell: Coord, tokenData: Token) => {
      const { x, y } = selectedCell;
      const cell: Element = findCell(x, y)!;
      if (cell.childNodes.length > 0) return;
      const { size, el, id } = new Token(
        tokenData.id,
        tokenData.image,
        tokenData.size,
        tokenData.creature
      );
      
      cell.appendChild(el);
      el.classList.remove('menu__item', 'menu__item--token');
      el.setAttribute('token-id', id);
      
      // Set token size
      el.style.setProperty('height', `calc(var(--size) * ${size})`);
      el.style.setProperty('width', `calc(var(--size) * ${size})`);
      // Set token position
      el.style.setProperty('--row', `${x}`);
      el.style.setProperty('--column', `${y}`);

      // Takes up grid squares for token
      // setTokenArea(tokenData, selectedCell);
    }));

    onServerEvent('REMOVE_TOKEN', ((cell: Coord, token: Token) => {
      const previousCell: Element = findCell(cell.x, cell.y)!;
      previousCell.innerHTML = '';
      // Delete persistent token data from map
      // deleteTokenFromMap(token, cell);
    }));

    // Change the selected map
    onServerEvent('SELECT_MAP', ((map: Map) => {
      const grid: any = document.querySelector('.grid');
      if (map.name === 'Default Map') {
        // Set image to nothing
        grid.style.setProperty('--map-background', `rgb(237 237 237 / 52%)`);
      } else {
        // Set new map image
        grid.style.setProperty('--map-background', `url('${map.image}')`);
      }
      setupGrid({ gridSizeX: map.gridSizeX, gridSizeY: map.gridSizeY });
      loadTokens();
    }));

    // Modify the grid size
    onServerEvent('SET_GRID', ((gridSize: GridSize) => {
      setupGrid(gridSize);
    }));

    /* === END SOCKET.IO === */
  }, []);

  const loadTokens = async () => {
    // Delete all tokens from the board
    document.querySelectorAll('.token').forEach((token) => {
      token.remove();
    });

    const game: Game = await getGame(roomRef);
    const tokens = await getMapTokens(game.map_id);
    // Load tokens onto board
    tokens.forEach(async (mapToken: MapToken) => {
      const { x, y, token_id } = mapToken;
      const token = await getToken(token_id);
      emitServerEvent('PLACE_TOKEN', [{ x, y }, token, userRef.username, roomRef]);
    });
  };

  const selectCell = (e: any) => {    
    selectedCellRef = e.target;
    dispatch(
      setSelectedCell({
        x: parseInt(e.target.getAttribute('data-cell-x')),
        y: parseInt(e.target.getAttribute('data-cell-y'))
      }));
  };

  const setupGrid = (gridSize: GridSize) => {
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', gridSize.gridSizeX);
    grid.style.setProperty('--grid-y', gridSize.gridSizeY);
    createGridClickDetection(gridSize);
    bindEventsToGrid();
  };

  // Generates div's in each cell, with x and y coordinates
  // The div's will detect where the user drops a token
  const createGridClickDetection = (gridSize: GridSize) => {
    // Add the elements to detect clicks on grid cells
    // Add 1 to width and height because grid starts at (1,1)
    resetBoard();
    const cells: Coord[] = [];
    for (let y = 1; y < gridSize.gridSizeY + 1; y++) {
      for (let x = 1; x < gridSize.gridSizeX + 1; x++) {
        cells.push({ x: x, y: y });
      }
    }
    setGridCells(cells);
  };

  const setTokenArea = (token: Token, selectedCell: Coord) => {
    const cellX = selectedCell.x;
    const cellY = selectedCell.y;
    if (token.size > 1) {
      for (let y = 0; y < token.size; y++) {
        for (let x = 0; x < token.size; x++) {
          const cell = findCell(cellX + x, cellY + y);
        }
      }
    }
  };

  const resetBoard = () => {
    const grid: any = document.querySelector('.grid');
    grid.innerHtml = '';
  };


  return (
    <div
      className="grid"
      onDragOver={(e) => selectCell(e)}
    >
      {gridCells.map((cell, i) => {
        return (
          <div
            key={i}
            className="grid__cell cell"
            data-cell-x={cell.x}
            data-cell-y={cell.y}
          >
          </div>
        );
      })}
    </div>
  );
}
