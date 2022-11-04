import { determineNewCharacterFormPage } from "./newCharacter";

let newCharacterFormSidebarOpen = true;

export const toggleNewCharacterFormSidebar = () => {
    const sidebar = document.querySelector('.new-character-form__sidebar');
    const toggleBtn = document.querySelector('.new-character-form__sidebar-btn--toggle');
    newCharacterFormSidebarOpen = !newCharacterFormSidebarOpen;
    document.querySelectorAll('.new-character-form__sidebar-btn').forEach((btn) => {
        btn.classList.toggle('hidden');
    });
    sidebar.classList.toggle('new-character-form__sidebar--hidden');
    if (newCharacterFormSidebarOpen) {
        toggleBtn.innerHTML = '<';
    } else {
        toggleBtn.innerHTML = '>';
    }
};

export const handleNewCharacterFormSidebarState = () => {
    const toggleBtn = document.querySelector('.new-character-form__sidebar-btn--toggle');
    if (newCharacterFormSidebarOpen) {
        toggleBtn.innerHTML = '<';
    } else {
        toggleBtn.innerHTML = '>';
    }
    bindEventsToNewCharacterFormSidebarButtons();
};

export const newCharacterFormSidebarHtml = () => `
    <div class="new-character-form__sidebar">
        ${newCharacterFormSidebarButtons()}
    </div>
`;

const newCharacterFormSidebarButtons = () => `
    <button class="new-character-form__sidebar-btn--toggle" id="new-character-form__sidebar--toggle"><</button>
    <button class="new-character-form__sidebar-btn" id="new-character-sidebar-btn--main">Main</button>
    <button class="new-character-form__sidebar-btn" id="new-character-sidebar-btn--skills">Skills</button>
`;

const bindEventsToNewCharacterFormSidebarButtons = () => {
    document.getElementById('new-character-form__sidebar--toggle').addEventListener('click', () => {
        toggleNewCharacterFormSidebar();
    });
    document.getElementById('new-character-sidebar-btn--main').addEventListener('click', () => {
        determineNewCharacterFormPage('main');
    });
    document.getElementById('new-character-sidebar-btn--skills').addEventListener('click', () => {
        determineNewCharacterFormPage('skills');
    });
};
