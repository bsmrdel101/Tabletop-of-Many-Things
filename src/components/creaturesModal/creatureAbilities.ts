import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

export default function creatureAbilities(creature: Creature) {
    ready(() => {
        if (creature.abilities.length > 0) {
            creature.abilities.forEach((ability) => {
                document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML('beforeend', `
                    <div class="special-abilities__box">
                        <p class="special-abilities__name"><span class="bold">${ability.name}.</span> ${ability.desc}</p>
                    </div>
                `);
            });
        }
    }, `#special-abilities--${creature.index}`);

    return `
        <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
    `;
}
