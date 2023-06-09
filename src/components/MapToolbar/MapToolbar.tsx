import { useEffect, useState } from "react";
import { onServerEvent } from "../../scripts/config/socket-io";
import SetGridPopup from "./Popups/SetGridPopup";
import { useAppSelector } from "../../redux/hooks";
import { fetchGameData } from "../../redux/reducers/gameSlice";


interface Props {
  userType: string
}

export default function MapToolbar({ userType }: Props) {
  const { room, game, map } = useAppSelector(fetchGameData).game;
  const [currentPopup, setCurrentPopup] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Set grid size back to default if changes not applied
      if (currentPopup !== 'grid') {
        // const grid: HTMLElement = document.querySelector('.grid');
        // const color = hexToRgb(map.gridColor);
        // grid.style.setProperty('--grid-x', map.gridSizeX.toString());
        // grid.style.setProperty('--grid-y', map.gridSizeY.toString());
        // grid.style.setProperty('--grid-color', `rgb(${color.r}, ${color.g}, ${color.b}, ${map.gridOpacity}%)`);
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
        <div className="popup-menu-toolbar">
          {currentPopup === 'grid' &&
            <SetGridPopup title={popupTitle} />
          }
        </div>
      }
    </div>
  );
}
