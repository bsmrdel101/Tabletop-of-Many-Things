import { getActionDesc, separateDmgRoll } from "./tools/creatureStatTools";
import { removeExtraCustomData } from "./tools/stringUtils";

// Separate different parts of the response into arrays
export const separateCreatureResponse = (res) => {
    let { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = getInitialCreatureArrays(res);
    
    proficiencies = removeExtraCustomData(proficiencies, true);
    vulnerabilities = removeExtraCustomData(vulnerabilities, false);
    resistances = removeExtraCustomData(resistances, false);
    damageImmunities = removeExtraCustomData(damageImmunities, false);
    conditionImmunities = removeExtraCustomData(conditionImmunities, false);
    senses = removeExtraCustomData(senses, true);
    abilities = removeExtraCustomData(abilities, true);
    actions = removeExtraCustomData(actions, true);
    legActions = removeExtraCustomData(legActions, true);

    // Get ability rolls
    let modifiedAbilities = [];
    abilities.forEach((ability) => {
        if (ability.name && ability.desc) {
            const abilityData = getActionDesc(ability.desc);
            modifiedAbilities.push({ name: ability.name, desc: abilityData.desc, damage: [separateDmgRoll(abilityData.rolls.toString())] });
        }
    });
    abilities = modifiedAbilities;

    // Get action rolls
    let modifiedActions = [];
    actions.forEach((action) => {
        if (action.name && action.desc) {
            const actionData = getActionDesc(action.desc);
            modifiedActions.push({ name: action.name, desc: actionData.desc, attack_bonus: actionData.toHit, damage: [separateDmgRoll(actionData.rolls.toString())] });
        }
    });
    actions = modifiedActions;

    // Get legendary action rolls
    let modifiedLegActions = [];
    legActions.forEach((action) => {
        if (action.name && action.desc) {
            const legActionData = getActionDesc(action.desc);
            modifiedLegActions.push({ name: action.name, desc: legActionData.desc, attack_bonus: legActionData.toHit, damage: [separateDmgRoll(legActionData.rolls.toString())] });
        }
    });
    legActions = modifiedLegActions;

    const { _proficiencies, _resistances, _vulnerabilities, _senses } = emptyNullArrays(proficiencies, resistances, vulnerabilities, senses);
    return { proficiencies: _proficiencies, vulnerabilities: _vulnerabilities, resistances: _resistances, damageImmunities: damageImmunities, conditionImmunities: conditionImmunities, senses: _senses, abilities: abilities, actions: actions, legActions: legActions };
};

// Pushes all creatures data into their respective arrays and returns them.
export const getInitialCreatureArrays = (res) => {
    let proficiencies = [];
    let vulnerabilities = [];
    let resistances = [];
    let damageImmunities = [];
    let conditionImmunities = [];
    let senses = [];
    let abilities = [];
    let actions = [];
    let legActions = [];

    for (let stat of res) {
        proficiencies.push({name: stat.prof_name, value: stat.prof_value});
        vulnerabilities.push(stat.vul_name);
        resistances.push(stat.res_name);
        senses.push({name: stat.sense_name, value: stat.sense_value});
        abilities.push({name: stat.ability_name, desc: stat.ability_desc});
        actions.push({name: stat.action_name, desc: stat.action_desc});
        legActions.push({name: stat.leg_action_name, desc: stat.leg_action_desc});

        if (stat.immune_type === 'damage') {
            damageImmunities.push(stat.immune_name);
        } else if (stat.immune_type === 'condition') {
            conditionImmunities.push(stat.immune_name);
        }
    }
    return { proficiencies: proficiencies, vulnerabilities: vulnerabilities, resistances: resistances, damageImmunities: damageImmunities, conditionImmunities: conditionImmunities, senses: senses, abilities: abilities, actions: actions, legActions: legActions };
};

// Make sure arrays that have no values are empty, and don't have null values in it.
export const emptyNullArrays = (proficiencies, resistances, vulnerabilities, senses) => {
    if (proficiencies.length > 0) {
        let exists = false;
        proficiencies.forEach((prof) => {
            if (prof.name && prof.value) exists = true;
        });
        if (!exists) proficiencies = [];
    }
    if (resistances.length > 0) {
        let exists = false;
        resistances.forEach((resistance) => {
            if (resistance) exists = true;
        });
        if (!exists) resistances = [];
    }
    if (vulnerabilities.length > 0) {
        let exists = false;
        vulnerabilities.forEach((vul) => {
            if (vul) exists = true;
        });
        if (!exists) vulnerabilities = [];
    }
    if (senses.length > 0) {
        let exists = false;
        senses.forEach((sense) => {
            if (sense.name && sense.value) exists = true;
        });
        if (!exists) senses = [];
    }
    return { _proficiencies: proficiencies, _resistances: resistances, _vulnerabilities: vulnerabilities, _senses: senses };
};
