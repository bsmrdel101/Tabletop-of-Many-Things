import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface UserState {
  username: string;
  password: string;
}

const initialState: UserState = {
  username: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
