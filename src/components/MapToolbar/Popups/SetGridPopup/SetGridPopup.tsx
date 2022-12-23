import React, { useState } from "react";
import { emitServerEvent } from "../../../../scripts/socket-io";
import { roomRef } from "../../../../views/GamePage/GamePage";
import './SetGridPopup.scss';


interface Props {
  title: string
}

export default function SetGridPopup({ title }: Props) {
  const [gridSize, setGridSize] = useState(40);
  let gridSizeValue = 40;

  const handleChangeGridSize = (e: any) => {
    setGridSize(e.target.value);
    gridSizeValue = e.target.value;
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', gridSizeValue);
    grid.style.setProperty('--grid-y', gridSizeValue);

    // Remove tokens
    document.querySelectorAll('.token').forEach((token) => {
      token.remove();
    });
  };

  const handleApplyChanges = (e: any) => {
    e.preventDefault();
    emitServerEvent('SET_GRID', [{ width: gridSize, height: gridSize }, roomRef]);
  };


  return (
    <form onSubmit={(e) => handleApplyChanges(e)} className="set-grid-popup">
      <h3>{title}</h3>
      <input
        className="input--sm"
        type="number"
        value={gridSize}
        onChange={(e) => handleChangeGridSize(e)}
      />
      <input
        type="range"
        min={5}
        max={65}
        step={5}
        value={gridSize}
        onChange={(e) => handleChangeGridSize(e)}
      />
      <div className="set-grid-popup__row">
        <input
          type="number"
          placeholder="width"
        />
        <input
          type="number"
          placeholder="height"
        />
      </div>
      <center>
        <button type="submit">Apply</button>
      </center>
    </form>
  );
}
