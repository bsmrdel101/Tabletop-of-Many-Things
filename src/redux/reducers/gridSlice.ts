import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface GridState {
  cellSize: number;
  gridOpacity: number;
  gridColor: string;
  offsetX: number;
  offsetY: number;
}

const initialState: GridState = {
  cellSize: 50,
  gridOpacity: 1,
  gridColor: '#000000',
  offsetX: 0,
  offsetY: 0,
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGrid: (state, action) => {
      state.cellSize = action.payload.cellSize;
      state.gridOpacity = action.payload.gridOpacity;
      state.gridColor = action.payload.gridColor;
      state.offsetX = action.payload.offsetX;
      state.offsetY = action.payload.offsetY;
    },
  }
});

export const { setGrid } = gridSlice.actions;

export const fetchGrid = (state: RootState) => state.grid;

export default gridSlice.reducer;
