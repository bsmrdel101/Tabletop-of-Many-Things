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
    const res = await api.get('/api/v1/users');
    return res.data;
  } catch(error) {
    console.error(error);
    return null;
  }
};

// === POST routes === //

export const registerUser = async (payload: NewUser) => {
  try {
    await api.post('/api/v1/users', payload);
  } catch(error) {
    showError(error);
  }
};

export const loginUser = async (payload: UserLogin) => {
  try {
    await api.post('/api/v1/users/login', payload);
  } catch(error) {
    showError(error);
  }
};

export const logout = async () => {
  try {
    await api.post('/api/v1/users/logout');
  } catch(error) {
    showError(error);
  }
};

// === PUT routes === //

export const editUser = async (payload: { displayName: string, email: string }) => {
  try {
    await api.put('/api/v1/user', { ...payload });
  } catch(error) {
    showError(error);
  }
};

// === DELETE routes === //

export const deleteUser = async () => {
  try {
    await api.delete('/api/v1/user');
  } catch(error) {
    showError(error);
  }
};
