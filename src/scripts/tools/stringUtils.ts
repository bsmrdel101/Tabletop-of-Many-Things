// Would turn "Creature Name" into "creature-name"
export const indexConverter = (text: string) => {
    return text.replace(/\s+/g, '-').toLowerCase();
};

// Removes ft and turns returns a number value
export const removeUnitFromString = (string: string) => {
    if (string) return parseInt(string.split(' ')[0]);
};

// Remove duplicate data from the database
export const removeExtraCustomData = (array, name) => {
    let result = [];
    if (name) {
        // Loop through array with objects
        for (let i = 0; i < array.length - 1; i++) {
            if (!result.some((item) => array[i].name === item.name)) {
                result.push(array[i]);
            }
        }
    } else {
        // Loops through array normally
        for (let i = 0; i < array.length - 1; i++) {
            if (!result.some((item) => array[i] === item)) {
                result.push(array[i]);
            }
        }
    }
    return result;
};
