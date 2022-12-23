import React, { useEffect, useState } from "react";
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
    if (currentPopup !== 'grid') {
      const grid: any = document.querySelector('.grid');
      const defaultGridSize = 40;
      grid.style.setProperty('--grid-x', defaultGridSize);
      grid.style.setProperty('--grid-y', defaultGridSize);
    }
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
