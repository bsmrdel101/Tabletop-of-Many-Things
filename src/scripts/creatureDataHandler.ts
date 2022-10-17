import { removeUnitFromString } from "./tools/stringUtils";
import { separateStandardCreatureResponse } from "./standardCreatureRes";
import { separateCreatureResponse } from "./customCreatureRes";

export const modifyResponseStandardCreature = (res) => {
    // Gets all the arrays of creature data
    const { proficiencies, condition_immunities, senses, special_abilities, actions, legendary_actions } = separateStandardCreatureResponse(res.data);
    const modifiedRes = new Creature(
        null,
        null,
        res.data.index,
        res.data.name,
        res.data.size,
        res.data.type,
        res.data.alignment,
        res.data.armor_class,
        res.data.hit_points,
        res.data.hit_dice,
        res.data.strength,
        res.data.dexterity,
        res.data.constitution,
        res.data.intelligence,
        res.data.wisdom,
        res.data.charisma,
        res.data.challenge_rating,
        res.data.xp,
        res.data.languages,
        removeUnitFromString(res.data.speed.walk),
        removeUnitFromString(res.data.speed.swim),
        removeUnitFromString(res.data.speed.burrow),
        removeUnitFromString(res.data.speed.fly),
        removeUnitFromString(res.data.speed.climb),
        proficiencies,
        res.data.damage_vulnerabilities,
        res.data.damage_resistances,
        res.data.damage_immunities,
        condition_immunities,
        senses,
        special_abilities,
        actions,
        legendary_actions
    );
    return modifiedRes;
};

export const modifyResponseCreature = (res) => {
    // Gets all the arrays of creature data
    const { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = separateCreatureResponse(res.data);

    const modifiedRes = new Creature(
        res.data[0].id,
        res.data[0].user_id,
        res.data[0].index,
        res.data[0].name,
        res.data[0].size,
        res.data[0].type,
        res.data[0].alignment,
        res.data[0].ac,
        res.data[0].hit_points,
        res.data[0].hit_dice,
        res.data[0].str,
        res.data[0].dex,
        res.data[0].con,
        res.data[0].int,
        res.data[0].wis,
        res.data[0].char,
        res.data[0].cr,
        res.data[0].xp,
        res.data[0].list,
        res.data[0].walk_speed,
        res.data[0].swim_speed,
        res.data[0].burrow_speed,
        res.data[0].fly_speed,
        res.data[0].climb_speed,
        proficiencies,
        vulnerabilities,
        resistances,
        damageImmunities,
        conditionImmunities,
        senses,
        abilities,
        actions,
        legActions
    );
    return modifiedRes;
};

class Creature {
    id: number
    user_id: number
    index: string
    name: string
    size: number
    type: string
    alignment: string
    ac: number
    hit_points: number
    hit_dice: string
    str: number
    dex: number
    con: number
    int: number
    wis: number
    char: number
    cr: number
    xp: number
    languages: any
    speeds: any
    proficiencies: any
    vulnerabilities: any
    resistances: any
    damageImmunities: any
    conditionImmunities: any
    senses: any
    abilities: any
    actions: any
    legActions: any

    constructor (id: number, user_id: number, index: string, name: string, size: number, type: string, alignment: string, ac: number, hit_points: number, hit_dice: string, str: number, dex: number, con: number, int: number, wis: number, char: number, cr: number, xp: number, languages: any, walk_speed: number, swim_speed: number, burrow_speed: number, fly_speed: number, climb_speed: number, proficiencies: any, vulnerabilities: any, resistances: any, damageImmunities: any, conditionImmunities: any, senses: any, abilities: any, actions: any, legActions: any) {
        this.id = id;
        this.user_id = user_id;
        this.index = index;
        this.name = name;
        this.size = size;
        this.type = type;
        this.alignment = alignment;
        this.ac = ac;
        this.hit_points = hit_points;
        this.hit_dice = hit_dice;
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.char = char;
        this.cr = cr;
        this.xp = xp;
        this.languages = languages;
        this.speeds = [
            {name: 'Walk', value: walk_speed},
            {name: 'Swim', value: swim_speed},
            {name: 'Burrow', value: burrow_speed},
            {name: 'Fly', value: fly_speed},
            {name: 'Climb', value: climb_speed}
        ],
        this.proficiencies = proficiencies;
        this.vulnerabilities = vulnerabilities;
        this.resistances = resistances;
        this.damageImmunities = damageImmunities;
        this.conditionImmunities = conditionImmunities;
        this.senses = senses;
        this.abilities = abilities;
        this.actions = actions;
        this.legActions = legActions;
    }
}
