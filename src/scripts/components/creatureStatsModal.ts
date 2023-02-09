import { getApiSpell } from "../../controllers/spellsController";
import { Creature } from "../creatureDataStructure";
import { capitalize } from "../tools/stringUtils";
import { makeDraggable } from "../tools/utils";
import { AbilityScore, NameDesc, Prof, SpecialAbility, Spell } from "../types";
import { spellDetailsHtml } from "./spellDetails";


export class CreatureStatsModal {
  creature: Creature;
  el: Element;

  constructor(creature: Creature) {
    this.creature = creature;
    this.createStatsModalEl();
    this.appendModal();
    this.bindEventsToModal();
  }

  // Create modal element
  private createStatsModalEl() {
    this.el = document.createElement('div');
    this.el.classList.add('modal', 'modal-stats');
    this.el.id = `modal-stats-${this.creature.index}`;
  }

  // Return html for creature modal
  private creatureStatsModalHtml() {
    /* eslint-disable */
    console.log(this.creature);
    const { name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = this.creature;
    return `
      <div class="modal-stats__header">
        <div class="draggable-area"></div>
        <h2 class="modal__title">${name}</h2>
        <p>${size ? `${size}` : ''}${type ? ` ${type}` : ''}${alignment ? `, ${alignment}`: ''}</p>
        <button class="modal__close-btn">X</button>
      </div>
      <div>
        <p><span class="bold">Armor Class</span> ${ac}</p>
        <p><span class="bold">Health</span> ${maxHp} ${hitDice ? `(${hitDice})` : ''}</p>
        <p><span class="bold">Speed</span> ${speeds.map((speed) => `${speed.name} ${speed.value} ft`).join(', ')}</p>
        <div class="modal-stats__general-stats">
          ${this.abilityScoresHtml(abilityScores)}
          ${proficiencies.length > 0 ? `<p><span class="bold">Proficiencies</span> ${proficiencies.map((prof: Prof) => `${prof.name} ${prof.value >= 0 ? '+' : ''}${prof.value}`).join(', ')}</p>`: ''}
          ${vulnerabilities.length > 0 ? `<p><span class="bold">Vulnerabilities</span> ${vulnerabilities.map((vul: string) => `${vul}`).join(', ')}</p>`: ''}
          ${resistances.length > 0 ? `<p><span class="bold">Resistances</span> ${resistances.map((res: string) => `${res}`).join(', ')}</p>`: ''}
          ${damageImmunities.length > 0 ? `<p><span class="bold">Damage Immunities</span> ${damageImmunities.map((dmgImmune: string) => `${dmgImmune}`).join(', ')}</p>`: ''}
          ${conditionImmunities.length > 0 ? `<p><span class="bold">Condition Immunities</span> ${conditionImmunities.map((condImmune: string) => `${condImmune}`).join(', ')}</p>`: ''}
          <p><span class="bold">Senses</span> ${senses.map((sense) => `${sense.name} ${sense.value}${sense.name.includes('vision') || sense.name.includes('sight') ? ' ft' : ''}`).join(', ')}</p>
          <div>
            ${languages ? `<p><span class="bold">Languages</span> ${languages.join(', ')}</p>` : ``}
          </div>
          <div>
            <p><span class="bold">Challenge</span> ${cr ? cr : '-'} (${xp ? xp : 0} XP)</p>
          </div>
        </div>
        
        ${abilities.length > 0 ?
          abilities.map((ability: NameDesc) => {
            return `
              <p class="modal-stats__stat-heading"><span class="bold">${ability.name}</span></p>
              <p>${ability.desc}</p>
            `;
          }).join('')
        : ''}
        
        ${actions.length > 0 ? '<h3 class="modal-stats__subtitle">Actions</h3>' : ''}
        ${actions.length > 0 ?
          actions.map((action: NameDesc) => {
            return `
              <p class="modal-stats__stat-heading"><span class="bold">${action.name}</span></p>
              <p>${action.desc}</p>
            `;
          }).join('')
        : ''}

        ${legActions.length > 0 ? '<h3 class="modal-stats__subtitle">Legendary Actions</h3>' : ''}
        ${legActions.length > 0 ?
          legActions.map((action: NameDesc) => {
            return `
              <p class="modal-stats__stat-heading"><span class="bold">${action.name}</span></p>
              <p>${action.desc}</p>
            `;
          }).join('')
        : ''}

        ${abilities.map((ability: SpecialAbility) => {
          return (`
            ${ability.spellcasting ? '<h3 class="modal-stats__subtitle">Spells</h3>' : ''}
            ${ability.spellcasting ?
              ability.spellcasting.spells.map((spell: any, i) => {
                return `
                  <p id="spell-listing-${i}" class="modal-stats__stat-heading modal-stats__stat-heading--spell" url="${spell.url}"><span class="bold">${spell.name}</span> <img id="spell-listing-img-${i}" src="/images/dropdown-arrow-down.svg" draggable="false" /></p>
                  <div id="spell-listing-container-${i}"></div>
                `;
              }).join('')
            : ''}
          `);
        }).join('')}
      </div>
    `;
    /* eslint-enable */
  }

  private appendModal() {
    this.el.insertAdjacentHTML('beforeend', this.creatureStatsModalHtml());
    makeDraggable(<HTMLElement>this.el, '.draggable-area');
  }

  // Add event listeners to the modal
  private bindEventsToModal() {
    this.el.querySelector('.modal__close-btn').addEventListener('click', () => {
      this.closeModal();
    });

    this.el.querySelectorAll('.modal-stats__stat-heading--spell').forEach((spellTitle: Element, i) => {
      spellTitle.addEventListener('click', () => {
        this.toggleSpellDetails(spellTitle, i);
      });
    });
  }

  private async toggleSpellDetails(spellTitle: Element, id: number) {
    spellTitle.classList.toggle('spell-details-open');
    if (spellTitle.classList.contains('spell-details-open')) {
      document.getElementById(`spell-listing-img-${id}`).setAttribute('src', '/images/dropdown-arrow-up.svg');
      // Open spell details
      const spell: Spell = await getApiSpell(spellTitle.getAttribute('url'));
      document.getElementById(`spell-listing-container-${id}`).insertAdjacentHTML('beforeend', 
        spellDetailsHtml(spell)
      );
    } else {
      document.getElementById(`spell-listing-img-${id}`).setAttribute('src', '/images/dropdown-arrow-down.svg');
      // Close spell details
      document.getElementById(`spell-listing-container-${id}`).innerHTML = '';
    }
  }

  private closeModal() {
    this.el.remove();
  }

  private abilityScoresHtml(abilityScores: AbilityScore[]) {
    /* eslint-disable */
    return `
      <div class="modal-score-container">
        ${abilityScores.map((score: AbilityScore) => (
        `
          <div class="modal-score-container__score-box">
            <p><span class="bold">${capitalize(score.name)}</span></p>
            <p class="modal-score-container__score-box--mod">${score.mod >= 0 ? '+' : ''}${score.mod}</p>
            <p class="modal-score-container__score-box--value">${score.value}</p>
          </div>
        `
        )).join('')}
      </div>
    `;
    /* eslint-enable */
  }
}
