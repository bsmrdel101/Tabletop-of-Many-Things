import { toggleNewCreatureForm } from "../components/newCreatureForm";
import { addCreature } from "../controllers/creaturesController";
import { indexConverter } from "./tools/stringUtils";

export const submitCreatureForm = (e: any) => {
    e.preventDefault();
    const { proficiencies, senses, abilities, actions, legActions } = getArrayInputValues();
    const { creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp, creatureFormWalk, creatureFormSwim, creatureFormBurrow, creatureFormFly, creatureFormClimb } = getInputValues();
    toggleNewCreatureForm();
    const newCreature = new CreatureFormData(indexConverter(creatureFormName), 'https://www.dandwiki.com/w/images/3/37/BreadSpawn.jpg', creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, parseInt(creatureFormAc), parseInt(creatureFormHitPoints), creatureFormHitDice, parseInt(creatureFormStr), parseInt(creatureFormDex), parseInt(creatureFormCon), parseInt(creatureFormInt), parseInt(creatureFormWis), parseInt(creatureFormChar), creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, parseInt(creatureFormCr), parseInt(creatureFormXp), parseInt(creatureFormWalk), parseInt(creatureFormSwim), parseInt(creatureFormBurrow), parseInt(creatureFormFly), parseInt(creatureFormClimb), proficiencies, senses, abilities, actions, legActions);
    addCreature(newCreature);
}

const getArrayInputValues = () => {
    let proficiencies = [];
    let senses = [];
    let abilities = [];
    let actions = [];
    let legActions = [];
    let proficiencyName: any = document.getElementsByClassName('creature-inputs__proficiency-name');
    let proficiencyValue: any = document.getElementsByClassName('creature-inputs__proficiency-value');
    let senseName: any = document.getElementsByClassName('creature-inputs__sense-name');
    let senseValue: any = document.getElementsByClassName('creature-inputs__sense-value');
    let abilityName: any = document.getElementsByClassName('creature-inputs__ability-name');
    let abilityDesc: any = document.getElementsByClassName('creature-inputs__ability-desc');
    let actionName: any = document.getElementsByClassName('creature-inputs__action-name');
    let actionDesc: any = document.getElementsByClassName('creature-inputs__action-desc');
    let legActionName: any = document.getElementsByClassName('creature-inputs__leg-action-name');
    let legActionDesc: any = document.getElementsByClassName('creature-inputs__leg-action-desc');

    for (let i = 0; i < proficiencyName.length; i++) {
        if (proficiencyName[i].value !== '' || proficiencyValue[i].value !== '') {
            proficiencies.push({ name: proficiencyName[i].value, value: proficiencyValue[i].value });
        }
    }
    for (let i = 0; i < senseName.length; i++) {
        if (senseName[i].value !== '' || senseValue[i].value !== '') {
            senses.push({ name: senseName[i].value, value: senseValue[i].value });
        }
    }
    for (let i = 0; i < abilityName.length; i++) {
        if (abilityName[i].value !== '' || abilityDesc[i].value !== '') {
            abilities.push({ name: abilityName[i].value, desc: abilityDesc[i].value });
        }
    }
    for (let i = 0; i < actionName.length; i++) {
        if (actionName[i].value !== '' || actionDesc[i].value !== '') {
            actions.push({ name: actionName[i].value, desc: actionDesc[i].value });
        }
    }
    for (let i = 0; i < legActionName.length; i++) {
        if (legActionName[i].value !== '' || legActionDesc[i].value !== '') {
            legActions.push({ name: legActionName[i].value, desc: legActionDesc[i].value });
        }
    }
    return { proficiencies: proficiencies, senses: senses, abilities: abilities, actions: actions, legActions: legActions };
};

