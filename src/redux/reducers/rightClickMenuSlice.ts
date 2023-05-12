import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';


interface RightClickMenuState {
  rightClickMenuType: string
}

const initialState: RightClickMenuState = {
  rightClickMenuType: ''
};

export const rightClickMenuSlice = createSlice({
  name: 'rightClickMenu',
  initialState,
  reducers: {
    setRightClickMenuType: (state, action) => {
      state.rightClickMenuType = action.payload;
    },
  }
});

export const { setRightClickMenuType } = rightClickMenuSlice.actions;

export const fetchRightClickMenuType = (state: RootState) => state.rightClickMenu.rightClickMenuType;

export default rightClickMenuSlice.reducer;
