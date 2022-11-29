import { addCharacter, addCharacterSkill } from "../../controllers/charactersController";
import { disableHotkeys, makeDraggable } from "../../scripts/tools/utils";
import { Character, Skill } from "../../scripts/types";
import { handleNewCharacterFormSidebarState, newCharacterFormSidebarHtml } from "./newCharacterFormSidebar";
import { renderNewCharacterFormMainPage } from "./newCharacterMain";
import { newCharacterSkills, renderNewCharacterFormSkillsPage, resetNewCharacterSkills } from "./newCharacterSkills";

let newCharacterOpen = false;
let newCharacterFormPage = 'main';
export const newCharacterData: Character = {
    name: '',
    class: '',
    race: '',
    background: '',
    alignment: '',
    level: 1,
    ac: 10,
    max_health: 0,
    current_health: 0,
    temp_health: 0,
    prof_bonus: 2,
    initiative: 0,
    inspiration: false,
    hit_dice: '',
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    char: 10,
    image: '',
    walk_speed: 30,
    swim_speed: 0,
    burrow_speed: 0,
    fly_speed: 0,
    climb_speed: 0,
};

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

export const submitNewCharacter = async () => {
    await addCharacter(newCharacterData);
    newCharacterSkills.forEach((skill: Skill) => {
        addCharacterSkill(skill);
    });
};

export const getProfBonusFromLevel = (level: number) => {
    if (level <= 4) return 2;
    if (level <= 8) return 3;
    if (level <= 12) return 4;
    if (level <= 16) return 5;
    if (level <= 20) return 6;
};
