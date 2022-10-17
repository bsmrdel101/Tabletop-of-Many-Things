import { ready } from "../scripts/tools/utils";
import { clientType } from "../views/dashboardPage";
import { toggleCharacterMenu } from "./characterMenu";
import { toggleCharacterSheet } from "./characterSheet/characterSheet";
import { toggleCreaturesModal } from "./creaturesModal/creaturesModal";
import { toggleMapMenu } from "./mapsMenu";
import { toggleTokenMenu } from "./tokensMenu";

const bindEventsToSidebar = () => {
    if (clientType === 'dm') {
        document.getElementById('maps-menu-btn').addEventListener('click', () => {
            toggleMapMenu();
        });
        document.getElementById('tokens-menu-btn').addEventListener('click', () => {
            toggleTokenMenu();
        });
        document.getElementById('creatures-modal-btn').addEventListener('click', () => {
            toggleCreaturesModal();
        });
    } else {
        document.getElementById('characters-menu-btn').addEventListener('click', () => {
            toggleCharacterMenu();
        });
        document.getElementById('character-sheet-modal-btn').addEventListener('click', () => {
            toggleCharacterSheet();
        });
    }
};

const sidebarInnerHtml = () => {
    if (clientType === 'dm') {
        return `
            <button class="sidebar__btn btn--hover" id="maps-menu-btn">Maps</button>
            <button class="sidebar__btn btn--hover" id="tokens-menu-btn">Tokens</button>
            <button class="sidebar__btn btn--hover" id="creatures-modal-btn">Creatures</button>
            <button class="sidebar__btn btn--hover" id="encounters-modal-btn">Encounters</button>
            <button class="sidebar__btn btn--hover" id="loot-modal-btn">Loot</button>
            <button class="sidebar__btn btn--hover" id="items-modal-btn">Items</button>
            <button class="sidebar__btn btn--hover" id="shops-modal-btn">Shops</button>
        `;
    } else {
        return `
            <button class="sidebar__btn btn--hover" id="characters-menu-btn">Characters</button>
            <button class="sidebar__btn btn--hover" id="character-sheet-modal-btn">Character Sheet</button>
        `;
    }
};

export default function sidebar() {
    ready(() => {
        bindEventsToSidebar();
    }, '.sidebar');

    return `
        <div class="sidebar">${sidebarInnerHtml()}</div>
    `;
}
