import { getProfBonusFromLevel, newCharacterData, setNewCharacterFormPage, submitNewCharacter } from "./newCharacter";

let latestNewCharacterSkillID: number;
export let newCharacterSkills: Skill[];

export const renderNewCharacterFormSkillsPage = (sheetContent: HTMLElement) => {
    setNewCharacterFormPage('skills');
    sheetContent.insertAdjacentHTML('beforeend', newCharacterFormSkillsPageHtml());
    fillNewCharacterFormSkillsTableBody();
    bindEventToFormSkillsPage();
};

const newCharacterFormSkillsPageHtml = () => `
    <form class="new-character-form__form" id="new-character-form-skills">
        <div class="new-character-form__header">
            <h2>Skills</h2>
        </div>
        <div class="new-character-form__skills-table">
            <table>
                <thead>
                    <tr class="new-character-form__skills-table--header">
                        <th>Name</th>
                        <th>Value</th>
                        <th>Proficient</th>
                    </tr>
                </thead>
                <tbody class="new-character-form__skills-table-body"></tbody>
            </table>
            <button type="button" class="add-new-character-skill-row-btn">Add row</button>
        </div>
        <button type="submit">Submit</button>
    </form>
`;

const fillNewCharacterFormSkillsTableBody = () => {
    const tableBody = document.querySelector('.new-character-form__skills-table-body');
    newCharacterSkills.forEach((skill) => {
        let skillModifier = getNewCharacterFormSkillModifier(skill);
        tableBody.insertAdjacentHTML('beforeend', newCharacterFormSkillInputRowInnerHtml(skill, skillModifier));
        bindEventToNewCharacterFormProf(skill);
    });
};

const newCharacterFormSkillInputRowInnerHtml = (skill: Skill, skillModifier: number) => {
    if (skill) {
        return `
            <tr>
                <td><input type="text" class="input--md" placeholder="Skill name" value="${skill.name}"><input type="text" class="input--sm new-creature-form--skill-type" onchange="updateNewCharacterSkillType(${skill.id}, event.target.value)" placeholder="Type" value="${skill.type}"></td>
                <td><input class="input--sm i-${skill.id}-new-skill-mod" placeholder="Value" type="number" value="${skillModifier}"></td>
                <td>${skill.proficient ? `<i class="fa-solid fa-circle i-${skill.id}-prof-icon"><input class="new-skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox" checked="true"></input></i>` : `<i class="fa-regular fa-circle i-${skill.id}-prof-icon"><input class="new-skill-proficient-checkbox-${skill.id} character-sheet__skills-table--checkbox" type="checkbox"></input></i>`}</td>
                <td><button id="${skill.id}-new-skill-delete-btn"><i class="fa fa-trash delete-new-character-form-skill-row-btn" aria-hidden="true"></i></button></td>
            </tr>
        `;
    }
    const id = latestNewCharacterSkillID += 1;
    newCharacterSkills.push(new Skill(id, 'Untitled skill', 'str', 0, false));
    return `
        <tr>
            <td><input type="text" class="input--md" placeholder="Skill name" value="${newCharacterSkills[id].name}"><input type="text" class="input--sm new-creature-form--skill-type" placeholder="Type" value="${newCharacterSkills[id].type}"></td>
            <td><input class="input--sm i-${id}-new-skill-mod" placeholder="Value" type="number" value="${newCharacterSkills[id].bonus_mod}"></td>
            <td>${newCharacterSkills[id].proficient ? `<i class="fa-solid fa-circle i-${newCharacterSkills[id].id}-prof-icon"><input class="character-sheet__skills-table--checkbox new-skill-proficient-checkbox-${newCharacterSkills[id].id}" type="checkbox" checked="true"></input></i>` : `<i class="fa-regular fa-circle i-${newCharacterSkills[id].id}-prof-icon"><input class="character-sheet__skills-table--checkbox new-skill-proficient-checkbox-${newCharacterSkills[id].id}" type="checkbox"></input></i>`}</td>
            <td><button id="${id}-new-skill-delete-btn"><i class="fa fa-trash delete-new-character-form-skill-row-btn" aria-hidden="true"></i></button></td>
        </tr>
    `;
};

