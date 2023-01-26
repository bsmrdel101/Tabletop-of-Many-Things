import React, { useEffect, useState } from "react";
import { getGame } from "../../controllers/dashboardController";
import { getMap } from "../../controllers/mapsController";
import { onServerEvent } from "../../scripts/socket-io";
import { hexToRgb } from "../../scripts/tools/utils";
import { Game, Map } from "../../scripts/types";
import { roomRef } from "../../views/GamePage/GamePage";
import './MapToolbar.scss';
import PopupMenuToolbar from "./PopupMenuToolbar";
import SetGridPopup from "./Popups/SetGridPopup/SetGridPopup";


interface Props {
  userType: string
}

export default function MapToolbar({ userType }: Props) {
  const [currentPopup, setCurrentPopup] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const game: Game = await getGame(roomRef);
      const map: Map = await getMap(game.map_id);
      // Set grid size back to default if changes not applied
      if (currentPopup !== 'grid') {
        const grid: HTMLElement = document.querySelector('.grid');
        const color = hexToRgb(map.gridColor);
        grid.style.setProperty('--grid-x', map.gridSizeX.toString());
        grid.style.setProperty('--grid-y', map.gridSizeY.toString());
        grid.style.setProperty('--grid-color', `rgb(${color.r}, ${color.g}, ${color.b}, ${map.gridOpacity}%)`);
      }
    };
    fetchData();

    onServerEvent('SELECT_MAP', (() => {
      setCurrentPopup('');
    }));
  }, [currentPopup]);

  // Handles state of popup menu
  const togglePopupMenu = (menu: string) => {
    if (currentPopup === menu) {
      setCurrentPopup('');
    } else {
      setCurrentPopup(menu);
    }
  };

  // Set grid button  
  const handleClickSetGrid = () => {
    togglePopupMenu('grid');
    setPopupTitle('Set Grid');
  };


  return (
    <div className="map-toolbar">
      {userType === 'dm' &&
        <button onClick={handleClickSetGrid}>
          <img src="/images/setGridIcon.svg" draggable={false} />
        </button>
      }

      {userType === 'player' &&
        <></>
      }

      {/* Popup menu */}
      {currentPopup !== '' && 
        <PopupMenuToolbar>
          {currentPopup === 'grid' &&
            <SetGridPopup title={popupTitle} />
          }
        </PopupMenuToolbar>
      }
    </div>
  );
}
