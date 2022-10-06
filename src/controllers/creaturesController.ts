// import axios from "axios";

// export let creatures: Creature[];

// // === GET routes === //

// const getCreatures = async () => {
//     try {
//         const res = await axios.get('https://www.dnd5eapi.co/api/monsters');
//         creatures = res.data.results;
//     } catch (err) {
//         console.log(err);
//     }
// };

// const getCreatureByIndex = async (index: string, custom: boolean) => {
//     try {
//         if (custom) {
//             const res = await axios.get(`/api/creatures/${index}`);
//             return modifyResponseCreature(res);
//         } else {
//             const res = await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
//             return modifyResponseStandardCreature(res);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// const modifyResponseStandardCreature = (res) => {
//     // Gets all the arrays of creature data
//     const { proficiencies, condition_immunities, senses, special_abilities, actions, legendary_actions } = separateStandardCreatureResponse(res.data);
//     const modifiedRes = new Creature(
//         null,
//         null,
//         res.data.index,
//         res.data.name,
//         res.data.size,
//         res.data.type,
//         res.data.alignment,
//         res.data.armor_class,
//         res.data.hit_points,
//         res.data.hit_dice,
//         res.data.strength,
//         res.data.dexterity,
//         res.data.constitution,
//         res.data.intelligence,
//         res.data.wisdom,
//         res.data.charisma,
//         res.data.challenge_rating,
//         res.data.xp,
//         res.data.languages,
//         removeUnitFromString(res.data.speed.walk),
//         removeUnitFromString(res.data.speed.swim),
//         removeUnitFromString(res.data.speed.burrow),
//         removeUnitFromString(res.data.speed.fly),
//         removeUnitFromString(res.data.speed.climb),
//         proficiencies,
//         res.data.damage_vulnerabilities,
//         res.data.damage_resistances,
//         res.data.damage_immunities,
//         condition_immunities,
//         senses,
//         special_abilities,
//         actions,
//         legendary_actions
//     );
//     console.log(modifiedRes);
//     return modifiedRes;
// };

// function separateStandardCreatureResponse(res) {
//     const proficiencies = getCreatureProficiencies(res.proficiencies);
//     const condition_immunities = getCreatureConditionImmunities(res.condition_immunities);
//     const senses = getCreatureSenses(res.senses);
//     const special_abilities = getCreatureAbilities(res.special_abilities);
//     const actions = getCreatureActions(res.actions);
//     const legendary_actions = getCreatureLegendaryActions(res.legendary_actions);

//     return {proficiencies: proficiencies, condition_immunities: condition_immunities, senses: senses, special_abilities: special_abilities, actions: actions, legendary_actions: legendary_actions};
// };

// function getCreatureProficiencies(_proficiencies) {
//     let proficiencies = [];
//     if (_proficiencies.length > 0) {
//         _proficiencies.forEach((prof) => {
//             proficiencies.push({name: prof.proficiency.name, value: prof.value});
//         });
//     }
//     return proficiencies;
// };

// function getCreatureConditionImmunities(_condition_immunities) {
//     let condition_immunities = [];
//     if (_condition_immunities.length > 0) {
//         _condition_immunities.forEach((immunity) => {
//             condition_immunities.push(immunity.name);
//         });
//     }
//     return condition_immunities;
// };

// function getCreatureSenses(_senses) { 
//     let senses = [];   
//     if (_senses.darkvision) senses.push({name: 'Darkvision', value: removeUnitFromString(_senses.darkvision)});
//     if (_senses.blindsight) senses.push({name: 'Blindsight', value: removeUnitFromString(_senses.blindsight)});
//     if (_senses.tremorsense) senses.push({name: 'Tremorsense', value: removeUnitFromString(_senses.tremorsense)});
//     if (_senses.truesight) senses.push({name: 'Truesight', value: removeUnitFromString(_senses.truesight)});
//     if (_senses.passive_perception) senses.push({name: 'Passive Perception', value: _senses.passive_perception});
//     return senses;
// };

// function getCreatureAbilities(_special_abilities) {
//     let special_abilities = [];
//     if (_special_abilities.length > 0) {
//         _special_abilities.forEach((ability) => {
//             special_abilities.push({name: ability.name, desc: ability.desc, damage: standardCreatureDamage(ability.damage)});
//         });
//     }
//     return special_abilities;
// };

