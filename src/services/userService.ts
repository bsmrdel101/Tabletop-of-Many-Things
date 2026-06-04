import { showError } from "@/components/library/Errors";
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
    const res = await api.get('/api/users');
    return res.data;
  } catch(error) {
    console.error(error);
    showError(error);
    return null;
  }
};

// === POST routes === //

export const registerUser = async (payload: NewUser) => {
  try {
    await api.post('/api/users', payload);
  } catch(error) {
    console.error(error);
  }
};

export const loginUser = async (payload: UserLogin) => {
  try {
    await api.post('/api/users/login', payload);
  } catch(error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await api.post('/api/users/logout');
  } catch(error) {
    console.error(error);
  }
};

// === PUT routes === //

export const editUser = async (payload: { displayName: string, email: string }) => {
  try {
    await api.put('/api/user', { ...payload });
  } catch(error) {
    console.error(error);
  }
};

// === DELETE routes === //

export const deleteUser = async () => {
  try {
    await api.delete('/api/user');
  } catch(error) {
    console.error(error);
  }
};
