import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import tokenReducer from './reducers/tokenSlice';
import gridReducer from './reducers/gridSlice';
import gridCoordSlice from './reducers/gridCoordSlice';
import creatureSlice from './reducers/creaturesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    grid: gridReducer,
    gridCoord: gridCoordSlice,
    creatures: creatureSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
