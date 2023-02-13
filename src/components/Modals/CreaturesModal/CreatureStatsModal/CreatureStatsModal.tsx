import React, { useEffect } from "react";
import { getApiSpell } from "../../../../controllers/spellsController";
import { Creature } from "../../../../scripts/creatureDataStructure";
import { capitalize } from "../../../../scripts/tools/stringUtils";
import { makeDraggable } from "../../../../scripts/tools/utils";
import { AbilityScore, Action, Prof, SpecialAbility, Spell } from "../../../../scripts/types";
import '../../Modal';
import './CreatureStatsModal.scss';


interface Props {
  creature: Creature
}

export default function CreatureStatsModal({ creature }: Props) {
  const { index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = creature;
  const spells = abilities.map((ability: SpecialAbility) => ability.spellcasting && ability.spellcasting.spells)[0];

  useEffect(() => {
    console.log(creature);
    makeDraggable(document.getElementById(`modal-stats-${index}`), '.draggable-area');
  }, []);

  const closeModal = () => {
    document.getElementById(`modal-stats-${index}`).remove();
  };

  //   const toggleSpellDetails = async (spellTitle: Element, id: number) => {
  //     spellTitle.classList.toggle('spell-details-open');
  //     if (spellTitle.classList.contains('spell-details-open')) {
  //       document.getElementById(`spell-listing-img-${id}`).setAttribute('src', '/images/dropdown-arrow-up.svg');
  //       // Open spell details
  //       const spell: Spell = await getApiSpell(spellTitle.getAttribute('url'));
  //       document.getElementById(`spell-listing-container-${id}`).insertAdjacentHTML('beforeend', 
  //         spellDetailsHtml(spell)
  //       );
  //     } else {
  //       document.getElementById(`spell-listing-img-${id}`).setAttribute('src', '/images/dropdown-arrow-down.svg');
  //       // Close spell details
  //       document.getElementById(`spell-listing-container-${id}`).innerHTML = '';
  //     }
  //   };


  return (
    <div className="modal modal-stats" id={`modal-stats-${index}`}>
      <div className="modal-stats__header">
        <div className="draggable-area"></div>
        <h2 className="modal__title">{name}</h2>
        <p>{size && size} {type && type}{alignment && `, ${alignment}`}</p>
        <button className="modal__close-btn" onClick={closeModal}>X</button>
      </div>
      <div>
        <p><span className="bold">Armor Class</span> {ac}</p>
        <p><span className="bold">Health</span> {maxHp} {hitDice && `(${hitDice})`}</p>
        <p><span className="bold">Speed</span> {speeds.map((speed) => `${speed.name} ${speed.value} ft`).join(', ')}</p>
        <div className="modal-stats__general-stats">
          <div className="modal-score-container">
            {abilityScores.map((score: AbilityScore) => {
              return (
                <div className="modal-score-container__score-box" key={score.name}>
                  <p><span className="bold">{capitalize(score.name)}</span></p>
                  <p className="modal-score-container__score-box--mod">{score.mod >= 0 && '+'}{score.mod}</p>
                  <p className="modal-score-container__score-box--value">{score.value}</p>
                </div>
              );
            })}
          </div>
          {proficiencies.length > 0 && <p><span className="bold">Proficiencies</span> {proficiencies.map((prof: Prof) => `${prof.name} ${prof.value >= 0 && '+'}${prof.value}`).join(', ')}</p>}
          {vulnerabilities.length > 0 && <p><span className="bold">Vulnerabilities</span> {vulnerabilities.map((vul: string) => `${vul}`).join(', ')}</p>}
          {resistances.length > 0 && <p><span className="bold">Resistances</span> {resistances.map((res: string) => `${res}`).join(', ')}</p>}
          {damageImmunities.length > 0 && <p><span className="bold">Damage Immunities</span> {damageImmunities.map((dmgImmune: string) => `${dmgImmune}`).join(', ')}</p>}
          {conditionImmunities.length > 0 && <p><span className="bold">Condition Immunities</span> {conditionImmunities.map((condImmune: string) => `${condImmune}`).join(', ')}</p>}
          <p><span className="bold">Senses</span> {senses.map((sense) => `${sense.name} ${sense.value}${sense.name.includes('vision') || sense.name.includes('sight') ? ' ft' : ''}`).join(', ')}</p>
          <div>
            {languages && <p><span className="bold">Languages</span> {languages.join(', ')}</p>}
          </div>
          <div>
            <p><span className="bold">Challenge</span> {cr ? cr : '-'} ({xp ? xp : 0} XP)</p>
          </div>
        </div>
      </div>

      {/* Abilities */}
      {abilities.map((ability: SpecialAbility) => {
        return (
          <>
            <p className="modal-stats__stat-heading"><span className="bold">{ability.name}</span></p>
            <p>{ability.desc}</p>
          </>
        );
      })}
        
      {/* Actions */}
      {actions.length > 0 && <h3 className="modal-stats__subtitle">Actions</h3>}
      {actions.length > 0 &&
        actions.map((action: Action, i) => {
          return (
            <>
              <p className="modal-stats__stat-heading"><span className="bold">{action.name}</span></p>
              <p>{action.desc}</p>
              {/* {actionButtons(this.creature, action, i)} */}
            </>
          );
        })}

      {/* Legendary actions */}
      {legActions.length > 0 && <h3 className="modal-stats__subtitle">Legendary Actions</h3>}
      {legActions.length > 0 &&
        legActions.map((action: Action) => {
          return (
            <>
              <p className="modal-stats__stat-heading"><span className="bold">{action.name}</span></p>
              <p>{action.desc}</p>
            </>
          );
        })}

      {/* Spells */}
      {spells && <h3 className="modal-stats__subtitle">Spells</h3>}
      {spells && spells.map((spell: Spell, i) => {
        return (
          <div key={i}>
            <p id={`spell-listing-${i}`} className="modal-stats__stat-heading modal-stats__stat-heading--spell"><span className="bold">{spell.name}</span> <img src="/images/dropdown-arrow-down.svg" draggable="false" /></p>
            <div id={`spell-listing-container-${i}`}></div>
          </div>
        );
      })}
    </div>
  );
}