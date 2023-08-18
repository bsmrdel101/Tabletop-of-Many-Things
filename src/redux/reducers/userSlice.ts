import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface UserState {
  id: number
  username: string
  newUser: boolean
}

const initialState: UserState = {
  id: -1,
  username: '',
  newUser: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.newUser = action.payload.newUser;
    },
  }
});

export const { setUser } = userSlice.actions;

export const fetchUser = (state: RootState) => state.user;

export default userSlice.reducer;
