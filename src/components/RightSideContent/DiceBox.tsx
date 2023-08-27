import { useEffect, useState } from "react";
import { rollDice } from "../../scripts/diceRolls";
import { emitServerEvent, onServerEvent } from "../../scripts/config/socket-io";
import { Character, Roll, RollResult } from "../../scripts/types";
import { useAppSelector } from "../../redux/hooks";
import { fetchGameData } from "../../redux/reducers/gameSlice";
import { fetchUser } from "../../redux/reducers/userSlice";
import { Creature } from "../../scripts/creatureDataStructure";


export default function DiceBox() {
  const { room } = useAppSelector(fetchGameData).game;
  const user = useAppSelector(fetchUser);
  const [amount, setAmount] = useState(1);
  const [mod, setMod] = useState(0);
  const [log, setLog] = useState([]);
  let logHistory: RollResult[] = [];

  useEffect(() => {
    onServerEvent('ROLL_DICE', (result: Roll, owner: string, rollType: string, targets: (Creature | Character)[], damageType: string) => {
      const rollResult: RollResult = { ...result, owner: owner, rollType: rollType, targets: targets, damageType: damageType };
      logHistory = [...logHistory, rollResult];
      setLog(logHistory);
      setTimeout(() => document.querySelector('.dice-box__log').scrollTo(0, 999999), 50);
    });
  }, []);

  // Select the dice to roll
  const handleSelectDie = (type: number) => {
    const result: Roll = rollDice(amount, type, mod);
    emitServerEvent('ROLL_DICE', [result, user.username, 'roll', null, null, room]);
  };

  // Modify the modifier to make it display correctly in the log
  const getDisplayModifier = (mod: number): string => {
    return ` ${mod < 0 ? '-' : '+'} ${(mod.toString()).replace('-', '')}`;
  };


  return (
    <div className="dice-box">
      <h3>Dice Box</h3>
      <div className="dice-box__log">
        {log.map((roll: RollResult, i) => {
          return (
            <>
              {roll.rollType === 'roll' &&
                <p key={i}>
                  <span className={`dice-box__log__owner${roll.owner === user.username ? '--self' : ''}`}>{roll.owner}</span> {roll.amount}d{roll.type}: ({roll.roll}){roll.mod !== 0 && getDisplayModifier(roll.mod)} = <span className="dice-box__log--total">{roll.total}</span>
                </p>
              }
              {roll.rollType === 'attack' &&
                <p key={i}>
                  <span className={`dice-box__log__owner${roll.owner === user.username ? '--self' : ''}`}>{roll.owner}</span> {roll.amount}d{roll.type}: ({roll.roll}){roll.mod !== 0 && getDisplayModifier(roll.mod)} = <span className="dice-box__log--total">{roll.total}</span> {roll.targets.length > 0 && '-->'} {roll.targets.map((target: Creature|Character) => target.name).join(', ')}
                </p>
              }
              {roll.rollType === 'dmg' &&
                <p key={i}>
                  <span className={`dice-box__log__owner${roll.owner === user.username ? '--self' : ''}`}>{roll.owner}</span> {roll.amount}d{roll.type}: ({roll.roll}){roll.mod !== 0 && getDisplayModifier(roll.mod)} = <span className="dice-box__log--total">{roll.total}</span> <span className={`roll-damage--${roll.damageType}`}>{roll.damageType}</span> {roll.targets.length > 0 && '-->'} {roll.targets.map((target: Creature|Character) => target.name).join(', ')}
                </p>
              }
            </>
          );
        })}
      </div>
      <div className="dice-box__dice-buttons">
        <button onClick={() => handleSelectDie(20)}>D20</button>
        <button onClick={() => handleSelectDie(12)}>D12</button>
        <button onClick={() => handleSelectDie(10)}>D10</button>
        <button onClick={() => handleSelectDie(8)}>D8</button>
        <button onClick={() => handleSelectDie(6)}>D6</button>
        <button onClick={() => handleSelectDie(4)}>D4</button>
        <button onClick={() => handleSelectDie(100)}>D100</button>
      </div>
    </div>
  );
}
