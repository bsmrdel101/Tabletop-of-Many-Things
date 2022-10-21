import { character, setInspiration } from "../../controllers/charactersController";
import { addTempHp, damageHp, healHp } from "../../scripts/characterStatEvents";
import { getAbilityScoreModifiers } from "../../scripts/statsCalculations";
import { Modifiers } from "../../scripts/types";
import { setCharacterSheetPage } from "./characterSheet";

export const renderCharacterSheetMainPage = (sheetContent: HTMLElement) => {
    setCharacterSheetPage('main');
    const modifiers = getAbilityScoreModifiers();
    sheetContent.insertAdjacentHTML('beforeend', characterSheetMainPageHtml(modifiers));
    bindEventsToCharacterSheetMainPage();
};

const characterSheetMainPageHtml = (modifiers: Modifiers) => `
    ${characterSheetMainPageHeaderHtml()}
    <div class="character-sheet__main">
        ${characterSheetMainStatsHtml()}
    </div>
    <div class="character-sheet__small-stat-blocks">
        ${characterSheetSmStatBlocksHtml()}
    </div>
    <div class="character-sheet__scores">
        ${characterSheetScoresHtml(modifiers)}
    </div>
        ${characterSheetHealth()}
`;

const characterSheetMainPageHeaderHtml = () => `
    <div class="character-sheet__header">
        <img class="character-sheet__image" src="${character.image}">
        <div class="character-sheet__header--block">
            <h2>${character.name}</h2>
            <p>${character.race} ${character.class}, ${character.background}</p>
        </div>
    </div>
`;

const characterSheetMainStatsHtml = () => `
    <p><span class="bold">Level</span> ${character.level}</p>
    <p><span class="bold">Prof bonus</span> +${character.prof_bonus}</p>
    <p><span class="bold">Hit dice</span> 1d${character.hit_dice}</p>
    <p class="character-sheet__inspiration"><span class="bold">Inspiration</span> ${characterInspirationIcon(character.inspiration)}</p>
`;

const bindEventsToCharacterSheetMainPage = () => {
    document.querySelector('.character-sheet__inspiration').addEventListener('click', (e: Event) => {
        toggleInspiration(e);
    });
    document.getElementById('character-sheet-health--dmg-form').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const value = parseInt((<HTMLInputElement>document.getElementById('dmg-player-hp-input')).value);
        damageHp(value);
    });
    document.getElementById('character-sheet-health--heal-form').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const value = parseInt((<HTMLInputElement>document.getElementById('heal-player-hp-input')).value);
        healHp(value);
    });
    document.getElementById('character-sheet-health--temp-form').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const value = parseInt((<HTMLInputElement>document.getElementById('temp-player-hp-input')).value);
        addTempHp(value);
    });
};

// Set inspiration data and reloads inspiration icon
const toggleInspiration = (e: Event) => {
    e.preventDefault();
    const { inspiration, id } = character;
    const newInspiration = !inspiration;
    setInspiration({ newInspiration, id });
    document.querySelector('.character-sheet__inspiration').innerHTML = `<span class="bold">Inspiration</span> ${characterInspirationIcon(newInspiration)}`;
};

const characterInspirationIcon = (inspired: boolean) => {
    if (inspired) {
        return `<img class="inspiration-icon" src="../images/star-filled.png" draggable="false">`;
    } else {
        return `<img class="inspiration-icon" src="../images/star-empty.png" draggable="false">`;
    }
};

const characterSheetSmStatBlocksHtml = () => `
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">AC</span></p>
        <p>${character.ac}</p>
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">Init</span></p>
        <p>${character.initiative < 0 ? '' : '+'}${character.initiative}</p>
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">Speed</span></p>
        <p>${character.walk_speed} ft</p>
    </div>
`;

const characterSheetScoresHtml = (modifiers: Modifiers) => {
    const { strMod, dexMod, conMod, intMod, wisMod, charMod } = modifiers;
    return `
        <div class="character-sheet__score-box">
            <p class="bold">Str</p>
            <p>${strMod < 0 ? '' : '+'}${strMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.str}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Dex</p>
            <p>${dexMod < 0 ? '' : '+'}${dexMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.dex}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Con</p>
            <p>${conMod < 0 ? '' : '+'}${conMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.con}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Int</p>
            <p>${intMod < 0 ? '' : '+'}${intMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.int}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Wis</p>
            <p>${wisMod < 0 ? '' : '+'}${wisMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.wis}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Char</p>
            <p>${charMod < 0 ? '' : '+'}${charMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.char}</p>
            </div>
        </div>
    `;
};

const characterSheetHealth = () => `
    <div class="character-sheet__health--temp">
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${character.temp_health}</p>
    </div>
    <div class="character-sheet__health">
        <p class="hp"><img src="../images/heart-red.png">${character.current_health} / ${character.max_health}</p>
    </div>
    <div class="character-sheet__health-tracker">
        <form id="character-sheet-health--dmg-form"><p><span class="bold">Damage</span> <button type="submit">-</button><input id="dmg-player-hp-input" type="number"></p></form>
        <form id="character-sheet-health--heal-form"><p><span class="bold">Heal</span> <button type="submit">+</button><input id="heal-player-hp-input" type="number"></p></form>
        <form id="character-sheet-health--temp-form"><p><span class="bold">Temp Hp</span> <button type="submit">+</button><input id="temp-player-hp-input" type="number"></p></form>
    </div>
`;
