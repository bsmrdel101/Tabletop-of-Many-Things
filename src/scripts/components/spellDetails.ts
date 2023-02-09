import { capitalize } from "../tools/stringUtils";
import { Spell } from "../types";

export const spellDetailsHtml = (spell: Spell): string => {
  return `
    <div class="modal-stats__spell-details">
      <h4>${spell.name}</h4>
      <p class="modal-stats__spell-details--subtitle">${spell.level === 0 ? 'cantrip' : `${spell.level}st level`} ${spell.school}</p>
      <p><span class="bold">Casting Time</span> ${spell.castingTime}</p>
      <p><span class="bold">Range</span> ${spell.range}</p>
      <p><span class="bold">Components</span> ${spell.components.map((component: string) => capitalize(component)).join(', ')}</p>
      <p><span class="bold">Duration</span> ${spell.duration}</p>
      <p><span class="bold">Classes</span> ${spell.classes.map((_class: string) => capitalize(_class)).join(', ')}</p>
      <p class="modal-stats__spell-details--desc">${spell.desc}</p>
    </div>
  `;
};
