import { disableHotkeys, makeDraggable } from "../../scripts/tools/utils";
import { renderCharacterSheetSkillsPage } from "./character.SheetSkills";
import { renderCharacterSheetMainPage } from "./characterSheetMain";
import { characterSheetSidebarHtml, handleCharacterSheetSidebarState } from "./characterSheetSidebar";

let sheetOpen = false;
export let characterSheetPage = 'main';

export const setCharacterSheetPage = (page: string) => characterSheetPage = page;

export const toggleCharacterSheet = () => {
    sheetOpen = !sheetOpen;
    if (sheetOpen) {
        renderCharacterSheet();
        determineCharacterSheetPage(characterSheetPage);
    } else {
        document.getElementById('character-sheet-modal').remove();
    }
};

// Renders the base character sheet
const renderCharacterSheet = () => {
    const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
    sheetWindow.classList.add('character-sheet');
    sheetWindow.id = 'character-sheet-modal';
    sheetWindow.insertAdjacentHTML('beforeend', characterSheetSidebarHtml());
    sheetWindow.insertAdjacentHTML('beforeend', `
        <button class="btn--modal-close" id="character-sheet-close-btn">X</button>
        <div class="character-sheet-content"></div>
    `);
    handleCharacterSheetSidebarState();
};

// Takes in the page that the character sheet will render.
// Renders that page.
export const determineCharacterSheetPage = (page: string) => {
    const sheetContent: HTMLElement = document.querySelector('.character-sheet-content');
    sheetContent.innerHTML = '';

    switch (page) {
        case 'main':
            renderCharacterSheetMainPage(sheetContent);
            break;
        case 'skills':
            renderCharacterSheetSkillsPage(sheetContent);
            break;
        default:
            break;
    }
    disableHotkeys();
    makeDraggable(document.getElementById('character-sheet-modal'), '.character-sheet__header');
};
