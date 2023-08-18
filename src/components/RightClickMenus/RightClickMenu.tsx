import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRightClickMenu, setRightClickMenu } from "../../redux/reducers/rightClickMenuSlice";
import { emitServerEvent } from "../../scripts/config/socket-io";
import { fetchGameData } from "../../redux/reducers/gameSlice";
import { useEffect } from "react";


export default function RightClickMenu() {
  const { room } = useAppSelector(fetchGameData).game;
  const { rightClickMenuType, token } = useAppSelector(fetchRightClickMenu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const deleteBtn = document.getElementById('right-click-menu__delete-token-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('mousedown', (e: MouseEvent) => {
        if(e.buttons === 1) deleteToken();
      });
    }
  }, [rightClickMenuType]);

  const hideContextMenu = () => {
    document.getElementById('right-click-menu').classList.add('hidden');
    dispatch(
      setRightClickMenu({ type: '', token: token })
    );
  };

  const deleteToken = () => {
    hideContextMenu();
    emitServerEvent('REMOVE_TOKEN', [token, room]);
  };

  
  return (
    <div id="right-click-menu" className="right-click-menu hidden">
      {rightClickMenuType === 'token' &&
        <>
          <button id="right-click-menu__delete-token-btn" className="right-click-menu__btn">Delete</button>
        </>
      }
    </div>
  );
}
