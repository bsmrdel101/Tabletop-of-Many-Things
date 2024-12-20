import { useState } from "react";
import Dialog from "../../Library/Dialog";
import { capitalize } from "../../../scripts/tools/stringUtils";
import ActionButton from "../../ActionButton";
import CreatureSpellDetails from "../../Modals/CreaturesModal/CreatureSpellDetails";

interface Props {
  creature: Creature
}


export default function CreatureStatsDialog({ creature }: Props) {
  const { name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = creature;
  const [openedSpell, setOpenedSpell] = useState<Spell>(null);
  const spells = creature.spellcasting && creature.spellcasting.spells;


  return (
    <Dialog
      title={name}
      open={true}
      className="creature-stats-dialog"
      variants={['creature-stats']}
      height="28rem"
      width="27rem"
      deleteOnClose
      noTitleStyles
    >
      <div className="creature-stats-dialog__header">
        <p>{size && size} {type && type}{alignment && `, ${alignment}`}</p>
      </div>
      <div>
        <p><span className="bold">Armor Class</span> { ac }</p>
        <p><span className="bold">Health</span> { maxHp } { hitDice && `(${hitDice})` }</p>
        <p><span className="bold">Speed</span> {speeds.map((speed: NameValue) => {
          if (speed.name === 'hover') {
            return 'hover';
          } else {
            return `${speed.name} ${speed.value} ft`;
          }
        }).join(', ')}</p>
        <div className="creature-stats-dialog__general-stats">
          <div className="ability-score-container">
            {abilityScores.map((score: AbilityScore) => {
              return (
                <div className="ability-score-container__score-box" key={score.name}>
                  <p><span className="bold">{capitalize(score.name)}</span></p>
                  <p className="ability-score-container__score-box--value">{score.value}</p>
                  <p className="ability-score-container__score-box--mod">{score.mod >= 0 && '+'}{score.mod}</p>
                </div>
              );
            })}
          </div>
          {proficiencies && proficiencies.length > 0 && <p><span className="bold">Proficiencies</span> {proficiencies.map((prof: Prof) => `${prof.name} ${prof.value >= 0 && '+'}${prof.value}`).join(', ')}</p>}
          {vulnerabilities && vulnerabilities.length > 0 && <p><span className="bold">Vulnerabilities</span> {vulnerabilities.map((vul: string) => `${vul}`).join(', ')}</p>}
          {resistances && resistances.length > 0 && <p><span className="bold">Resistances</span> {resistances.map((res: string) => `${res}`).join(', ')}</p>}
          {damageImmunities && damageImmunities.length > 0 && <p><span className="bold">Damage Immunities</span> {damageImmunities.map((dmgImmune: string) => `${dmgImmune}`).join(', ')}</p>}
          {conditionImmunities && conditionImmunities.length > 0 && <p><span className="bold">Condition Immunities</span> {conditionImmunities.map((condImmune: string) => `${condImmune}`).join(', ')}</p>}
          <p><span className="bold">Senses</span> {senses.map((sense: NameValue) => `${sense.name} ${sense.value}${sense.name.includes('vision') || sense.name.includes('sight') ? ' ft' : ''}`).join(', ')}</p>
          <div>
            {languages && <p><span className="bold">Languages</span> {languages.join(', ')}</p>}
          </div>
          <div>
            <p><span className="bold">Challenge</span> {cr ? cr : '-'} ({xp ? xp : 0} XP)</p>
          </div>
        </div>
      </div>

      {/* Abilities */}
      {abilities && abilities.map((ability: SpecialAbility, i: number) => {
        return (
          <div key={i}>
            <p className="creature-stats-dialog__stat-heading"><span className="bold">{ability.name}</span></p>
            <p>{ability.desc}</p>
            <ActionButton creature={creature} action={ability} />
          </div>
        );
      })}
        
      {/* Actions */}
      {actions && actions.length > 0 && <h3 className="creature-stats-dialog__subtitle">Actions</h3>}
      {actions && actions.length > 0 &&
        actions.map((action: Action, i: number) => {
          return (
            <div key={i}>
              <p className="creature-stats-dialog__stat-heading"><span className="bold">{action.name}</span></p>
              <p>{action.desc}</p>
              <ActionButton creature={creature} action={action} />
            </div>
          );
        })}

      {/* Legendary actions */}
      {legActions && legActions.length > 0 && <h3 className="creature-stats-dialog__subtitle">Legendary Actions</h3>}
      {legActions && legActions.length > 0 &&
        legActions.map((action: Action, i: number) => {
          return (
            <div key={i}>
              <p className="creature-stats-dialog__stat-heading"><span className="bold">{action.name}</span></p>
              <p>{action.desc}</p>
              <ActionButton creature={creature} action={action} />
            </div>
          );
        })}

      {/* Spells */}
      {spells && <h3 className="creature-stats-dialog__subtitle">Spells</h3>}
      {spells && spells.map((spell: Spell) => {
        return (
          <div key={spell.id}>
            <p
              className="creature-stats-dialog__stat-heading creature-stats-dialog__stat-heading--spell"
              onClick={() => setOpenedSpell(spell)}
            >
              <span className="bold">{spell.name}</span>
              <img src={openedSpell && spell.id === openedSpell.id ? '/images/dropdown-arrow-up.svg' : '/images/dropdown-arrow-down.svg'} alt={'Toggle spell details'} draggable="false" />
            </p>
            
            <CreatureSpellDetails spell={openedSpell} />
          </div>
        );
      })}
    </Dialog>
  );
}
