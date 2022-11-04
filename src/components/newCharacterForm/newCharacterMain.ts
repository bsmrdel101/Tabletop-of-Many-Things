import { newCharacterData, setNewCharacterFormPage, submitNewCharacter } from "./newCharacter";

export const renderNewCharacterFormMainPage = (sheetContent: HTMLElement) => {
    setNewCharacterFormPage('main');
    sheetContent.insertAdjacentHTML('beforeend', newCharacterFormMainPageHtml());
    bindEventsToFormMainPage();
};

const bindEventsToFormMainPage = () => {
    document.getElementById('new-character-form-main').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        submitNewCharacter();
    });
    document.getElementById('nc-image').addEventListener('change', (e: any) => {
        newCharacterData.image = e.target.value;
    });
    document.getElementById('nc-name').addEventListener('change', (e: any) => {
        newCharacterData.name = e.target.value;
    });
    document.getElementById('nc-level').addEventListener('change', (e: any) => {
        newCharacterData.level = e.target.value;
    });
    document.getElementById('nc-class').addEventListener('change', (e: any) => {
        newCharacterData.class = e.target.value;
    });
    document.getElementById('nc-race').addEventListener('change', (e: any) => {
        newCharacterData.race = e.target.value;
    });
    document.getElementById('nc-background').addEventListener('change', (e: any) => {
        newCharacterData.background = e.target.value;
    });
    document.getElementById('nc-hit-dice').addEventListener('change', (e: any) => {
        newCharacterData.hit_dice = e.target.value;
    });
    document.getElementById('nc-ac').addEventListener('change', (e: any) => {
        newCharacterData.ac = e.target.value;
    });
    document.getElementById('nc-speed').addEventListener('change', (e: any) => {
        newCharacterData.walk_speed = e.target.value;
    });
    document.getElementById('nc-max-health').addEventListener('change', (e: any) => {
        newCharacterData.max_health = e.target.value;
    });
    document.getElementById('nc-str').addEventListener('change', (e: any) => {
        newCharacterData.str = e.target.value;
    });
    document.getElementById('nc-dex').addEventListener('change', (e: any) => {
        newCharacterData.dex = e.target.value;
    });
    document.getElementById('nc-con').addEventListener('change', (e: any) => {
        newCharacterData.con = e.target.value;
    });
    document.getElementById('nc-int').addEventListener('change', (e: any) => {
        newCharacterData.int = e.target.value;
    });
    document.getElementById('nc-wis').addEventListener('change', (e: any) => {
        newCharacterData.wis = e.target.value;
    });
    document.getElementById('nc-char').addEventListener('change', (e: any) => {
        newCharacterData.char = e.target.value;
    });
};

const newCharacterFormMainPageHtml = () => `
    <form class="new-character__form" id="new-character-form-main">
        <div class="new-character-form__header">
            <h2>New Character</h2>
            <input id="nc-image" type="file" accept="image/png, image/jpeg">
        </div>
        <div class="new-character-form__section">
            <div class="nc-input-box">
                <label for="nc-name">Name</label>
                <input id="nc-name" placeholder="Steve">
            </div>
            <div class="nc-input-box">
                <label for="nc-level">Level</label>
                <input class="input--sm" id="nc-level" placeholder="1" type="number">
            </div>
            <div class="nc-input-box">
                <label for="nc-class">Class</label>
                <input id="nc-class" placeholder="Barbarian">
            </div>
            <div class="nc-input-box">
                <label for="nc-race">Race</label>
                <input id="nc-race" placeholder="Goliath">
            </div>
            <div class="nc-input-box">
                <label for="nc-background">Background</label>
                <input id="nc-background" placeholder="Noble">
            </div>
            <div class="nc-input-box">
                <label for="nc-hit-dice">Hit dice</label>
                <input class="input--sm" id="nc-hit-dice" placeholder="1d12">
            </div>
        </div>
        <div class="character-sheet__main">
            ${newCharacterFormMainStatsHtml()}
        </div>
        <div class="character-sheet__scores">
            ${newCharacterFormScoresHtml()}
        </div>
        <button type="submit">Submit</button>
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
        <input class="input--sm" id="nc-ac" placeholder="12" type="number">
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-speed">Speed</label>
        <input class="input--sm" id="nc-speed" placeholder="30" type="number">
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <label for="nc-max-health">Max Health</label>
        <input class="input--sm" id="nc-max-health" placeholder="20" type="number">
    </div>
`;

const newCharacterFormScoresHtml = () => `
    <div class="new-character-form__scores">
        <div class="character-sheet__score-box">
            <label for="nc-str">Str</label>
            <input class="input--sm" id="nc-str" placeholder="10" type="number">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-dex">Dex</label>
            <input class="input--sm" id="nc-dex" placeholder="10" type="number">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-con">Con</label>
            <input class="input--sm" id="nc-con" placeholder="10" type="number">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-int">Int</label>
            <input class="input--sm" id="nc-int" placeholder="10" type="number">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-wis">Wis</label>
            <input class="input--sm" id="nc-wis" placeholder="10" type="number">
        </div>
        <div class="character-sheet__score-box">
            <label for="nc-char">Char</label>
            <input class="input--sm" id="nc-char" placeholder="10" type="number">
        </div>
    </div>
`;
