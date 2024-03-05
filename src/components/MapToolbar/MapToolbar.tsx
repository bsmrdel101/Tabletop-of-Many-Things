import { useEffect, useState } from "react";
import { onServerEvent } from "../../scripts/config/socket-io";
import SetGridPopup from "./Popups/SetGridPopup";
import Button from "../Library/Button";

interface Props {
  userType: string
}


export default function MapToolbar({ userType }: Props) {
  const [currentPopup, setCurrentPopup] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  useEffect(() => {
    onServerEvent('SELECT_MAP', (() => {
      setCurrentPopup('');
    }));
  }, [currentPopup]);

  const togglePopupMenu = (menu: string) => {
    if (currentPopup === menu) {
      setCurrentPopup('');
    } else {
      setCurrentPopup(menu);
    }
  };

  const handleClickSetGrid = () => {
    togglePopupMenu('grid');
    setPopupTitle('Set Grid');
  };


  return (
    <div className="map-toolbar">
      {userType === 'dm' &&
        <Button onClick={handleClickSetGrid}>
          <img src="/images/setGridIcon.svg" draggable={false} />
        </Button>
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
