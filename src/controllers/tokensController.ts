import axios from "axios";
import { Token } from "../scripts/types";

export let tokens: Token[];

// === GET routes === //

export const getTokens = async () => {
    try {
        const res = await axios.get('/api/tokens')
        tokens = res.data;
    } catch (err) {
        console.log(err);
    }
};

// === POST routes === //

export const addToken = async (payload) => {
    try {
        await axios.post('/api/tokens', payload);
    } catch (err) {
        console.log(err);
    }
};

export const addTokenToMap = async (payload) => {
    try {
        await axios.post('/api/tokens/map', payload);
    } catch (err) {
        console.log(err);
    }
};
