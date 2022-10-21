import axios from "axios";
import { modifyResponseCreature, modifyResponseStandardCreature } from "../scripts/creatureDataHandler";


// === GET routes === //

export const getCreatures = async () => {
    try {
        const res = await axios.get('https://www.dnd5eapi.co/api/monsters');
        return res.data.results;
    } catch (err) {
        console.log(err);
    }
};

export const getCreatureByIndex = async (index: string, custom: boolean) => {
    try {
        if (custom) {
            const res = await axios.get(`/api/creatures/${index}`);
            if (res.data.length === 0) return;
            return modifyResponseCreature(res);
        } else {
            const res = await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
            if (res.data.length === 0) return;
            return modifyResponseStandardCreature(res);
        }
    } catch (err) {
        console.log(err);
    }
};

export const getCustomCreatures = async () => {
    try {
        const res = await axios.get('/api/creatures');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// === POST routes === //

export const addCreature = async (payload) => {
    console.log(payload);
    try {
        // Create creature base stats
        await axios.post('/api/creatures', payload);
        // Get id of the creature that was just made
        const res = await axios.get('/api/creatures');
        let creatureId = res.data[res.data.length - 1].id;

        // Add the rest of the creature data
        for (let prof of payload.proficiencies) {
            await axios.post('/api/creatures/prof', {id: creatureId, data: {name: prof.name, value: prof.value}});
        }
        if (payload.proficiencies.length === 0) await axios.post('/api/creatures/prof', {id: creatureId, data: {name: null, value: null}});

        await axios.post('/api/creatures/vul', {id: creatureId, data: {name: payload.vul}});
        await axios.post('/api/creatures/res', {id: creatureId, data: {name: payload.res}});
        await axios.post('/api/creatures/immunities', {id: creatureId, data: {dmgImmune: true, name: payload.dmgImmune}});
        await axios.post('/api/creatures/immunities', {id: creatureId, data: {conImmune: true, name: payload.conImmune}});
        for (let sense of payload.senses) {
            await axios.post('/api/creatures/senses', {id: creatureId, data: {name: sense.name, value: sense.value}});
        }
        if (payload.senses.length === 0) await axios.post('/api/creatures/senses', {id: creatureId, data: {name: null, value: null}});

        await axios.post('/api/creatures/languages', {id: creatureId, data: {name: payload.languages}});
        for (let ability of payload.abilities) {
            await axios.post('/api/creatures/abilities', {id: creatureId, data: {name: ability.name, desc: ability.desc}});
        }
        if (payload.abilities.length === 0) await axios.post('/api/creatures/abilities', {id: creatureId, data: {name: null, desc: null}});

        for (let action of payload.actions) {
            await axios.post('/api/creatures/actions', {id: creatureId, data: {name: action.name, desc: action.desc}});
        }
        if (payload.actions.length === 0) await axios.post('/api/creatures/actions', {id: creatureId, data: {name: null, desc: null}});

        for (let action of payload.legActions) {
            await axios.post('/api/creatures/leg-actions', {id: creatureId, data: {name: action.name, desc: action.desc}});
        }
        if (payload.legActions.length === 0) await axios.post('/api/creatures/leg-actions', {id: creatureId, data: {name: null, desc: null}});

    } catch (err) {
        console.log(err);
    }
};

// === DELETE routes === //

export const deleteCreature = async (id: number) => {
    try {
        await axios.delete(`/api/creatures/${id}`);
    } catch (err) {
        console.log(err);
    }
};
