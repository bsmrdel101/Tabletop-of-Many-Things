import { character, setCharacterSkill, skills } from "../../controllers/charactersController";
import { getAbilityScoreModifiers } from "../../scripts/statsCalculations";
import { indexConverter } from "../../scripts/tools/stringUtils";
import { setCharacterSheetPage } from "./characterSheet";

export const renderCharacterSheetSkillsPage = (sheetContent: HTMLElement) => {
    setCharacterSheetPage('skills');
    sheetContent.insertAdjacentHTML('beforeend', characterSheetSkillsPageHtml());
    fillCharacterSheetSkillsTableBody();
    bindEventsToCharacterSheetSkillsPage();
};

const bindEventsToCharacterSheetSkillsPage = () => {

};

const characterSheetSkillsPageHtml = () => `
    <div class="character-sheet__header">
        <h3 class="character-sheet__header--title">Skills</h3>
    </div>
    <div class="character-sheet__skills-table">
        <table>
            <thead>
                <tr class="character-sheet__skills-table--header">
                    <th>Name</th>
                    <th>Value</th>
                    <th>Proficient</th>
                </tr>
            </thead>
            <tbody class="character-sheet__skills-table-body"></tbody>
        </table>
    </div>
`;

const fillCharacterSheetSkillsTableBody = () => {
    const tableBody = document.querySelector('.character-sheet__skills-table-body');
    skills.forEach((skill) => {
        const skillModifier = getSkillModifier(skill);
        tableBody.insertAdjacentHTML('beforeend', skillRowInnerHtml(skill, skillModifier));
        bindEventToSkills(skill);
    });
};

const skillRowInnerHtml = (skill: any, skillModifier: any) => `
    <tr>
        <td>${skill.name} <span class="character-sheet__skills-table--skill-type">(${skill.type})</span></td>
        <td class="${indexConverter(skill.name)}-mod">${skillModifier < 0 ? '' : '+'}${skillModifier}</td>
        <td class="${indexConverter(skill.name)}-prof">${skill.proficient ? `<i class="fa-solid fa-circle"><input class="skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox" checked="true"></input></i>` : `<i class="fa-regular fa-circle"><input class="skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox"></input></i>`}</td>
    </tr>
`;

// Takes a skill and returns the value of its modifier
const getSkillModifier = (skill: any) => {
    const { strMod, dexMod, conMod, intMod, wisMod, charMod } = getAbilityScoreModifiers();
    let value = 0;
    if (skill.proficient) value += character.prof_bonus;
    switch (skill.type) {
        case 'str':
            value += strMod + skill.bonus_mod;
            break;
        case 'dex':
            value += dexMod + skill.bonus_mod;
            break;
        case 'con':
            value += conMod + skill.bonus_mod;
            break;
        case 'int':
            value += intMod + skill.bonus_mod;
            break;
        case 'wis':
            value += wisMod + skill.bonus_mod;
            break;
        case 'char':
            value += charMod + skill.bonus_mod;
            break;
        default:
            return skill.bonus_mod || 0;
    }
    return value;
};

const bindEventToSkills = (skill: any) => {
    const profCheckbox = document.querySelector(`.skill-proficient-checkbox-${skill.id}`);
    profCheckbox.addEventListener('change', (e: any) => {;
        // Set skill proficiency
        setCharacterSkill({ id: skill.id, characterId: character.id, name: skill.name, type: skill.type, bonus_mod: skill.bonus_mod, proficient: e.target.checked });
        // Update the DOM
        const skillMod = document.querySelector(`.${indexConverter(skill.name)}-mod`);
        const skillProf = document.querySelector(`.${indexConverter(skill.name)}-prof`);
        const profIcon: any = skillProf.childNodes[0];
        const updatedSkill = {
            name: skill.name,
            type: skill.type,
            bonus_mod: skill.bonus_mod,
            proficient: e.target.checked
        };
        const skillModifier = getSkillModifier(updatedSkill);
        skillMod.innerHTML = `${skillModifier < 0 ? '' : '+'}${skillModifier}`;
        if (profIcon.classList.contains('fa-solid')) {
            profIcon.classList.remove('fa-solid');
            profIcon.classList.add('fa-regular');
        } else {
            profIcon.classList.add('fa-solid');
            profIcon.classList.remove('fa-regular');
        }
    });
};
