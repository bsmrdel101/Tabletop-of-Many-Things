import { useAtom } from "jotai";
import { emitServerEvent } from "../../scripts/config/socket-io";
import { gameAtom, rightClickMenuAtom } from "../../scripts/atoms/state";
import { useRef } from "react";
import { openCreatureWindow } from "../Dialogs/5e/Creatures/CreatureRow";


export default function RightClickMenu() {
  const [gameData] = useAtom(gameAtom);
  const [rightClickMenu, setRightClickMenu] = useAtom(rightClickMenuAtom);
  const { menuType, token } = rightClickMenu;
  const ref = useRef<HTMLDivElement>(null);

  const hideContextMenu = () => {
    ref.current.classList.add('hidden');
    setRightClickMenu({ ...rightClickMenu, menuType: '' });
  };

  const deleteToken = () => {
    hideContextMenu();
    emitServerEvent('REMOVE_TOKEN', [token, gameData.room]);
  };

  const openTokenStats = () => {
    hideContextMenu();
    openCreatureWindow(token.creature);
  };

  
  return (
    <div ref={ref} id="right-click-menu" className="right-click-menu hidden">
      {menuType === 'token' &&
        <>
          { token.creature && <button onClick={() => openTokenStats()} className="right-click-menu__btn">Open Stats</button> }
          <button onClick={() => deleteToken()} className="right-click-menu__btn">Delete</button>
        </>
      }
    </div>
  );
}
