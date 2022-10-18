import { separateProf } from "./tools/statTools";
import { Creature } from "./types";

export const getCreatureSpeedData = (creature: Creature) => {
    let speeds = [];
    creature.speeds.forEach((speed) => {
        if (speed.value) {
            speeds.push(speed);
        }
    });
    return speeds;
};

export const getCreatureScoresData = (creature: Creature) => {
    let scoreNames = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Char'];
    let scoreValues = [
        creature.str,
        creature.dex,
        creature.con,
        creature.int,
        creature.wis,
        creature.char
    ];
    return { scoreNames: scoreNames, scoreValues: scoreValues };
};

export const getCreatureProficiencyData = (creature: Creature) => {
    let otherSkills = [];
    let proficiencies = '', skills = '';

    creature.proficiencies.forEach((proficiency) => {
        const modifiedProf = separateProf(proficiency.name + proficiency.value, proficiency.value, proficiency.name);
        if (proficiency.name.includes('Saving')) {
            proficiencies += ` ${modifiedProf} +${proficiency.value},`;
        } else {
            otherSkills.push({name: modifiedProf, value: proficiency.value});
        }
    });
    proficiencies = proficiencies.replace(/,*$/, '');
    otherSkills.forEach((skill) => {
        skills += ` ${skill.name} +${skill.value},`;
    });
    skills = skills.replace(/,*$/, '');
    return { proficiencies: proficiencies, skills: skills };
};

export const getCreatureVulResData = (creature: Creature) => {
    let vul = getVulnerabilities(creature);
    let res = getResistances(creature);
    let dmgImmune = getDmgImmune(creature);
    let conImmune = getConImmune(creature);
    return { vul: vul, res: res, dmgImmune: dmgImmune, conImmune: conImmune };
};

const getVulnerabilities = (creature: Creature) => {
    if (creature.vulnerabilities.length > 0) {
        let string = '';
        creature.vulnerabilities.forEach((stat) => {
            string += ` ${stat},`;
        });
        return string.replace(/,*$/, '');
    }
    return '';
};

const getResistances = (creature: Creature) => {
    if (creature.resistances.length > 0) {
        let string = '';
        creature.resistances.forEach((stat) => {
            string += ` ${stat},`;
        });
        return string.replace(/,*$/, '');
    }
    return '';
};

const getDmgImmune = (creature: Creature) => {
    if (creature.damageImmunities.length > 0) {
        let string = '';
        creature.damageImmunities.forEach((stat) => {
            string += ` ${stat},`;
        });
        return string.replace(/,*$/, '');
    }
    return '';
};

const getConImmune = (creature: Creature) => {
    if (creature.conditionImmunities.length > 0) {
        let string = '';
        creature.conditionImmunities.forEach((stat) => {
            string += ` ${stat},`;
        });
        return string.replace(/,*$/, '');
    }
    return '';
};

export const getCreatureSensesData = (creature: Creature) => {
    let string = '';
    creature.senses.forEach((sense) => {
        if (sense.name.includes('passive') || sense.name.includes('Passive')) {
            string += ` ${sense.name} ${sense.value},`;
        } else {
            string += ` ${sense.name} ${sense.value} ft.,`;
        }
    });
    return string.replace(/,*$/, '');
};