// function getCreatureActions(_actions) {
//     let actions = [];
//     if (_actions.length > 0) {
//         _actions.forEach((action) => {
//             actions.push({name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage)});
//         });
//     }

//     return actions;
// };

// function getCreatureLegendaryActions(_legendary_actions) {
//     let legendary_actions = [];
//     if (_legendary_actions.length > 0) {
//         _legendary_actions.forEach((action) => {
//             legendary_actions.push({name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage)});
//         });
//     }
//     return legendary_actions;
// };

// // Gets the damage dice and damage type from a standard creature
// function standardCreatureDamage(damage) {
//     let damages = [];
//     if (damage) {
//         damage.forEach((dmg) => {
//             if (dmg.from) {
//                 dmg.from.options.forEach((dmg) => {
//                     damages.push({damageDice: dmg.damage_dice, damageType: dmg.damage_type.index});
//                 });
//             } else {
//                 damages.push({damageDice: dmg.damage_dice, damageType: dmg.damage_type.index});
//             }
//         });
//     }
//     return damages;
// };

// // Removes ft and turns returns a number value
// function removeUnitFromString(string) {
//     let value = '';
//     if (string) {
//         value = parseInt(string.split(' ')[0]);
//         return value;
//     }
// };

// function modifyResponseCreature(res) {
//     // Gets all the arrays of creature data
//     const { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = separateCreatureResponse(res.data);

//     const modifiedRes = new Creature(
//         res.data[0].id,
//         res.data[0].user_id,
//         res.data[0].index,
//         res.data[0].name,
//         res.data[0].size,
//         res.data[0].type,
//         res.data[0].alignment,
//         res.data[0].ac,
//         res.data[0].hit_points,
//         res.data[0].hit_dice,
//         res.data[0].str,
//         res.data[0].dex,
//         res.data[0].con,
//         res.data[0].int,
//         res.data[0].wis,
//         res.data[0].char,
//         res.data[0].cr,
//         res.data[0].xp,
//         res.data[0].list,
//         res.data[0].walk_speed,
//         res.data[0].swim_speed,
//         res.data[0].burrow_speed,
//         res.data[0].fly_speed,
//         res.data[0].climb_speed,
//         proficiencies,
//         vulnerabilities,
//         resistances,
//         damageImmunities,
//         conditionImmunities,
//         senses,
//         abilities,
//         actions,
//         legActions
//     );
//     console.log(modifiedRes);
//     return modifiedRes;
// };

// // Separate different parts of the response into arrays
// function separateCreatureResponse(res) {
//     let { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = getInitialCreatureArrays(res);
    
//     proficiencies = removeExtraCustomData(proficiencies, true);
//     vulnerabilities = removeExtraCustomData(vulnerabilities);
//     resistances = removeExtraCustomData(resistances);
//     damageImmunities = removeExtraCustomData(damageImmunities);
//     conditionImmunities = removeExtraCustomData(conditionImmunities);
//     senses = removeExtraCustomData(senses, true);
//     abilities = removeExtraCustomData(abilities, true);
//     actions = removeExtraCustomData(actions, true);
//     legActions = removeExtraCustomData(legActions, true);

//     // Get ability rolls
//     let modifiedAbilities = [];
//     abilities.forEach((ability) => {
//         if (ability.name && ability.desc) {
//             const abilityData = getActionDesc(ability.desc);
//             modifiedAbilities.push({name: ability.name, desc: abilityData.desc, damage: [separateDmgRoll(abilityData.rolls.toString())]});
//         }
//     });
//     abilities = modifiedAbilities;

//     // Get action rolls
//     let modifiedActions = [];
//     actions.forEach((action) => {
//         if (action.name && action.desc) {
//             const actionData = getActionDesc(action.desc);
//             modifiedActions.push({name: action.name, desc: actionData.desc, attack_bonus: actionData.toHit, damage: [separateDmgRoll(actionData.rolls.toString())]});
//         }
//     });
//     actions = modifiedActions;

//     // Get legendary action rolls
//     let modifiedLegActions = [];
//     legActions.forEach((action) => {
//         if (action.name && action.desc) {
//             const legActionData = getActionDesc(action.desc);
//             modifiedLegActions.push({name: action.name, desc: legActionData.desc, attack_bonus: legActionData.toHit, damage: [separateDmgRoll(legActionData.rolls.toString())]});
//         }
//     });
//     legActions = modifiedLegActions;

