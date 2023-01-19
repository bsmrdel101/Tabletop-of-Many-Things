import React, { useEffect, useState } from "react";
import { rollDice } from "../../../scripts/diceRolls";
import { Roll } from "../../../scripts/types";
import './DiceBox.scss';

export default function DiceBox() {
  const [amount, setAmount] = useState(1);
  const [mod, setMod] = useState(0);
  const [log, setLog] = useState([]);

  // useEffect(() => {

  // }, []);

  // Select the dice to roll
  const handleSelectDie = (type: number) => {
    const result = rollDice(amount, type, mod);
    setLog([...log, result]);
    setTimeout(() => document.querySelector('.dice-box__log').scrollTo(0, 999999), 50);
  };

  // Modify the modifier to make it display correctly in the log
  const getDisplayModifier = (mod: number): string => {
    return ` ${mod < 0 ? '-' : '+'} ${(mod.toString()).replace('-', '')}`;
  };


  return (
    <div className="dice-box">
      <h3>Dice Box</h3>
      <div className="dice-box__log">
        {log.map((roll: Roll, i) => {
          return (
            <p key={i}>
              {roll.amount}d{roll.type}: ({roll.roll}){roll.mod !== 0 && getDisplayModifier(roll.mod)} = {roll.total}
            </p>
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
        <button onClick={() => console.log('percentile die')}>D100</button>
      </div>
    </div>
  );
}
