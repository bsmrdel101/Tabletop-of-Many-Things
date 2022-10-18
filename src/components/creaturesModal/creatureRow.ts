import { deleteCreature } from "../../controllers/creaturesController";
import { ready } from "../../scripts/tools/utils";
import { Creature, MinifiedCreature } from "../../scripts/types";
import { openCreatureStatsWindow } from "./creatureStats";

interface Props {
    creature: MinifiedCreature | Creature
    custom: boolean
    index: number
}

const bindEventsToCreatureRow = (creature: any, creatureId: string, custom: boolean) => {
    const creatureRow = document.getElementById(`${creatureId}`);
    if (custom) {
        document.getElementById(`${creatureId}-trash`).addEventListener('click', () => {
            deleteCreature(creature.id);
            creatureRow.remove();
        });
    }
    creatureRow.addEventListener('click', () => {
        openCreatureStatsWindow(creature.index, custom);
    });
};

const renderCreatureRowContent = (creature: MinifiedCreature | Creature, creatureId: string, custom: boolean) => {
    const creatureRow = document.getElementById(creatureId);
    creatureRow.insertAdjacentHTML('beforeend', `
        <p>${creature.name}</p>
        ${custom ? `<i class="fa-solid fa-trash-can creature-row__delete-btn" id="${creatureId}-trash"></i>` : ''}
    `);
};

export function creatureRow({ creature, custom, index }: Props) {
    const creatureId = `creature-${index}`;
    ready(() => {
        renderCreatureRowContent(creature, creatureId, custom);
        bindEventsToCreatureRow(creature, creatureId, custom);
    }, `#${creatureId}`);

    return `
        <div class="creature-row" id="${creatureId}"></div>
    `;
}
