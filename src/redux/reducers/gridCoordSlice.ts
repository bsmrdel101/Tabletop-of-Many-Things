import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CoordGridState {
  currentZoom: number;
  panOffsetX: number;
  panOffsetY: number;
}

const initialState: CoordGridState = {
  currentZoom: 1,
  panOffsetX: 0,
  panOffsetY: 0,
};

export const coordGridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGridPanOffset: (state, action) => {
      state.panOffsetX = action.payload.offsetX;
      state.panOffsetY = action.payload.offsetY;
    },
    setGridZoom: (state, action) => { state.currentZoom = action.payload; },
  }
});

export const { setGridPanOffset, setGridZoom } = coordGridSlice.actions;

export const fetchCoordGridData = (state: RootState) => state.gridCoord;

export default coordGridSlice.reducer;
