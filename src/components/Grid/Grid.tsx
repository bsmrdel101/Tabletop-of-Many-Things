import React, { useEffect, useState } from "react";
import { setSelectedCell } from "../../redux/reducers/tokenSlice";
import { bindEventsToGrid } from "../../scripts/gridInput";
import { onServerEvent } from "../../scripts/socket-io";
import { composedPath, findCell } from "../../scripts/tools/utils";
import { Area, Coord, Map } from "../../scripts/types";
import { useAppDispatch } from "../../redux/hooks";
import './Grid.scss';
import { Token } from "../../scripts/token";


interface Props {
  width: number
  height: number
}

export let selectedCellRef: Element;

export default function Grid({ width, height }: Props) {
  const [gridCells, setGridCells] = useState<Coord[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!document.querySelector('.grid__cell')) setupGrid(width, height);

    /* === SOCKET.IO === */
    // Add a token to the board
    onServerEvent('PLACE_TOKEN', ((selectedCell: Coord, tokenData: Token) => {
      const { x, y } = selectedCell;
      const cell: Element = findCell(x, y)!;
      if (cell.childNodes.length > 0) return;
      const { size, el } = new Token(
        tokenData.id,
        tokenData.image,
        tokenData.size,
        tokenData.creature
      );
      
      cell.appendChild(el);
      el.classList.remove('menu__item', 'menu__item--token');
      
      // Set token size
      el.style.setProperty('height', `calc(var(--size) * ${size})`);
      el.style.setProperty('width', `calc(var(--size) * ${size})`);
      // Set token position
      el.style.setProperty('--row', `${x}`);
      el.style.setProperty('--column', `${y}`);

      // Takes up grid squares for token
      setTokenArea(tokenData, selectedCell);
    }));

    onServerEvent('REMOVE_TOKEN', ((cell: Coord) => {
      const previousCell: Element = findCell(cell.x, cell.y)!;
      previousCell.innerHTML = '';
    }));

    // Change the selected map
    onServerEvent('SELECT_MAP', ((target: Area, map: Map) => {
      const grid: any = document.querySelector('.grid');
      if (map.name === 'Default Map') {
        // Set image to nothing
        grid.style.setProperty('--map-background', `rgb(237 237 237 / 52%)`);
        setupGrid(width, height);
      } else {
        // Set new map image
        grid.style.setProperty('--map-background', `url('${map.image}')`);
        setupGrid(target.width, target.height);
      }
    }));

    // Modify the grid size
    onServerEvent('SET_GRID', ((gridSize: Area) => {
      setupGrid(parseInt(gridSize.width.toString()), parseInt(gridSize.height.toString()));
    }));

    /* === END SOCKET.IO === */
  }, []);


  const selectCell = (e: any) => {
    selectedCellRef = e.target;
    dispatch(
      setSelectedCell({
        x: parseInt(e.target.getAttribute('data-cell-x')),
        y: parseInt(e.target.getAttribute('data-cell-y'))
      }));
  };

  const setupGrid = (gridWidth: number, gridHeight: number) => {
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', gridWidth);
    grid.style.setProperty('--grid-y', gridHeight);
    createGridClickDetection(gridWidth, gridHeight);
    bindEventsToGrid();
  };

  // Generates div's in each cell, with x and y coordinates
  // The div's will detect where the user drops a token
  const createGridClickDetection = (gridWidth: number, gridHeight: number) => {
    // resetBoard();
    // Add the elements to detect clicks on grid cells
    // Add 1 to width and height because grid starts at (1,1)
    const cells: Coord[] = [];
    for (let y = 1; y < gridHeight + 1; y++) {
      for (let x = 1; x < gridWidth + 1; x++) {
        cells.push({ x: x, y: y });
      }
    }
    setGridCells(cells);
  };

  // Clears the board and resets its click detection
  const resetBoard = () => {
    document.querySelector('.grid').innerHTML = '';
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
