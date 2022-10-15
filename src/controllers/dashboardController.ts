import axios from "axios";
import { Game } from "../scripts/types";

interface newGame {
    name: string
}

// === GET routes === //

export const getGames = async () => {
    try {
        const res = await axios.get('/api/dashboard');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getGame = async (code: string) => {
    try {
        const res = await axios.get(`/api/dashboard/game/${code}`);
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
};

export const getGamesHistory = async () => {
    try {
        const res = await axios.get('/api/dashboard/history');
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

// === POST routes === //

export const addGame = async (payload: newGame) => {
    try {
        await axios.post('/api/dashboard', payload);
        getGames();
    } catch (err) {
        console.log(err);
    }
};

export const addGameToHistory = async (payload: Game) => {
    try {
        await axios.post('/api/dashboard/history', payload);
    } catch (err) {
        console.log(err);
    }
};
