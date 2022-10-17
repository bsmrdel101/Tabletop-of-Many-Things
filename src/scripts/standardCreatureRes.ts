import { removeUnitFromString } from "./tools/stringUtils";

export const separateStandardCreatureResponse = (res) => {
    const proficiencies = getCreatureProficiencies(res.proficiencies);
    const condition_immunities = getCreatureConditionImmunities(res.condition_immunities);
    const senses = getCreatureSenses(res.senses);
    const special_abilities = getCreatureAbilities(res.special_abilities);
    const actions = getCreatureActions(res.actions);
    const legendary_actions = getCreatureLegendaryActions(res.legendary_actions);

    return { proficiencies: proficiencies, condition_immunities: condition_immunities, senses: senses, special_abilities: special_abilities, actions: actions, legendary_actions: legendary_actions };
};

export const getCreatureProficiencies = (_proficiencies) => {
    let proficiencies = [];
    if (_proficiencies.length > 0) {
        _proficiencies.forEach((prof) => {
            proficiencies.push({name: prof.proficiency.name, value: prof.value});
        });
    }
    return proficiencies;
};

export const getCreatureConditionImmunities = (_condition_immunities) => {
    let condition_immunities = [];
    if (_condition_immunities.length > 0) {
        _condition_immunities.forEach((immunity) => {
            condition_immunities.push(immunity.name);
        });
    }
    return condition_immunities;
};

export const getCreatureSenses = (_senses) => { 
    let senses = [];   
    if (_senses.darkvision) senses.push({name: 'Darkvision', value: removeUnitFromString(_senses.darkvision)});
    if (_senses.blindsight) senses.push({name: 'Blindsight', value: removeUnitFromString(_senses.blindsight)});
    if (_senses.tremorsense) senses.push({name: 'Tremorsense', value: removeUnitFromString(_senses.tremorsense)});
    if (_senses.truesight) senses.push({name: 'Truesight', value: removeUnitFromString(_senses.truesight)});
    if (_senses.passive_perception) senses.push({name: 'Passive Perception', value: _senses.passive_perception});
    return senses;
};

export const getCreatureAbilities = (_special_abilities) => {
    let special_abilities = [];
    if (_special_abilities.length > 0) {
        _special_abilities.forEach((ability) => {
            special_abilities.push({name: ability.name, desc: ability.desc, damage: standardCreatureDamage(ability.damage)});
        });
    }
    return special_abilities;
};

export const getCreatureActions = (_actions) => {
    let actions = [];
    if (_actions.length > 0) {
        _actions.forEach((action) => {
            actions.push({name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage)});
        });
    }

    return actions;
};

export const getCreatureLegendaryActions = (_legendary_actions) => {
    let legendary_actions = [];
    if (_legendary_actions.length > 0) {
        _legendary_actions.forEach((action) => {
            legendary_actions.push({name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage)});
        });
    }
    return legendary_actions;
};

// Gets the damage dice and damage type from a standard creature
export const standardCreatureDamage = (damage) => {
    let damages = [];
    if (damage) {
        damage.forEach((dmg) => {
            if (dmg.from) {
                dmg.from.options.forEach((dmg) => {
                    damages.push({damageDice: dmg.damage_dice, damageType: dmg.damage_type.index});
                });
            } else {
                damages.push({damageDice: dmg.damage_dice, damageType: dmg.damage_type.index});
            }
        });
    }
    return damages;
};
