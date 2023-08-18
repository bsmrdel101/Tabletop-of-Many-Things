import React from "react";
import { toggleMenu } from "../scripts/menuManager";
import { toggleModal } from "../scripts/modalManager";


interface Props {
  userType: 'dm' | 'player';
}

export default function Sidebar({ userType }: Props) {
  return (
    <div className="sidebar">
      {userType === 'dm' ?
        <>
          <button className="sidebar__btn btn--hover" onClick={() => toggleMenu('maps')}>Maps</button>
          <button className="sidebar__btn btn--hover" onClick={() => toggleMenu('tokens')}>Tokens</button>
          <button className="sidebar__btn btn--hover" onClick={() => toggleModal('creatures')}>Creatures</button>
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
