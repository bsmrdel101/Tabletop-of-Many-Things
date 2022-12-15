import React from "react";
import { toggleTokensMenu } from "../Menus/TokensMenu/TokensMenu";
import './Sidebar.scss';

interface Props {
    userType: 'dm' | 'player';
}

export default function Sidebar({ userType }: Props) {
  return (
    <div className="sidebar">
      {userType === 'dm' ?
        <>
          <button className="sidebar__btn btn--hover">Maps</button>
          <button className="sidebar__btn btn--hover" onClick={toggleTokensMenu}>Tokens</button>
          <button className="sidebar__btn btn--hover">Creatures</button>
          <button className="sidebar__btn btn--hover">Encounters</button>
          <button className="sidebar__btn btn--hover">Loot</button>
          <button className="sidebar__btn btn--hover">Items</button>
          <button className="sidebar__btn btn--hover">Shops</button>
        </>
        :
        <>
          <button className="sidebar__btn btn--hover">Characters</button>
          <button className="sidebar__btn btn--hover">Character Sheet</button>
        </>
      }
    </div>
  );
}
