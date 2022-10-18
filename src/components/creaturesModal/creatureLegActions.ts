import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

const renderCreatureLegActions = (creature: Creature) => {
    let i = 0;
    creature.legActions.forEach((action) => {
        document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i> +${action.attack_bonus}</button>` : ''}
                <span id="${creature.index}-${action.name}-${i}"></span>
            </div>
        `);
        i++;
    });

    i = 0;
    creature.legActions.forEach((action) => {
        let element = document.getElementById(`${creature.index}-${action.name}-${i}`);
        element.classList.add('legendary-actions__box--dmg_dice');

        action.damage.forEach((dmg) => {
            if (dmg.damageDice) {
                element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${dmg.damageDice} ${dmg.damageType}</button>`);
            }
        });
        i++;
    });
};

export default function creatureLegActions(creature: Creature) {
    ready(() => {
        renderCreatureLegActions(creature);
    }, `#legendary-actions--${creature.index}`);

    return `
        <div class="creatures-window__body--actions">
            <h4>Legendary Actions</h4>
            <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
        </div>
    `;
}
