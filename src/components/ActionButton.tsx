import { Action, Damage, Dice } from "../scripts/types";
import { numIsPos } from "../scripts/tools/stringUtils";
import { emitServerEvent } from "../scripts/config/socket-io";
import { rollDice } from "../scripts/diceRolls";
import { useAppSelector } from "../redux/hooks";
import { fetchGameData } from "../redux/reducers/gameSlice";
import { Creature } from "../scripts/creatureDataStructure";


interface Props {
  creature: Creature
  action: Action
}

export default function ActionButton({ action, creature }: Props) {
  const { room } = useAppSelector(fetchGameData).game;

  const handleAttackRole = (attackBonus: number) => {
    const result = rollDice(1, 20, attackBonus);
    emitServerEvent('ROLL_DICE', [result, creature.name, 'attack', creature.targets, null, room]);
  };

  const handleDamageRole = (dice: Dice, damageType: string) => {
    const result = rollDice(dice.amount, dice.type, dice.mod);
    emitServerEvent('ROLL_DICE', [result, creature.name, 'dmg', creature.targets, damageType, room]);
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
          <button key={i} className={`action-btn action-btn--${dmg.type}`} onClick={() => handleDamageRole(dmg.dice, dmg.type)}>
            {dmg.dice.display} {dmg.type}
          </button>
        );
      })}
    </div>
  );
}
