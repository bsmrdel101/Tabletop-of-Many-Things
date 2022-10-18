import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

const renderCreatureActions = (creature: Creature) => {
    let i = 0;
    creature.actions.forEach((action) => {
        document.getElementById(`actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i> +${action.attack_bonus}</button>` : ''}
                <span id="${creature.index}-${action.name}-${i}"></span>
            </div>
        `);
        i++;
    });
    i = 0;
    creature.actions.forEach((action) => {
        let element = document.getElementById(`${creature.index}-${action.name}-${i}`);
        element.classList.add('actions__box--dmg_dice');
        action.damage.forEach((dmg) => {
            element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${dmg.damageDice} ${dmg.damageType}</button>`);
        });
        i++;
    });
};

export default function creatureActions(creature: Creature) {
    ready(() => {
        renderCreatureActions(creature);
    }, `#actions--${creature.index}`);

    return `
        <div class="creatures-window__body--actions">
            <h4>Actions</h4>
            <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
        </div>
    `;
}
