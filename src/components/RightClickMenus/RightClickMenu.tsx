import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { fetchRightClickMenuType } from "../../redux/reducers/rightClickMenuSlice";
import "./RightClickMenus.scss";


export default function RightClickMenu() {
  const menuType = useAppSelector(fetchRightClickMenuType);
  
  return (
    <div id="right-click-menu" className="right-click-menu hidden">
      {menuType === 'token' &&
        <button className="right-click-menu__btn">Delete</button>
      }
    </div>
  );
}
