import axios from 'axios';


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
    return res.data.user;
  } catch(error) {
    console.log(error);
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
  } catch(error) {
    console.log(error);
  }
};

export const loginUser = async (payload: NewUser) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    await axios.post('/api/user/login', payload, config);
  } catch(error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await axios.post('/api/user/logout');
  } catch(error) {
    console.log(error);
  }
};

// === PUT routes === //

export const changeNewUser = async (payload: boolean) => {
  try {
    await axios.put('/api/user', { newStatus: payload });
  } catch(error) {
    console.log(error);
  }
};