const bindEventToFormSkillsPage = () => {
    const skillsModInputs = [];
    const tableBody = document.querySelector('.new-character-form__skills-table-body');
    document.querySelector('.add-new-character-skill-row-btn').addEventListener('click', () => {
        tableBody.insertAdjacentHTML('beforeend', newCharacterFormSkillInputRowInnerHtml(null, null));
        bindEventToNewCharacterFormProf(newCharacterSkills[latestNewCharacterSkillID]);
    });
    document.getElementById('new-character-form-skills').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        submitNewCharacter();
    });
    newCharacterSkills.forEach((skill, i) => {
        skillsModInputs.push((<HTMLInputElement>document.querySelector(`.i-${skill.id}-new-skill-mod`)).value);
        $(`.i-${skill.id}-new-skill-mod`).on('input', (e: any) => {
            skill.bonus_mod = parseInt(e.target.value) - skillsModInputs[i];
        });
    });
};

const bindEventToNewCharacterFormProf = (skill: Skill) => {
    document.querySelector(`.new-skill-proficient-checkbox-${skill.id}`).addEventListener('change', (e: any) => {
        // Set proficient value
        const skillMod: HTMLInputElement = document.querySelector(`.i-${skill.id}-new-skill-mod`);
        skill.proficient = e.target.checked;
        skillMod.value = getNewCharacterFormSkillModifier(skill).toString();

        // Change proficient icon
        const profIcon = document.querySelector(`.i-${skill.id}-prof-icon`);
        if (profIcon.classList.contains('fa-solid')) {
            profIcon.classList.remove('fa-solid');
            profIcon.classList.add('fa-regular');
        } else {
            profIcon.classList.add('fa-solid');
            profIcon.classList.remove('fa-regular');
        }
    });
};

export const resetNewCharacterSkills = () => {
    latestNewCharacterSkillID = 17;
    newCharacterSkills = [
        new Skill (0, 'Athletics', 'str', 0, false),
        new Skill (1, 'Acrobatics', 'dex', 0, false),
        new Skill (2, 'Slight of Hand', 'dex', 0, false),
        new Skill (3, 'Stealth', 'dex', 0, true),
        new Skill (4, 'Arcana', 'int', 0, false),
        new Skill (5, 'History', 'int', 0, false),
        new Skill (6, 'Investigation', 'int', 0, false),
        new Skill (7, 'Nature', 'wis', 0, false),
        new Skill (8, 'Religion', 'wis', 0, false),
        new Skill (9, 'Animal Handling', 'wis', 0, false),
        new Skill (10, 'Insight', 'wis', 0, false),
        new Skill (11, 'Medicine', 'wis', 0, false),
        new Skill (12, 'Perception', 'wis', 0, true),
        new Skill (13, 'Survival', 'wis', 0, false),
        new Skill (14, 'Deception', 'char', 0, false),
        new Skill (15, 'Intimidation', 'char', 0, true),
        new Skill (16, 'Performance', 'char', 0, false),
        new Skill (17, 'Persuasion', 'char', 0, false),
    ];
};

const getNewCharacterFormSkillModifier = (skill: Skill) => {
    let value = 0;
    if (skill.proficient) value += getProfBonusFromLevel(newCharacterData.level);
    switch (skill.type) {
        case 'str':
            value += newCharacterData.str + skill.bonus_mod || skill.bonus_mod || 0;
            break;
        case 'dex':
            value += newCharacterData.dex + skill.bonus_mod || skill.bonus_mod || 0;
            break;
        case 'con':
            value += newCharacterData.con + skill.bonus_mod || skill.bonus_mod || 0;
            break;
        case 'int':
            value += newCharacterData.int + skill.bonus_mod || skill.bonus_mod || 0;
            break;
        case 'wis':
            value += newCharacterData.wis + skill.bonus_mod || skill.bonus_mod || 0;
            break;
        case 'char':
            value += newCharacterData.char + skill.bonus_mod || skill.bonus_mod || 0;
            break;
        default:
            return value + skill.bonus_mod || 0;
    }
    return value;
};

class Skill {
    id: number
    name: string
    type: string
    bonus_mod: number
    proficient: boolean

    constructor(id: number, name: string, type: string, bonus_mod: number, proficient: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.bonus_mod = bonus_mod;
        this.proficient = proficient;
    }
}
