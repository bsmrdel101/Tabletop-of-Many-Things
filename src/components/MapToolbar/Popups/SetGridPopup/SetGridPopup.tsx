import React, { useEffect, useState } from "react";
import { getGame } from "../../../../controllers/dashboardController";
import { clearTokensFromMap, getMap, setMap } from "../../../../controllers/mapsController";
import { emitServerEvent } from "../../../../scripts/socket-io";
import { Game, GridSize, Map } from "../../../../scripts/types";
import { roomRef } from "../../../../views/GamePage/GamePage";
import { selectedMap } from "../../../Menus/MapsMenu/MapsMenu";
import './SetGridPopup.scss';


interface Props {
  title: string
}

export default function SetGridPopup({ title }: Props) {
  const [gridSizeX, setGridSizeX] = useState(0);
  const [gridSizeY, setGridSizeY] = useState(0);

  useEffect(() => {
    // Sets size for grid on load
    const setDefaultGridSize = async () => {
      const game: Game = await getGame(roomRef);
      const map: Map = await getMap(game.map_id);
      setGridSizeX(map.gridSizeX);
      setGridSizeY(map.gridSizeY);
      selectedMap.gridSizeX = map.gridSizeX;
      selectedMap.gridSizeY = map.gridSizeY;
    };
    setDefaultGridSize();
  }, []);

  // Handle visual change for grid resizing
  const handleChangeGridSizeX = async (e: any) => {
    setGridSizeX(e.target.value);
    selectedMap.gridSizeX = parseInt(e.target.value);
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', selectedMap.gridSizeX);

    // Remove tokens
    document.querySelectorAll('.token').forEach((token) => {
      token.remove();
    });
    clearTokensFromMap();
  };

  const handleChangeGridSizeY = async (e: any) => {
    setGridSizeY(e.target.value);
    selectedMap.gridSizeY = parseInt(e.target.value);
    const grid: any = document.querySelector('.grid');
    grid.style.setProperty('--grid-y', selectedMap.gridSizeY);

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
    emitServerEvent('SET_GRID', [{ gridSizeX: gridSizeX, gridSizeY: gridSizeY }, roomRef]);
  };


  return (
    <form onSubmit={(e) => handleApplyChanges(e)} className="set-grid-popup">
      <h3>{title}</h3>
      <input
        className="input--sm"
        type="number"
        value={gridSizeX}
        onChange={(e) => handleChangeGridSizeX(e)}
      />
      <input
        type="range"
        min={5}
        max={65}
        step={5}
        value={gridSizeX}
        onChange={(e) => handleChangeGridSizeX(e)}
      />
      <input
        className="input--sm"
        type="number"
        value={gridSizeY}
        onChange={(e) => handleChangeGridSizeY(e)}
      />
      <input
        type="range"
        min={5}
        max={65}
        step={5}
        value={gridSizeY}
        onChange={(e) => handleChangeGridSizeY(e)}
      />
      <center>
        <button type="submit">Apply</button>
      </center>
    </form>
  );
}
