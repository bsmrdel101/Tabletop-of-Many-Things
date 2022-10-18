import { getCreatureScoresData } from "../../scripts/creatureStatsHandler";
import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

export default function creatureAbilityScores(creature: Creature) {
    ready(() => {
        const { scoreNames, scoreValues } = getCreatureScoresData(creature);
        for (let i = 0; i < 6; i++) {
            let modifier = Math.floor((scoreValues[i] - 10) / 2);
            document.getElementById(`scores--${creature.index}`).insertAdjacentHTML('beforeend', `
                <div class="score-box">
                    <span class="bold"><p>${scoreNames[i]}</p></span>
                    <p>${modifier < 0 ? '' : '+'}${modifier}</p>
                    <div class="score-box--modifier">
                        <p>${scoreValues[i]}</p>
                    </div>
                </div>
            `);
        }
    }, `#scores--${creature.index}`);

    return `
        <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
    `;
}