//     const {_proficiencies, _resistances, _vulnerabilities, _senses} = emptyNullArrays(proficiencies, resistances, vulnerabilities, senses);
//     return {proficiencies: _proficiencies, vulnerabilities: _vulnerabilities, resistances: _resistances, damageImmunities: damageImmunities, conditionImmunities: conditionImmunities, senses: _senses, abilities: abilities, actions: actions, legActions: legActions};
// };

// // Pushes all creatures data into their respective arrays and returns them.
// function getInitialCreatureArrays(res) {
//     let proficiencies = [];
//     let vulnerabilities = [];
//     let resistances = [];
//     let damageImmunities = [];
//     let conditionImmunities = [];
//     let senses = [];
//     let abilities = [];
//     let actions = [];
//     let legActions = [];

//     for (let stat of res) {
//         proficiencies.push({name: stat.prof_name, value: stat.prof_value});
//         vulnerabilities.push(stat.vul_name);
//         resistances.push(stat.res_name);
//         senses.push({name: stat.sense_name, value: stat.sense_value});
//         abilities.push({name: stat.ability_name, desc: stat.ability_desc});
//         actions.push({name: stat.action_name, desc: stat.action_desc});
//         legActions.push({name: stat.leg_action_name, desc: stat.leg_action_desc});

//         if (stat.immune_type === 'damage') {
//             damageImmunities.push(stat.immune_name);
//         } else if (stat.immune_type === 'condition') {
//             conditionImmunities.push(stat.immune_name);
//         }
//     }
//     return {proficiencies: proficiencies, vulnerabilities: vulnerabilities, resistances: resistances, damageImmunities: damageImmunities, conditionImmunities: conditionImmunities, senses: senses, abilities: abilities, actions: actions, legActions: legActions};
// };

// // Make sure arrays that have no values are empty, and don't have null values in it.
// function emptyNullArrays(proficiencies, resistances, vulnerabilities, senses) {
//     if (proficiencies.length > 0) {
//         let exists = false;
//         proficiencies.forEach((prof) => {
//             if (prof.name && prof.value) exists = true;
//         });
//         if (!exists) proficiencies = [];
//     }
//     if (resistances.length > 0) {
//         let exists = false;
//         resistances.forEach((resistance) => {
//             if (resistance) exists = true;
//         });
//         if (!exists) resistances = [];
//     }
//     if (vulnerabilities.length > 0) {
//         let exists = false;
//         vulnerabilities.forEach((vul) => {
//             if (vul) exists = true;
//         });
//         if (!exists) vulnerabilities = [];
//     }
//     if (senses.length > 0) {
//         let exists = false;
//         senses.forEach((sense) => {
//             if (sense.name && sense.value) exists = true;
//         });
//         if (!exists) senses = [];
//     }
//     return {_proficiencies: proficiencies, _resistances: resistances, _vulnerabilities: vulnerabilities, _senses: senses};
// };

// // Remove duplicate data from the database
// function removeExtraCustomData(array, name) {
//     let result = [];
//     if (name) {
//         // Loop through array with objects
//         for (let i = 0; i < array.length - 1; i++) {
//             if (!result.some((item) => array[i].name === item.name)) {
//                 result.push(array[i]);
//             }
//         }
//     } else {
//         // Loops through array normally
//         for (let i = 0; i < array.length - 1; i++) {
//             if (!result.some((item) => array[i] === item)) {
//                 result.push(array[i]);
//             }
//         }
//     }
//     return result;
// };

// const getCustomCreatures() {
//     try {
//         const res = await axios.get('/api/creatures');
//         customCreatures = res.data;
//     } catch (err) {
//         console.log(err);
//     }
// };

// // === POST routes === //

// const addCreature = async (payload) => {
//     console.log(payload);
//     try {
//         let creatureId;
//         // Create creature base stats
//         await axios.post('/api/creatures', payload);
//         // Get id of the creature that was just made
//         const res = await axios.get('/api/creatures');
//         creatureId = res.data[res.data.length - 1].id;

//         // Add the rest of the creature data
//         for (let prof of payload.proficiencies) {
//             await axios.post('/api/creatures/prof', {id: creatureId, data: {name: prof.name, value: prof.value}});
//         }
//         if (payload.proficiencies.length === 0) await axios.post('/api/creatures/prof', {id: creatureId, data: {name: null, value: null}});

