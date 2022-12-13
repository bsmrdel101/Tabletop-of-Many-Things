import React, { useEffect, useState } from "react";
import { addTokenToBoard } from "../../scripts/gridEvents";
import { bindEventsToGrid } from "../../scripts/gridInput";
import { Coord } from "../../scripts/types";
import './Grid.scss';


interface Props {
    width: number
    height: number
}

export default function Grid({ width, height }: Props) {
  const [gridCells, setGridCells] = useState<Coord[]>([]);
  const [selectedCell, setSelectedCell] = useState<any>({});

  useEffect(() => {
    setupGrid();
  }, []);

  const setupGrid = () => {
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', width);
    grid.style.setProperty('--grid-y', height);
    createGridClickDetection();
    // addGridEvents(grid);
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
    document.querySelectorAll('.token').forEach((token) => {
      token.remove();
    });
  };

  return (
    <div
      className="grid"
      onDragOver={(e) => setSelectedCell(e.target)}
      onDragEnd={() => addTokenToBoard(selectedCell)}
    >
      {gridCells.map((cell, i) => {
        return <div key={i} className="grid__cell cell"></div>;
      })}
    </div>
  );
}
