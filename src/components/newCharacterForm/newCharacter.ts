import { addCharacter } from "../../controllers/charactersController";
import { disableHotkeys, makeDraggable } from "../../scripts/tools/utils";
import { Character, Skill } from "../../scripts/types";
import { handleNewCharacterFormSidebarState, newCharacterFormSidebarHtml } from "./newCharacterFormSidebar";
import { renderNewCharacterFormMainPage } from "./newCharacterMain";
import { renderNewCharacterFormSkillsPage, resetNewCharacterSkills } from "./newCharacterSkills";

let newCharacterOpen = false;
let newCharacterFormPage = 'main';
export const newCharacterData: Character = {
    name: '',
    class: '',
    race: '',
    background: '',
    alignment: '',
    level: 0,
    ac: 0,
    max_health: 0,
    current_health: 0,
    temp_health: 0,
    prof_bonus: 0,
    initiative: 0,
    inspiration: false,
    hit_dice: 0,
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    char: 0,
    image: '',
    walk_speed: 0,
    swim_speed: 0,
    burrow_speed: 0,
    fly_speed: 0,
    climb_speed: 0,
};
// export let newCharacterImage: string, newCharacterName: string, newCharacterClass: string,
// newCharacterRace: string, newCharacterBackground: string, newCharacterLevel = 1,
// newCharacterHitDice: string, newCharacterAC: number, newCharacterSpeed: any, newCharacterMaxHealth: number,
// newCharacterStr: number, newCharacterDex: number, newCharacterCon: number, newCharacterInt: number,
// newCharacterWis: number, newCharacterChar: number,
// newCharacterSkills: Skill[];

export const setNewCharacterFormPage = (page: string) => newCharacterFormPage = page;

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

export const submitNewCharacter = () => {
    addCharacter(newCharacterData);
};

export const getProfBonusFromLevel = (level: number) => {
    if (level <= 4) return 2;
    if (level <= 8) return 3;
    if (level <= 12) return 4;
    if (level <= 16) return 5;
    if (level <= 20) return 6;
};