const getInputValues = () => {
    let creatureFormName, creatureFormSize = "medium", creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp, creatureFormWalk, creatureFormSwim, creatureFormBurrow, creatureFormFly, creatureFormClimb;
    creatureFormName = (<HTMLInputElement>document.getElementById('new-creature-input--name')).value;
    creatureFormSize = (<HTMLInputElement>document.getElementById('new-creature-input--size')).value;
    creatureFormType = (<HTMLInputElement>document.getElementById('new-creature-input--type')).value;
    creatureFormAlignment = (<HTMLInputElement>document.getElementById('new-creature-input--alignment')).value;
    creatureFormAc = (<HTMLInputElement>document.getElementById('new-creature-input--ac')).value;
    creatureFormHitPoints = (<HTMLInputElement>document.getElementById('new-creature-input--hit-points')).value;
    creatureFormHitDice = (<HTMLInputElement>document.getElementById('new-creature-input--hit-dice')).value;
    creatureFormStr = (<HTMLInputElement>document.getElementById('new-creature-input--str')).value;
    creatureFormDex = (<HTMLInputElement>document.getElementById('new-creature-input--dex')).value;
    creatureFormCon = (<HTMLInputElement>document.getElementById('new-creature-input--con')).value;
    creatureFormInt = (<HTMLInputElement>document.getElementById('new-creature-input--int')).value;
    creatureFormWis = (<HTMLInputElement>document.getElementById('new-creature-input--wis')).value;
    creatureFormChar = (<HTMLInputElement>document.getElementById('new-creature-input--char')).value;
    creatureFormVul = (<HTMLInputElement>document.getElementById('new-creature-input--vul')).value;
    creatureFormRes = (<HTMLInputElement>document.getElementById('new-creature-input--res')).value;
    creatureFormDmgImmune = (<HTMLInputElement>document.getElementById('new-creature-input--dmg-immune')).value;
    creatureFormConImmune = (<HTMLInputElement>document.getElementById('new-creature-input--dmg-immune')).value;
    creatureFormLanguages = (<HTMLInputElement>document.getElementById('new-creature-input--languages')).value;
    creatureFormCr = (<HTMLInputElement>document.getElementById('new-creature-input--cr')).value;
    creatureFormXp = (<HTMLInputElement>document.getElementById('new-creature-input--xp')).value;
    creatureFormWalk = (<HTMLInputElement>document.getElementById('new-creature-input--walk')).value;
    creatureFormSwim = (<HTMLInputElement>document.getElementById('new-creature-input--swim')).value;
    creatureFormBurrow = (<HTMLInputElement>document.getElementById('new-creature-input--burrow')).value;
    creatureFormFly = (<HTMLInputElement>document.getElementById('new-creature-input--fly')).value;
    creatureFormClimb = (<HTMLInputElement>document.getElementById('new-creature-input--climb')).value;
    return { creatureFormName: creatureFormName, creatureFormSize: creatureFormSize, creatureFormType: creatureFormType, creatureFormAlignment: creatureFormAlignment, creatureFormAc: creatureFormAc, creatureFormHitPoints: creatureFormHitPoints, creatureFormHitDice: creatureFormHitDice, creatureFormStr: creatureFormStr, creatureFormDex: creatureFormDex, creatureFormCon: creatureFormCon, creatureFormInt: creatureFormInt, creatureFormWis: creatureFormWis, creatureFormChar: creatureFormChar, creatureFormVul: creatureFormVul, creatureFormRes: creatureFormRes, creatureFormDmgImmune: creatureFormDmgImmune, creatureFormConImmune: creatureFormConImmune, creatureFormLanguages: creatureFormLanguages, creatureFormCr: creatureFormCr, creatureFormXp: creatureFormXp, creatureFormWalk: creatureFormWalk, creatureFormSwim: creatureFormSwim, creatureFormBurrow: creatureFormBurrow, creatureFormFly: creatureFormFly, creatureFormClimb: creatureFormClimb };
};

class CreatureFormData {
    index;
    image;
    name;
    size;
    type;
    alignment;
    ac;
    hp;
    hitDice;
    str;
    dex;
    con;
    int;
    wis;
    char;
    vul;
    res;
    dmgImmune;
    conImmune;
    languages;
    cr;
    xp;
    speeds;
    proficiencies;
    senses;
    abilities;
    actions;
    legActions;
    walk;
    swim;
    burrow;
    fly;
    climb;

    constructor(index, image, name, size, type, alignment, ac, hp, hitDice, str, dex, con, int, wis, char, vul, res, dmgImmune, conImmune, languages, cr, xp, walk, swim, burrow, fly, climb, proficiencies, senses, abilities, actions, legActions) {
        this.index = index;
        this.image = image;        
        this.name = name;
        this.size = size;
        this.type = type;
        this.alignment = alignment;
        ac || ac === 0 ? this.ac = ac : this.ac = 0;
        hp || hp === 0 ? this.hp = hp : this.hp = 0;
        this.hitDice = hitDice;
        str || str === 0 ? this.str = str : this.str = 10;
        dex || dex === 0 ? this.dex = dex : this.dex = 10;
        con || con === 0 ? this.con = con : this.con = 10;
        int || int === 0 ? this.int = int : this.int = 10;
        wis || wis === 0 ? this.wis = wis : this.wis = 10;
        char || char === 0 ? this.char = char : this.char = 10;
        this.vul = vul;
        this.res = res;
        this.dmgImmune = dmgImmune;
        this.conImmune = conImmune;
        this.languages = languages;
        this.cr = cr;
        this.xp = xp;
        this.walk = walk;
        this.swim = swim;
        this.fly = fly;
        this.burrow = burrow;
        this.climb = climb;
        this.proficiencies = proficiencies;
        this.senses = senses;
        this.abilities = abilities;
        this.actions = actions;
        this.legActions = legActions;
    }
}
