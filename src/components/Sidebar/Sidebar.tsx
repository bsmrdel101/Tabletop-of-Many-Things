import React from "react";
import './Sidebar.scss';

interface Props {
    userType: 'dm' | 'player';
}

export default function Sidebar({ userType }: Props) {
  return (
    <div className="sidebar">
      {userType === 'dm' ?
        <>
          <button className="sidebar__btn btn--hover" id="maps-menu-btn">Maps</button>
          <button className="sidebar__btn btn--hover" id="tokens-menu-btn">Tokens</button>
          <button className="sidebar__btn btn--hover" id="creatures-modal-btn">Creatures</button>
          <button className="sidebar__btn btn--hover" id="encounters-modal-btn">Encounters</button>
          <button className="sidebar__btn btn--hover" id="loot-modal-btn">Loot</button>
          <button className="sidebar__btn btn--hover" id="items-modal-btn">Items</button>
          <button className="sidebar__btn btn--hover" id="shops-modal-btn">Shops</button>
        </>
        :
        <>
          <button className="sidebar__btn btn--hover" id="characters-menu-btn">Characters</button>
          <button className="sidebar__btn btn--hover" id="character-sheet-modal-btn">Character Sheet</button>
        </>
      }
    </div>
  );
}
