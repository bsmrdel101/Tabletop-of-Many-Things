import { getCreatureByIndex } from "../../controllers/creaturesController";
import { makeDraggable } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";
import modal from "../modal";
import creatureAbilities from "./creatureAbilities";
import creatureAbilityScores from "./creatureAbilityScores";
import creatureActions from "./creatureActions";
import creatureLegActions from "./creatureLegActions";
import creatureProficiencies from "./creatureProficiencies";
import creatureSenses from "./creatureSenses";
import creatureSpeeds from "./creatureSpeeds";
import creatureVulRes from "./creatureVulRes";

let creatureIndexList = [];

export const openCreatureStatsWindow = async (index: string, custom: boolean) => {
    // Check if a creature's stats are already open
    // If they are open the close the window instead
    for (let listItem of creatureIndexList) {
        if (listItem === index) {
            document.getElementById(`${index}-modal`).remove();    
            creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
            return;
        }
    }
    creatureIndexList.push(index);
    
    // Get data for selected creature
    let creature: Creature = await getCreatureByIndex(index, custom);
    renderCreatureStatsWindow(creature);
    bindEventsToCreatureStatsWindow(creature);
};


const renderCreatureStatsWindow = (creature: Creature) => {
    document.querySelector('body').insertAdjacentHTML('beforeend', modal(creature.index, creatureStatsWindowHeader(creature)));
    const creatureStatsModal = document.getElementById(`${creature.index}-modal`);
    const modalBody = <HTMLElement>document.getElementById(`${creature.index}-modal__body`);
    creatureStatsModal.classList.add('modal--offset');
    modalBody.classList.add('creature-stats-window');
    modalBody.classList.add(`creature-stats-window--${creature.index}`);
    modalBody.insertAdjacentHTML('beforeend', creatureStatsWindow(creature));
    makeDraggable(creatureStatsModal, `#creature-stats-window--${creature.index}__header`);
};

const bindEventsToCreatureStatsWindow = (creature: Creature) => {
    document.getElementById(`${creature.index}-modal-close-btn`).addEventListener('click', () => {
        document.getElementById(`${creature.index}-modal`).remove();
        creatureIndexList.splice(creatureIndexList.indexOf(creature.index), 1);
    });
};

const creatureStatsWindowHeader = (creature: Creature) => `
    <div class="creature-stats-window__header" id="creature-stats-window--${creature.index}__header">
        <h3>${creature.name}</h3>
        <p>${creature.size ? `${creature.size}` : ''}${creature.type ? ` ${creature.type}` : ''}${creature.alignment ? `, ${creature.alignment}`: ''}</p>
    </div>
`;

const creatureStatsWindow = (creature: Creature) => `
    <div class="creature-stats-content">
        <div class="creature-stats-window__body">
            <p><span class="bold">Armor Class</span> ${creature.ac}</p>
            <p><span class="bold">Health</span> ${creature.hit_points} ${creature.hit_dice ? `(${creature.hit_dice})` : ''}</p>
            ${creatureSpeeds(creature)}
            <div class="creatures-window__body--general-stats">
                ${creatureAbilityScores(creature)}
                ${creatureProficiencies(creature)}
                ${creatureVulRes(creature)}
                ${creatureSenses(creature)}
                <div class="creature-stats-window__languages">
                    ${creature.languages ? `<p><span class="bold">Languages</span> ${creature.languages}</p>` : ``}
                </div>
                <div class="creature-stats-window__body">
                    <p><span class="bold">Challenge</span> ${creature.cr ? creature.cr : '-'} (${creature.xp ? creature.xp : 0} XP)</p>
                </div>
            </div>
            ${creatureAbilities(creature)}
            ${creature.actions.length > 0 ? creatureActions(creature) : ''}
            ${creature.legActions.length > 0 ? creatureLegActions(creature) : ''}
        </div>
    </div>
`;
