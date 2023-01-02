import React, { useEffect, useState } from "react";
import { getGame } from "../../../../controllers/dashboardController";
import { clearTokensFromMap, getMap, setMap } from "../../../../controllers/mapsController";
import { emitServerEvent } from "../../../../scripts/socket-io";
import { Game, Map } from "../../../../scripts/types";
import { roomRef } from "../../../../views/GamePage/GamePage";
import { selectedMap } from "../../../Menus/MapsMenu/MapsMenu";
import './SetGridPopup.scss';


interface Props {
  title: string
}

export default function SetGridPopup({ title }: Props) {
  const [gridSize, setGridSize] = useState(0);

  useEffect(() => {
    // Sets size for grid on load
    const setDefaultGridSize = async () => {
      const game: Game = await getGame(roomRef);
      const map: Map = await getMap(game.map_id);
      setGridSize(map.gridSize);
      selectedMap.gridSize = map.gridSize;
    };
    setDefaultGridSize();
  }, []);

  // Handle visual change for grid resizing
  const handleChangeGridSize = async (e: any) => {
    setGridSize(e.target.value);
    selectedMap.gridSize = parseInt(e.target.value);
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', selectedMap.gridSize);
    grid.style.setProperty('--grid-y', selectedMap.gridSize);

    // Remove tokens
    document.querySelectorAll('.token').forEach((token) => {
      token.remove();
    });
    clearTokensFromMap();
  };

  // Apply grid size to the map
  const handleApplyChanges = (e: any) => {
    e.preventDefault();
    setMap(selectedMap);
    emitServerEvent('SET_GRID', [{ gridSize: gridSize }, roomRef]);
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
      <center>
        <button type="submit">Apply</button>
      </center>
    </form>
  );
}
