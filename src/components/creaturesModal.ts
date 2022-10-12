import { makeDraggable } from '../scripts/utils';
import modal from './modal';

let creaturesOpen = false;


export const toggleCreaturesModal = () => {
    creaturesOpen = !creaturesOpen;
    if (creaturesOpen) {
        renderCreaturesModal();
        getCreaturesBodyData();
        bindEventsToModal();
    } else {
        document.getElementById('creatures-modal').remove();
    }
};

const creaturesBodyHeaderHtml = () => `
    <div class="modal__header">
        <h2>Creatures</h2>
    </div>
    <div class="modal__filters">
        <label>
            <select id="creature-list-filter">
                <option value="all">All creatures</option>
                <option value="standard">Standard</option>
                <option value="custom">Custom</option>
            </select>
        </label>
        <label>
            <input placeholder="search" id="creatures-modal-search">
        </label>
        <button class="btn--hover" id="new-creature-btn">New Creature</button>
    </div>
`;

const renderCreaturesModal = () => {
    document.querySelector('body').insertAdjacentHTML('beforeend', modal('creatures', creaturesBodyHeaderHtml()));
    const el = document.getElementById('creatures-modal');
    makeDraggable(el, '.modal__header');
};

const getCreaturesBodyData = async () => {
    // await getCustomCreatures();
    // for (let creature of customCreatures) {
    //     renderCustomCreatureRow(creature);
    // }
    // for (let creature of creatures) {
    //     renderStandardCreatureRow(creature);
    // }
};

// const filterCreaturesList = (value: string) => {
//     document.querySelector('.creatures-window__body').innerHTML = '';
//     switch (value) {
//         case 'all':
//             getCreaturesBodyData();
//             break;
//         case 'standard':
//             getStandardCreaturesData();
//             break;
//         case 'custom':
//             getCustomCreaturesData();
//             break;
//         default:
//             break;
//     }
// };

// const searchCreaturesList = async (value: string) => {
//     document.querySelector('.creatures-window__body').innerHTML = '';
//     await getCustomCreatures();
//     const selectedFilter = document.getElementById('creature-list-filter').value;

//     // Filter all standard creatures
//     if (selectedFilter === 'all' || selectedFilter === 'standard') {
//         creatures.forEach((creature) => {
//             if (creature.name.toLowerCase().includes(value.toLowerCase())) {
//                 renderStandardCreatureRow(creature);
//             }
//         });
//     }
//     // Filter all custom creatures
//     if (selectedFilter === 'all' || selectedFilter === 'custom') {
//         customCreatures.forEach((creature) => {
//             if (creature.name.toLowerCase().includes(value.toLowerCase())) {
//                 renderCustomCreatureRow(creature);
//             }
//         });
//     }
// };

const bindEventsToModal = () => {
    document.getElementById('creatures-modal-close-btn').addEventListener('click', () => {
        toggleCreaturesModal();
    });
};
