import api from "@/scripts/config/axios";

interface NewUser {
  email: string
  password: string
  displayName: string
}

interface UserLogin {
  email: string
  password: string
}


// === GET routes === //

export const getUser = async (): Promise<User | null> => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const res = await api.get('/api/users', config);
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
    await api.post('/api/users', payload, config);
  } catch(error: any) {
    console.error(error);
    return `${error.response.data.message}`;
  }
};

export const loginUser = async (payload: UserLogin): Promise<void | string> => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    await api.post('/api/users/login', payload, config);
  } catch(error: any) {
    console.error(error);
    return `${error.response.data.message}`;
  }
};

export const logout = async () => {
  try {
    const auth = { withCredentials: true };
    await api.delete('/api/users/logout', auth);
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
