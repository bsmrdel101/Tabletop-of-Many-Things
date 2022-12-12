import axios from 'axios';
import { changeRoute } from '../components/scripts/router';

interface NewUser {
    username: string
    password: string
}

// === GET routes === //

export const getUser = async () => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const res = await axios.get('/api/user', config);
        return res.data;
    } catch(err) {
        console.log(err);
    }
};

// === POST routes === //

export const registerUser = async (payload: NewUser) => {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        await axios.post('/api/user/register', payload, config);
        changeRoute('/login');
    } catch(err) {
        console.log(err);
    }
};

export const loginUser = async (payload: NewUser) => {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        await axios.post('/api/user/login', payload, config);
        changeRoute('/dashboard');
    } catch(err) {
        console.log(err);
    }
};

export const logout = async () => {
    try {
        await axios.post('/api/user/logout');
    } catch(err) {
        console.log(err);
    }
};

// === PUT routes === //

export const changeNewUser = async (payload: boolean) => {
    try {
        await axios.put('/api/user', { newStatus: payload });
    } catch(err) {
        console.log(err);
    }
};
