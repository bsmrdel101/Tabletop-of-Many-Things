import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface GameState {
  game: Game
  room: string
  map: Board
}

const initialState: GameState = {
  game: null,
  room: '',
  map: null
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData: (state, action) => {
      state.game = action.payload.game;
      state.room = action.payload.room;
      state.map = action.payload.map;
    },
    setMap: (state, action) => {
      state.map = action.payload;
    },
  }
});

export const { setGameData, setMap } = gameSlice.actions;

export const fetchGameData = (state: RootState) => state;

export default gameSlice.reducer;
