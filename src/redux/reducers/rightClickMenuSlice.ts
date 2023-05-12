import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { Token } from '../../scripts/types';


interface RightClickMenuState {
  rightClickMenuType: string
  token?: Token
}

const initialState: RightClickMenuState = {
  rightClickMenuType: '',
  token: null
};

export const rightClickMenuSlice = createSlice({
  name: 'rightClickMenu',
  initialState,
  reducers: {
    setRightClickMenu: (state, action) => {
      state.rightClickMenuType = action.payload.type;
      state.token = action.payload.token;
    },
  }
});

export const { setRightClickMenu } = rightClickMenuSlice.actions;

export const fetchRightClickMenu = (state: RootState) => state.rightClickMenu;

export default rightClickMenuSlice.reducer;
