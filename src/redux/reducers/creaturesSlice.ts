import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface CreaturesState {
  creatures: Creature_5e[]
}

const initialState: CreaturesState = {
  creatures: []
};

export const creatureSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    setCreatureData: (state, action) => {
      state.creatures = action.payload;
    },
  }
});

export const { setCreatureData } = creatureSlice.actions;

export const fetchCreaturesData = (state: RootState) => state.creatures.creatures;

export default creatureSlice.reducer;
