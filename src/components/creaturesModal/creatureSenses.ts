import { getCreatureSensesData } from "../../scripts/creatureStatsHandler";
import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

export default function creatureSenses(creature: Creature) {
    ready(() => {
        const senses = getCreatureSensesData(creature);
        document.getElementById(`senses--${creature.index}`).insertAdjacentHTML('beforeend', `
            ${senses && `<p><span class="bold">Senses</span> ${senses}</p>`}
        `);
    }, `#senses--${creature.index}`);

    return `
        <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
    `;
}
