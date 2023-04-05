import React from "react";
import { Creature } from "../../scripts/creatureDataStructure";
import { Action, Damage } from "../../scripts/types";
import './ActionButton.scss';
import { numIsPos } from "../../scripts/tools/stringUtils";


interface Props {
  creature: Creature
  action: Action
  id: number
}

export default function ActionButton({ creature, action, id }: Props) {
  console.log(action);
  return (
    <div>
      {action.attackBonus &&
        <button className="action-btn action-btn--to-hit">
          {numIsPos(action.attackBonus)} <img src="/images/d20.svg" alt="d20" draggable={false} />
        </button>
      }

      {action.damage && action.damage.map((dmg: Damage, i) => {
        return <button key={i} className={`action-btn action-btn--${dmg.type}`}>{dmg.dice.display} {dmg.type}</button>;
      })}
    </div>
  );
}
