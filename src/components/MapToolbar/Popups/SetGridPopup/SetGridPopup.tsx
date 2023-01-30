import React, { useEffect, useState } from "react";
import { getGame } from "../../../../controllers/dashboardController";
import { clearTokensFromMap, getMap, setMap } from "../../../../controllers/mapsController";
import { emitServerEvent } from "../../../../scripts/socket-io";
import { hexToRgb } from "../../../../scripts/tools/utils";
import { Game, Map } from "../../../../scripts/types";
import { roomRef } from "../../../../views/GamePage/GamePage";
import { selectedMap } from "../../../Menus/MapsMenu/MapsMenu";
import './SetGridPopup.scss';


interface Props {
  title: string
}

export default function SetGridPopup({ title }: Props) {
  const [gridSizeX, setGridSizeX] = useState(0);
  const [gridSizeY, setGridSizeY] = useState(0);
  const [gridColor, setGridColor] = useState('#000000');
  const [gridOpacity, setGridOpacity] = useState(100);

  useEffect(() => {
    // Sets size for grid on load
    const setDefaultGridSize = async () => {
      const game: Game = await getGame(roomRef);
      const map: Map = await getMap(game.map_id);
      setGridSizeX(map.gridSizeX);
      setGridSizeY(map.gridSizeY);
      setGridColor(map.gridColor);
      setGridOpacity(map.gridOpacity);
    };
    setDefaultGridSize();
  }, []);

  // Handle visual change for grid resizing width
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

  // Handle visual change for grid resizing height
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

  // Update grid color and opacity to preview
  const handleChangeColor = () => {
    const grid: HTMLElement = document.querySelector('.grid');
    const color = hexToRgb(gridColor);
    grid.style.setProperty('--grid-color', `rgb(${color.r}, ${color.g}, ${color.b}, ${gridOpacity}%)`);
    selectedMap.gridColor = gridColor;
    selectedMap.gridOpacity = gridOpacity;
  };

  // Apply grid size to the map
  const handleApplyChanges = (e: any) => {
    e.preventDefault();
    setMap(selectedMap);
    emitServerEvent('SET_GRID', [
      {
        gridSizeX: gridSizeX,
        gridSizeY: gridSizeY
      },
      gridColor,
      gridOpacity,
      roomRef
    ]);
  };


  return (
    <form onSubmit={(e) => handleApplyChanges(e)} className="set-grid-popup">
      <h3>{title}</h3>
      <label>
        Width
        <input
          className="input--sm"
          type="number"
          value={gridSizeX}
          onChange={(e) => handleChangeGridSizeX(e)}
        />
        <input
          type="range"
          min={5}
          max={80}
          step={5}
          value={gridSizeX}
          onChange={(e) => handleChangeGridSizeX(e)}
        />
      </label>

      <label>
        Height
        <input
          className="input--sm"
          type="number"
          value={gridSizeY}
          onChange={(e) => handleChangeGridSizeY(e)}
        />
        <input
          type="range"
          min={5}
          max={80}
          step={5}
          value={gridSizeY}
          onChange={(e) => handleChangeGridSizeY(e)}
        />
      </label>
      
      <label>
        Color
        <input
          type="color"
          value={gridColor}
          onChange={(e) => {
            setGridColor(e.target.value);
            handleChangeColor();
          }}
        />
      </label>

      <label>
        Opacity
        <input
          type="range"
          min={0}
          max={100}
          value={gridOpacity}
          onChange={(e) => {
            setGridOpacity(parseInt(e.target.value));
            handleChangeColor();
          }}
        />
      </label>

      <center>
        <button type="submit">Apply</button>
      </center>
    </form>
  );
}
