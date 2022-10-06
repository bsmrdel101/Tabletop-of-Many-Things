import { makeDraggable } from "../../scripts/utils";
import { renderCharacterSheetMainPage } from "./characterSheetMain";

let sheetOpen: boolean = false;
let sidebarOpen = true;
export let characterSheetPage = 'main';

export const setCharacterSheetPage = (page: string) => characterSheetPage = page;

export const toggleCharacterSheet = () => {
    sheetOpen = !sheetOpen;
    if (sheetOpen) {
        renderCharacterSheet();
        determineCharacterSheetPage(characterSheetPage);
    } else {
        document.querySelector('.character-sheet').remove();
    }
};

// Renders the base character sheet
const renderCharacterSheet = () => {
    const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
    sheetWindow.classList.add('character-sheet');
    // sheetWindow.insertAdjacentHTML('beforeend', characterSheetSidebarHtml());
    sheetWindow.insertAdjacentHTML('beforeend', '<div class="character-sheet-content"></div>');
    // if (!sidebarOpen) collapseCharacterSheetSidebar();
    // if (sidebarOpen) bindEventsToSidebarButtons();
};

// const toggleCharacterSheetSidebar = () => {
//     sidebarOpen = !sidebarOpen;
//     const sidebar = document.querySelector('.character-sheet__sidebar');
//     const toggleBtn = document.querySelector('.character-sheet__sidebar-btn--toggle');
//     if (sidebarOpen) {
//         sidebar.classList.remove('character-sheet__sidebar--collapsed');
//         toggleBtn.innerHTML = '<';
//         sidebar.innerHTML = characterSheetSidebarButtons();
//         bindEventsToSidebarButtons();
//     } else {
//         collapseCharacterSheetSidebar();
//     }
// };
// const characterSheetSidebarHtml = () => `
//     <div class="character-sheet__sidebar">
//         ${characterSheetSidebarButtons()}
//     </div>
// `;
// const collapseCharacterSheetSidebar = () => {
//     const sidebar = document.querySelector('.character-sheet__sidebar');
//     const toggleBtn = document.querySelector('.character-sheet__sidebar-btn--toggle');
//     sidebar.classList.add('character-sheet__sidebar--collapsed');
//     toggleBtn.innerHTML = '>';
//     document.querySelectorAll('.character-sheet__sidebar-btn').forEach((btn) => {
//         btn.remove();
//     });
// };
// const characterSheetSidebarButtons = () => `
//     <button class="character-sheet__sidebar-btn--toggle" onclick="toggleCharacterSheetSidebar()"><</button>
//     <button class="character-sheet__sidebar-btn" id="sidebar-btn--main">Main</button>
//     <button class="character-sheet__sidebar-btn" id="sidebar-btn--skills">Skills</button>
// `;

// const bindEventsToSidebarButtons = () => {
//     document.getElementById('sidebar-btn--main').addEventListener('click', () => {
//         determineCharacterSheetPage('main');
//     });
//     document.getElementById('sidebar-btn--skills').addEventListener('click', () => {
//         determineCharacterSheetPage('skills');
//     });
// };

// Takes in the page that the character sheet will render.
// Renders that page.
const determineCharacterSheetPage = (page: string) => {
    const sheetContent = document.querySelector('.character-sheet-content');
    sheetContent.innerHTML = '';

    switch (page) {
        case 'main':
            renderCharacterSheetMainPage(sheetContent);
            break;
        case 'skills':
            // renderCharacterSheetSkillsPage(sheetContent);
            break;
        default:
            break;
    }
    // disableHotkeys();
    makeDraggable(document.querySelector('.character-sheet'), '.character-sheet__header');
};
