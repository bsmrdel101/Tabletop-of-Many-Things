import { determineCharacterSheetPage, toggleCharacterSheet } from "./characterSheet";

let sidebarOpen = true;

export const toggleCharacterSheetSidebar = () => {
    sidebarOpen = !sidebarOpen;
    const sidebar = document.querySelector('.character-sheet__sidebar');
    const toggleBtn = document.querySelector('.character-sheet__sidebar-btn--toggle');
    document.querySelectorAll('.character-sheet__sidebar-btn').forEach((btn) => {
        btn.classList.toggle('hidden');
    });
    sidebar.classList.toggle('character-sheet__sidebar--hidden');
    if (sidebarOpen) {
        toggleBtn.innerHTML = '<';
    } else {
        toggleBtn.innerHTML = '>';
    }
};

export const characterSheetSidebarHtml = () => `
    <div class="character-sheet__sidebar">
        ${characterSheetSidebarButtons()}
    </div>
`;

// If the sidebar was closed previously, then keep it closed
// Then add event listeners to buttons
export const handleCharacterSheetSidebarState = () => {
    if (!sidebarOpen) {
        const sidebar = document.querySelector('.character-sheet__sidebar');
        const toggleBtn = document.querySelector('.character-sheet__sidebar-btn--toggle');
        document.querySelectorAll('.character-sheet__sidebar-btn').forEach((btn) => {
            btn.classList.toggle('hidden');
        });
        sidebar.classList.toggle('character-sheet__sidebar--hidden');
        if (sidebarOpen) {
            toggleBtn.innerHTML = '<';
        } else {
            toggleBtn.innerHTML = '>';
        }
    }
    bindEventsToSidebarButtons();
};

const characterSheetSidebarButtons = () => `
    <button class="character-sheet__sidebar-btn--toggle"><</button>
    <button class="character-sheet__sidebar-btn" id="sidebar-btn--main">Main</button>
    <button class="character-sheet__sidebar-btn" id="sidebar-btn--skills">Skills</button>
`;

const bindEventsToSidebarButtons = () => {
    document.getElementById('sidebar-btn--main').addEventListener('click', () => {
        determineCharacterSheetPage('main');
    });
    document.getElementById('sidebar-btn--skills').addEventListener('click', () => {
        determineCharacterSheetPage('skills');
    });
    document.querySelector('.character-sheet__sidebar-btn--toggle').addEventListener('click', () => {
        toggleCharacterSheetSidebar();
    });
    document.getElementById('character-sheet-close-btn').addEventListener('click', () => {
        toggleCharacterSheet();
    });
};
