import React, { useEffect, useState } from "react";
import { setSelectedCell } from "../../redux/reducers/tokenSlice";
import { bindEventsToGrid } from "../../scripts/gridInput";
import { onServerEvent } from "../../scripts/socket-io";
import { composedPath, findCell } from "../../scripts/tools/utils";
import { Coord } from "../../scripts/types";
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
    setupGrid();

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

    /* === END SOCKET.IO === */
  }, []);

  const selectCell = (e: any) => {
    selectedCellRef = e.target;
    if (e.target.parentNode.classList.contains('grid__cell')) {
      // selectedCellRef = e.target.parentNode;
      // composedPath(e.target).forEach((el: any) => {
      //   if (el.classList && el.classList.contains('grid__cell')) console.log(el);
      // });
    }
    dispatch(
      setSelectedCell({
        x: parseInt(e.target.getAttribute('data-cell-x')),
        y: parseInt(e.target.getAttribute('data-cell-y'))
      }));
  };

  const setupGrid = () => {
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', width);
    grid.style.setProperty('--grid-y', height);
    createGridClickDetection();
    bindEventsToGrid();
  };

  // Generates div's in each cell, with x and y coordinates
  // The div's will detect where the user drops a token
  const createGridClickDetection = () => {
    resetBoard();
    // Add the elements to detect clicks on grid cells
    // Add 1 to width and height because grid starts at (1,1)
    const cells: Coord[] = [];
    for (let y = 1; y < height + 1; y++) {
      for (let x = 1; x < width + 1; x++) {
        cells.push({ x: x, y: y });
      }
    }
    setGridCells(cells);
  };

  // Clears the board and resets its click detection
  const resetBoard = () => {
    document.querySelectorAll('.grid__cell').forEach((cell) => {
      cell.remove();
    });
    // document.querySelectorAll('.token').forEach((token) => {
    //   token.remove();
    // });
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
