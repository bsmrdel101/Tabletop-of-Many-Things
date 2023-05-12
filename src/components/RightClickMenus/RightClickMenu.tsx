import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRightClickMenu, setRightClickMenu } from "../../redux/reducers/rightClickMenuSlice";
import { emitServerEvent } from "../../scripts/socket-io";
import { roomRef } from "../../views/GamePage/GamePage";
import "./RightClickMenus.scss";


export default function RightClickMenu() {
  const { rightClickMenuType, token } = useAppSelector(fetchRightClickMenu);
  const dispatch = useAppDispatch();

  const hideContextMenu = () => {
    document.getElementById('right-click-menu').classList.add('hidden');
    dispatch(
      setRightClickMenu({ type: '', token: token })
    );
  };

  const deleteToken = () => {
    hideContextMenu();
    emitServerEvent('REMOVE_TOKEN', [token, roomRef]);
  };

  
  return (
    <div id="right-click-menu" className="right-click-menu hidden">
      {rightClickMenuType === 'token' &&
        <>
          <button className="right-click-menu__btn" onClick={deleteToken}>Delete</button>
        </>
      }
    </div>
  );
}
