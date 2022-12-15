import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { Coord } from '../../scripts/types';


interface TokenState {
  selectedCell: Coord
}

const initialState: TokenState = {
  selectedCell: { x: 1, y: 1 }
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setSelectedCell: (state, action) => {
      state.selectedCell = action.payload;
    },
  }
});

export const { setSelectedCell } = tokenSlice.actions;

export const selectedCell = (state: RootState) => state.token.selectedCell;

export default tokenSlice.reducer;
