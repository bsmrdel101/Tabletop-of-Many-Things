import { Creature } from "../creatureDataStructure";
import { rollDice } from "../diceRolls";
import { emitServerEvent } from "../socket-io";
import { numIsPos } from "../tools/stringUtils";
import { Action, Damage } from "../types";

export const actionButtons = (creature: Creature, action: Action, id: number): string => {
  const parentDiv: Element = document.createElement('div');
  const div: Element = parentDiv.insertAdjacentElement('beforeend', document.createElement('div'));
  div.classList.add('action-btn__container');

  // Create to hit button
  if (action.attackBonus) {
    const toHitBtn = `<button id="action-attack-listing-${id}" class="action-btn action-btn--to-hit">${numIsPos(action.attackBonus)} <img src="/images/d20.svg" alt="d20" /></button>`;
    div.insertAdjacentHTML('beforeend', toHitBtn);
  }
  // Create damage buttons
  action.damage && action.damage.forEach((dmg: Damage) => {
    div.insertAdjacentHTML('beforeend', action.damage.map((dmg: Damage) => `<button id="action-dmg-listing-${id}" class="action-btn action-btn--${dmg.type}">${dmg.dice.display} ${dmg.type}</button>`).join(''));
  });
  return parentDiv.innerHTML;
};
