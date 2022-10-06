import { getAbilityScoreModifiers } from "../../scripts/statsCalculations";
import { setCharacterSheetPage } from "./characterSheet";

export const renderCharacterSheetMainPage = (sheetContent) => {
    setCharacterSheetPage('main');
    const modifiers = getAbilityScoreModifiers();
    // sheetContent.insertAdjacentHTML('beforeend', characterSheetMainPageHtml(character, modifiers));
};
