import React, { useEffect, useState } from "react";
import { setSelectedCell } from "../../redux/reducers/tokenSlice";
import { bindEventsToGrid } from "../../scripts/gridInput";
import { onServerEvent } from "../../scripts/socket-io";
import { findCell } from "../../scripts/tools/utils";
import { Coord, Map } from "../../scripts/types";
import { useAppDispatch } from "../../redux/hooks";
import { Token } from "../../scripts/token";
import './Grid.scss';


interface Props {
  defaultGridSize: number
}

export let selectedCellRef: Element;

export default function Grid({ defaultGridSize }: Props) {
  const [gridCells, setGridCells] = useState<Coord[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!document.querySelector('.grid__cell')) setupGrid(defaultGridSize);

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
    onServerEvent('SELECT_MAP', ((map: Map) => {
      const grid: any = document.querySelector('.grid');
      if (map.name === 'Default Map') {
        // Set image to nothing
        grid.style.setProperty('--map-background', `rgb(237 237 237 / 52%)`);
        setupGrid(map.gridSize);
      } else {
        // Set new map image
        grid.style.setProperty('--map-background', `url('${map.image}')`);
        setupGrid(map.gridSize);
      }
    }));

    // Modify the grid size
    onServerEvent('SET_GRID', ((gridSize: number) => {
      setupGrid(parseInt(gridSize.toString()));
    }));

    /* === END SOCKET.IO === */
  }, [defaultGridSize]);


  const selectCell = (e: any) => {
    selectedCellRef = e.target;
    dispatch(
      setSelectedCell({
        x: parseInt(e.target.getAttribute('data-cell-x')),
        y: parseInt(e.target.getAttribute('data-cell-y'))
      }));
  };

  const setupGrid = (gridSize: number) => {
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', gridSize);
    grid.style.setProperty('--grid-y', gridSize);
    createGridClickDetection(gridSize);
    bindEventsToGrid();
  };

  // Generates div's in each cell, with x and y coordinates
  // The div's will detect where the user drops a token
  const createGridClickDetection = (gridSize: number) => {
    // Add the elements to detect clicks on grid cells
    // Add 1 to width and height because grid starts at (1,1)
    resetBoard();
    const cells: Coord[] = [];
    for (let y = 1; y < gridSize + 1; y++) {
      for (let x = 1; x < gridSize + 1; x++) {
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
