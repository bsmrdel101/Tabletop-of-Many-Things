import { getCreatureProficiencyData } from "../../scripts/creatureStatsHandler";
import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

export default function creatureProficiencies(creature: Creature) {
    ready(() => {
        const { proficiencies, skills } = getCreatureProficiencyData(creature);
        document.getElementById(`proficiencies--${creature.index}`).insertAdjacentHTML('beforeend', `
            ${proficiencies && `<p><span class="bold">Saving Throws</span> ${proficiencies}</p>`}
        `);
        document.getElementById(`skills--${creature.index}`).insertAdjacentHTML('beforeend', `
            ${skills && `<p><span class="bold">Skills</span> ${skills}</p>`}
        `);
    }, `#skills--${creature.index}`);

    return `
        <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
        <div class="creature-stats-window__proficiencies" id="skills--${creature.index}"></div>
    `;
}
