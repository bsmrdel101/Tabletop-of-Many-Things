import { disableHotkeys, makeDraggable } from '../../scripts/tools/utils';
import { creatureRow } from './creatureRow';
import modal from '../modal';
import { Creature, MinifiedCreature } from '../../scripts/types';
import { getCreatures, getCustomCreatures } from '../../controllers/creaturesController';
import { toggleNewCreatureForm } from '../newCreatureForm';

let creaturesOpen = false;


export const toggleCreaturesModal = () => {
    creaturesOpen = !creaturesOpen;
    if (creaturesOpen) {
        renderCreaturesModal();
        renderCreatureRows('all');
        bindEventsToModal();
    } else {
        document.getElementById('creatures-modal').remove();
    }
};

const creaturesBodyHeaderHtml = () => `
    <div class="creatures-modal__header modal__header">
        <h2>Creatures</h2>
    </div>
    <div class="modal__filters">
        <label>
            <select id="creatures-list-filter">
                <option value="all">All creatures</option>
                <option value="standard">Standard</option>
                <option value="custom">Custom</option>
            </select>
        </label>
        <form id="creatures-modal-search-submit">
            <label class="relative">
                <input placeholder="search" id="creatures-modal-search">
                <button type="submit" class="btn--search"><i class="fa-solid fa-magnifying-glass"></i></button>
            </label>
        </form>
        <button class="btn--hover" id="new-creature-btn">New Creature</button>
    </div>
`;

const renderCreaturesModal = () => {
    document.querySelector('body').insertAdjacentHTML('beforeend', modal('creatures', creaturesBodyHeaderHtml()));
    const window = document.getElementById('creatures-modal');
    disableHotkeys();
    makeDraggable(window, '.creatures-modal__header');
};

const renderCreatureRows = async (value: string) => {
    let index = 0;
    if (value === 'all' || value === 'custom') {
        const customCreatures: Creature[] = await getCustomCreatures();
        customCreatures.forEach((creature: Creature) => {
            document.getElementById('creatures-modal__body').insertAdjacentHTML('beforeend', 
                creatureRow({ creature, custom: true, index })
            );
            index += 1;
        });
    }
    if (value === 'all' || value === 'standard') {
        const creatures: MinifiedCreature[] = await getCreatures();
        creatures.forEach((creature: MinifiedCreature) => {
            document.getElementById('creatures-modal__body').insertAdjacentHTML('beforeend', 
                creatureRow({ creature, custom: false, index })
            );
            index += 1;
        });
    }
};

const filterCreaturesList = async () => {
    let index = 0;
    document.getElementById('creatures-modal__body').innerHTML = '';
    const selectedFilter = (<HTMLInputElement>document.getElementById('creatures-list-filter')).value;
    const value = (<HTMLInputElement>document.getElementById('creatures-modal-search')).value;

    // Filter all custom creatures
    if (selectedFilter === 'all' || selectedFilter === 'custom') {
        const customCreatures: Creature[] = await getCustomCreatures();
        customCreatures.forEach((creature) => {
            if (creature.name.toLowerCase().includes(value.toLowerCase())) {
                document.getElementById('creatures-modal__body').insertAdjacentHTML('beforeend', 
                    creatureRow({ creature, custom: true, index })
                );
                index += 1;
            }
        });
    }
    // Filter all standard creatures
    if (selectedFilter === 'all' || selectedFilter === 'standard') {
        const creatures: MinifiedCreature[] = await getCreatures();
        creatures.forEach((creature) => {
            if (creature.name.toLowerCase().includes(value.toLowerCase())) {
                document.getElementById('creatures-modal__body').insertAdjacentHTML('beforeend', 
                    creatureRow({ creature, custom: false, index })
                );
                index += 1;
            }
        });
    }
};

const bindEventsToModal = () => {
    document.getElementById('creatures-modal-close-btn').addEventListener('click', () => {
        toggleCreaturesModal();
    });
    document.getElementById('creatures-list-filter').addEventListener('change', () => {
        filterCreaturesList();
    });
    document.getElementById('creatures-modal-search-submit').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        filterCreaturesList();
    });
    document.getElementById('new-creature-btn').addEventListener('click', () => {
        toggleNewCreatureForm();
    });
};
