import { closeMenu, menuOpen, setMenuOpenValue, setSelectedMenuValue } from "../scripts/menuManager";
import { characters, getCharacter, getCharacters, getCharacterSkills, updateCharacter, updateCharacterSkills } from "../controllers/charactersController";

export const toggleCharacterMenu = () => {
    setMenuOpenValue(!menuOpen);
    if (menuOpen) {
        setSelectedMenuValue('characters');
        // Create menu
        document.querySelector('.game-page').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        document.querySelector('.menu__btn--close').addEventListener('click', () => closeMenu('characters'));
        getCharacterBodyData();
    } else {
        closeMenu('characters');
    }
};

const getCharacterBodyData = async () => {
    await getCharacters();
    for (let character of characters) {
        document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
            <div class="menu__item menu__item--character" id="character-menu-item-${character.id}">
                <img src=${character.image}>
                <div>
                    <p>${character.level} ${character.name} ${character.class}</p>
                </div>
            </div>
        `);
        document.getElementById(`character-menu-item-${character.id}`).addEventListener('click', () => {
            selectCharacter(character.id);
        });
    }

    // Add new character button
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <div class="menu__item menu__item--character-btn">
            <button class="btn--new-item" onclick="toggleNewCharacterWindow()">New Character</button>
        </div>
    `);
};

const selectCharacter = async (id: number) => {
    let characterData = await getCharacter(id);
    updateCharacter(characterData);
    let skillsData = await getCharacterSkills(id);
    updateCharacterSkills(skillsData);
    toggleCharacterMenu();
};
