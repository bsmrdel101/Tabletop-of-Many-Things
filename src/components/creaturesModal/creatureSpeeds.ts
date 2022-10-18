import { getCreatureSpeedData } from "../../scripts/creatureStatsHandler";
import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

export default function creatureSpeeds(creature: Creature) {
    ready(() => {
        const speeds = getCreatureSpeedData(creature);
        const text = document.getElementById(`speed--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend', `<span class="bold">Speed </span>`);
        speeds.forEach((speed) => {
            text.insertAdjacentHTML('beforeend', `
                ${speed.name} ${speed.value} ft.,
            `);
        });
    }, `#speed--${creature.index}`);

    return `
        <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
    `;
}
