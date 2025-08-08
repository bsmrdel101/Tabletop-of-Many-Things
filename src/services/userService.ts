import api from "@/scripts/config/axios";


interface NewUser {
  username: string
  password: string
}

// === GET routes === //

export const getUser = async (): Promise<User | null> => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const res = await api.get('/api/user', config);
    return res.data.user;
  } catch(error) {
    console.error(error);
    return null;
  }
};

// === POST routes === //

export const registerUser = async (payload: NewUser): Promise<void | string> => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    await api.post('/api/user/register', payload, config);
  } catch(error: any) {
    console.error(error);
    return `${error.response.data.message}`;
  }
};

export const loginUser = async (payload: NewUser): Promise<void | string> => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    await api.post('/api/user/login', payload, config);
  } catch(error: any) {
    console.error(error);
    return `${error.response.data.message}`;
  }
};

export const logout = async () => {
  try {
    const auth = { withCredentials: true };
    await api.delete('/api/user/logout', auth);
  } catch(error) {
    console.error(error);
  }
};

// === PUT routes === //

export const changeNewUser = async (payload: boolean) => {
  try {
    const auth = { withCredentials: true };
    await api.put('/api/user', { newStatus: payload }, auth);
  } catch(error) {
    console.error(error);
  }
};
