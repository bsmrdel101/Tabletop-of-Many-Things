import React from "react";
import { Action, Damage, Dice } from "../scripts/types";
import { numIsPos } from "../scripts/tools/stringUtils";
import { emitServerEvent } from "../scripts/socket-io";
import { roomRef } from "../views/GamePage";
import { rollDice } from "../scripts/diceRolls";


interface Props {
  action: Action
}

export default function ActionButton({ action }: Props) {
  const handleAttackRole = (attackBonus: number) => {
    const result = rollDice(1, 20, attackBonus);
    emitServerEvent('ROLL_DICE', [result, roomRef]);
  };

  const handleDamageRole = (dice: Dice) => {
    const result = rollDice(dice.amount, dice.type, dice.mod);
    emitServerEvent('ROLL_DICE', [result, roomRef]);
  };

  return (
    <div>
      {action.attackBonus ?
        <button className="action-btn action-btn--to-hit" onClick={() => handleAttackRole(action.attackBonus)}>
          {numIsPos(action.attackBonus)} <img src="/images/d20.svg" alt="d20" draggable={false} />
        </button>
        :
        ''
      }

      {action.dc &&
        <button className="action-btn action-btn--dc">DC {action.dc.value} {action.dc.type} <img src="/images/dc-target.svg" alt="d20" draggable={false} /></button>
      }

      {action.damage && action.damage.map((dmg: Damage, i) => {
        return (
          <button key={i} className={`action-btn action-btn--${dmg.type}`} onClick={() => handleDamageRole(dmg.dice)}>
            {dmg.dice.display} {dmg.type}
          </button>
        );
      })}
    </div>
  );
}
