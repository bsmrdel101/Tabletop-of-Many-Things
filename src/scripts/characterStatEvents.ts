import { character, setHealth, setTempHealth } from "../controllers/charactersController";

const characterInspirationIcon = (inspired: boolean) => {
    if (inspired) {
        return `<img class="inspiration-icon" src="../images/star-filled.png" draggable="false">`;
    } else {
        return `<img class="inspiration-icon" src="../images/star-empty.png" draggable="false">`;
    }
};

export const damageHp = (value: number) => {
    const healthContainer = document.querySelector('.character-sheet__health');
    const tempHealthContainer = document.querySelector('.character-sheet__health--temp');
    let dmgAmount = value;
    let tmpHpValue = character.temp_health;
    tmpHpValue -= dmgAmount;
    if (tmpHpValue < 0) tmpHpValue = 0;
    dmgAmount -= character.temp_health;
    if (dmgAmount < 0) dmgAmount = 0;
    const newHealth = character.current_health - dmgAmount;
    
    setTempHealth({ id: character.id, health: tmpHpValue });
    setHealth({ id: character.id, health: newHealth });
    healthContainer.innerHTML = '';
    tempHealthContainer.innerHTML = '';
    healthContainer.insertAdjacentHTML('beforeend', `
        <p class="hp"><img src="../images/heart-red.png">${newHealth} / ${character.max_health}</p>
    `);
    tempHealthContainer.insertAdjacentHTML('beforeend', `
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${tmpHpValue}</p>
    `);
    (<HTMLInputElement>document.getElementById('dmg-player-hp-input')).value = '';
};

export const healHp = (value: number) => {
    const elmt = document.querySelector('.character-sheet__health');
    const healAmount = value;
    let newHealth = character.current_health + healAmount;
    if (newHealth > character.max_health) {
        newHealth = character.max_health;
        setHealth({ id: character.id, health: newHealth });
    } else {
        setHealth({ id: character.id, health: newHealth });
    }

    elmt.innerHTML = '';
    elmt.insertAdjacentHTML('beforeend', `
        <p class="hp"><img src="../images/heart-red.png">${newHealth} / ${character.max_health}</p>
    `);
    (<HTMLInputElement>document.getElementById('heal-player-hp-input')).value = '';
};

export const addTempHp = (value: number) => {
    const elmt = document.querySelector('.character-sheet__health--temp');
    const newTempHealth = character.temp_health + value;
    setTempHealth({ id: character.id, health: newTempHealth });
    elmt.innerHTML = '';
    elmt.insertAdjacentHTML('beforeend', `
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${newTempHealth}</p>
    `);
    (<HTMLInputElement>document.getElementById('temp-player-hp-input')).value = '';
};
