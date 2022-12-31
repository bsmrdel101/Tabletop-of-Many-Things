import React, { useEffect, useState } from "react";
import { getGame } from "../../controllers/dashboardController";
import { getMap } from "../../controllers/mapsController";
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
        const grid: any = document.querySelector('.grid');
        const defaultGridSize = map.gridSize;
        grid.style.setProperty('--grid-x', defaultGridSize);
        grid.style.setProperty('--grid-y', defaultGridSize);
      }
    };
    fetchData();
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
