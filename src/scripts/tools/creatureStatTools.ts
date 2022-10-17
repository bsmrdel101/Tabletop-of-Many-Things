// Returns a string without the square brackets, and array with action rolls
export const getActionDesc = (_string: string) => {
    let string = _string
    let rolls = [];
    let toHit = '';

    // Checks if there is an attack bonus
    while (string.includes('{{')) {
        toHit = string.split('{{')[1].split('}}')[0];
        string = string.replace('{{', '').replace('}}', '');
    }

    while(toHit.includes('+')) {
        toHit = toHit.replace('+', '');
    }

    // Modifies string to get dmg rolls, and description with the brackets
    while (string.includes('[[')) {
        rolls.push(string.split('[[')[1].split(']]')[0]);
        string = string.replace('[[', '').replace(']]', '');
    }
    return {rolls: rolls, desc: string, toHit: toHit};
};

// Splits and returns an attack damage rolls
export const separateDmgRoll = (dmg: string) => {
    const [ damageDice, damageType ] = dmg.split(' ');
    return { damageDice, damageType };
};

// Separates the string for skills/saving throws and splits them into their name and value 
export const separateProf = (string: string, value: string, name: string) => {
    const save = string.split('Saving Throw: ');
    const skill = string.split('Skill: ');
    
    if (save[0] === '') {
        const name = save[1].split(value);
        return name[0].toString();
    } else if (skill[0] === '') {
        const name = skill[1].split(value);
        return name[0].toString();
    } 
    return name;
};
