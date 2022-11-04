import { disableHotkeys, makeDraggable } from "../../scripts/tools/utils";
import { Skill } from "../../scripts/types";
import { handleNewCharacterFormSidebarState, newCharacterFormSidebarHtml } from "./newCharacterFormSidebar";
import { renderNewCharacterFormMainPage } from "./newCharacterMain";
import { renderNewCharacterFormSkillsPage, resetNewCharacterSkills } from "./newCharacterSkills";

let newCharacterOpen = false;
let newCharacterFormPage = 'main';
export let newCharacterImage: string, newCharacterName: string, newCharacterClass: string,
newCharacterRace: string, newCharacterBackground: string, newCharacterLevel = 1,
newCharacterHitDice: string, newCharacterAC: number, newCharacterSpeed: any, newCharacterMaxHealth: number,
newCharacterStr: number, newCharacterDex: number, newCharacterCon: number, newCharacterInt: number,
newCharacterWis: number, newCharacterChar: number,
newCharacterSkills: Skill[];

export const setNewCharacterFormPage = (page: string) => {newCharacterFormPage = page};

export const toggleNewCharacterWindow = () => {
    newCharacterOpen = !newCharacterOpen;
    if (newCharacterOpen) {
        renderNewCharacterForm();
        resetNewCharacterSkills();
        determineNewCharacterFormPage(newCharacterFormPage);
        bindEventsToNewCharacterForm();
    } else {
        document.querySelector('.new-character-form').remove();
    }
};

const renderNewCharacterForm = () => {
    const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
    sheetWindow.classList.add('new-character-form');
    sheetWindow.insertAdjacentHTML('beforeend', `
        <button class="btn--modal-close" id="new-character-form-btn--toggle">X</button>
    `);
    sheetWindow.insertAdjacentHTML('beforeend', newCharacterFormSidebarHtml());
    sheetWindow.insertAdjacentHTML('beforeend', '<div class="new-character-form-content"></div>');
    handleNewCharacterFormSidebarState();
};

const bindEventsToNewCharacterForm = () => {
    document.getElementById('new-character-form-btn--toggle').addEventListener('click', () => {
        toggleNewCharacterWindow();
    });
};

export const determineNewCharacterFormPage = (page: string) => {
    const sheetContent: HTMLElement = document.querySelector('.new-character-form-content');
    sheetContent.innerHTML = '';
    switch (page) {
        case 'main':
            renderNewCharacterFormMainPage(sheetContent);
            break;
        case 'skills':
            renderNewCharacterFormSkillsPage(sheetContent);
            break;
        default:
            break;
    }
    disableHotkeys();
    makeDraggable(document.querySelector('.new-character-form'), '.new-character-form__header');
};

export const submitNewCharacter = (e: any) => {
    e.preventDefault();
};

export const getProfBonusFromLevel = (level: number) => {
    if (level <= 4) return 2;
    if (level <= 8) return 3;
    if (level <= 12) return 4;
    if (level <= 16) return 5;
    if (level <= 20) return 6;
};
