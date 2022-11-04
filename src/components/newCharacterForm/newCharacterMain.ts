import { setNewCharacterFormPage } from "./newCharacter";

export const renderNewCharacterFormMainPage = (sheetContent: HTMLElement) => {
    setNewCharacterFormPage('main');
    sheetContent.insertAdjacentHTML('beforeend', newCharacterFormMainPageHtml());
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
