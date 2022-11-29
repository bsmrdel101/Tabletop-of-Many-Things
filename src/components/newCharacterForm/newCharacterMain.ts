import { newCharacterData, setNewCharacterFormPage } from "./newCharacter";

export const renderNewCharacterFormMainPage = (sheetContent: HTMLElement) => {
    setNewCharacterFormPage('main');
    sheetContent.insertAdjacentHTML('beforeend', newCharacterFormMainPageHtml());
    bindEventsToFormMainPage();
};

const bindEventsToFormMainPage = () => {    
    $('#nc-image').on('change', (e: any) => {
        newCharacterData.image = e.target.value;
    });
    $('#nc-name').on('change', (e: any) => {
        newCharacterData.name = e.target.value;
    });
    $('#nc-level').on('change', (e: any) => {
        newCharacterData.level = e.target.value;
    });
    $('#nc-class').on('change', (e: any) => {
        newCharacterData.class = e.target.value;
    });
    $('#nc-race').on('change', (e: any) => {
        newCharacterData.race = e.target.value;
    });
    $('#nc-background').on('change', (e: any) => {
        newCharacterData.background = e.target.value;
    });
    $('#nc-hit-dice').on('change', (e: any) => {
        newCharacterData.hit_dice = e.target.value.split('d')[1] || e.target.value;
    });
    $('#nc-ac').on('change', (e: any) => {
        newCharacterData.ac = e.target.value;
    });
    $('#nc-speed').on('change', (e: any) => {
        newCharacterData.walk_speed = e.target.value;
    });
    $('#nc-max-health').on('change', (e: any) => {
        newCharacterData.max_health = e.target.value;
    });
    $('#nc-str').on('change', (e: any) => {
        newCharacterData.str = e.target.value;
    });
    $('#nc-dex').on('change', (e: any) => {
        newCharacterData.dex = e.target.value;
    });
    $('#nc-con').on('change', (e: any) => {
        newCharacterData.con = e.target.value;
    });
    $('#nc-int').on('change', (e: any) => {
        newCharacterData.int = e.target.value;
    });
    $('#nc-wis').on('change', (e: any) => {
        newCharacterData.wis = e.target.value;
    });
    $('#nc-char').on('change', (e: any) => {
        newCharacterData.char = e.target.value;
    });
};

const newCharacterFormMainPageHtml = () => `
    <form class="new-character__form">
        <div class="new-character-form__header">
            <h2>New Character</h2>
            <input id="nc-image" type="file" accept="image/png, image/jpeg">
        </div>
        <div class="new-character-form__section">
            <div class="nc-input-box">
                <label for="nc-name">Name</label>
                <input id="nc-name" placeholder="Steve" value="${newCharacterData.name}">
            </div>
            <div class="nc-input-box">
                <label for="nc-level">Level</label>
                <input class="input--sm" id="nc-level" placeholder="1" type="number" value="${newCharacterData.level}">
            </div>
            <div class="nc-input-box">
                <label for="nc-class">Class</label>
                <input id="nc-class" placeholder="Barbarian" value="${newCharacterData.class}">
            </div>
            <div class="nc-input-box">
                <label for="nc-race">Race</label>
                <input id="nc-race" placeholder="Goliath" value="${newCharacterData.race}">
            </div>
            <div class="nc-input-box">
                <label for="nc-background">Background</label>
                <input id="nc-background" placeholder="Noble" value="${newCharacterData.background}">
            </div>
            <div class="nc-input-box">
                <label for="nc-hit-dice">Hit dice</label>
                <input class="input--sm" id="nc-hit-dice" placeholder="1d12" value="${newCharacterData.hit_dice}">
            </div>
        </div>
        <div class="character-sheet__main">
            ${newCharacterFormMainStatsHtml()}
        </div>
        <div class="character-sheet__scores">
            ${newCharacterFormScoresHtml()}
        </div>
    </form>
`;

const newCharacterFormMainStatsHtml = () => `
    <div class="character-sheet__small-stat-blocks">
        ${newCharacterFormSmStatBlocksHtml()}
    </div>
`;

const newCharacterFormSmStatBlocksHtml = () => `
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-ac">AC</label>
        <input class="input--sm" id="nc-ac" placeholder="12" type="number" value="${newCharacterData.ac}">
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-speed">Speed</label>
        <input class="input--sm" id="nc-speed" placeholder="30" type="number" value="${newCharacterData.walk_speed}">
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-max-health">Max Health</label>
        <input class="input--sm" id="nc-max-health" placeholder="20" type="number" value="${newCharacterData.max_health}">
    </div>
`;

const newCharacterFormScoresHtml = () => `
    <div class="new-character-form__scores">
        <div class="character-sheet__score-box">
            <label for="nc-str">Str</label>
            <input class="input--sm" id="nc-str" placeholder="10" type="number" value="${newCharacterData.str}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-dex">Dex</label>
            <input class="input--sm" id="nc-dex" placeholder="10" type="number" value="${newCharacterData.dex}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-con">Con</label>
            <input class="input--sm" id="nc-con" placeholder="10" type="number" value="${newCharacterData.con}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-int">Int</label>
            <input class="input--sm" id="nc-int" placeholder="10" type="number" value="${newCharacterData.int}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-wis">Wis</label>
            <input class="input--sm" id="nc-wis" placeholder="10" type="number" value="${newCharacterData.wis}">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-char">Char</label>
            <input class="input--sm" id="nc-char" placeholder="10" type="number" value="${newCharacterData.char}">
        </div>
    </div>
`;