//         await axios.post('/api/creatures/vul', {id: creatureId, data: {name: payload.vul}});
//         await axios.post('/api/creatures/res', {id: creatureId, data: {name: payload.res}});
//         await axios.post('/api/creatures/immunities', {id: creatureId, data: {dmgImmune: true, name: payload.dmgImmune}});
//         await axios.post('/api/creatures/immunities', {id: creatureId, data: {conImmune: true, name: payload.conImmune}});
//         for (let sense of payload.senses) {
//             await axios.post('/api/creatures/senses', {id: creatureId, data: {name: sense.name, value: sense.value}});
//         }
//         if (payload.senses.length === 0) await axios.post('/api/creatures/senses', {id: creatureId, data: {name: null, value: null}});

//         await axios.post('/api/creatures/languages', {id: creatureId, data: {name: payload.languages}});
//         for (let ability of payload.abilities) {
//             await axios.post('/api/creatures/abilities', {id: creatureId, data: {name: ability.name, desc: ability.desc}});
//         }
//         if (payload.abilities.length === 0) await axios.post('/api/creatures/abilities', {id: creatureId, data: {name: null, desc: null}});

//         for (let action of payload.actions) {
//             await axios.post('/api/creatures/actions', {id: creatureId, data: {name: action.name, desc: action.desc}});
//         }
//         if (payload.actions.length === 0) await axios.post('/api/creatures/actions', {id: creatureId, data: {name: null, desc: null}});

//         for (let action of payload.legActions) {
//             await axios.post('/api/creatures/leg-actions', {id: creatureId, data: {name: action.name, desc: action.desc}});
//         }
//         if (payload.legActions.length === 0) await axios.post('/api/creatures/leg-actions', {id: creatureId, data: {name: null, desc: null}});

//     } catch (err) {
//         console.log(err);
//     }
// };

// class Creature {
//     id: number
//     user_id: number
//     index: string
//     name: string
//     size: number
//     type: string
//     alignment: string
//     ac: number
//     hit_points: number
//     hit_dice: string
//     str: number
//     dex: number
//     con: number
//     int: number
//     wis: number
//     char: number
//     cr: number
//     xp: number
//     languages: any
//     speeds: any
//     proficiencies: any
//     vulnerabilities: any
//     resistances: any
//     damageImmunities: any
//     conditionImmunities: any
//     senses: any
//     abilities: any
//     actions: any
//     legActions: any

//     constructor (id: number, user_id: number, index: string, name: string, size: number, type: string, alignment: string, ac: number, hit_points: number, hit_dice: string, str: number, dex: number, con: number, int: number, wis: number, char: number, cr: number, xp: number, languages: any, walk_speed: number, swim_speed: number, burrow_speed: number, fly_speed: number, climb_speed: number, proficiencies: any, vulnerabilities: any, resistances: any, damageImmunities: any, conditionImmunities: any, senses: any, abilities: any, actions: any, legActions: any) {
//         this.id = id;
//         this.user_id = user_id;
//         this.index = index;
//         this.name = name;
//         this.size = size;
//         this.type = type;
//         this.alignment = alignment;
//         this.ac = ac;
//         this.hit_points = hit_points;
//         this.hit_dice = hit_dice;
//         this.str = str;
//         this.dex = dex;
//         this.con = con;
//         this.int = int;
//         this.wis = wis;
//         this.char = char;
//         this.cr = cr;
//         this.xp = xp;
//         this.languages = languages;
//         this.speeds = [
//             {name: 'Walk', value: walk_speed},
//             {name: 'Swim', value: swim_speed},
//             {name: 'Burrow', value: burrow_speed},
//             {name: 'Fly', value: fly_speed},
//             {name: 'Climb', value: climb_speed}
//         ],
//         this.proficiencies = proficiencies;
//         this.vulnerabilities = vulnerabilities;
//         this.resistances = resistances;
//         this.damageImmunities = damageImmunities;
//         this.conditionImmunities = conditionImmunities;
//         this.senses = senses;
//         this.abilities = abilities;
//         this.actions = actions;
//         this.legActions = legActions;
//     }
// }

// // === DELETE routes === //

// // const deleteCreature = async (index) => {
// //     try {
// //         await axios.delete(`/api/creatures/${index}`);
// //         if (creaturesOpen) {
// //             toggleCreaturesWindow();
// //             toggleCreaturesWindow();
// //         }
// //     } catch (err) {
// //         console.log(err);
// //     }
// // };
