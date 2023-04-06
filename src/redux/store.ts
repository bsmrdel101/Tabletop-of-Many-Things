import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import userReducer from './reducers/userSlice';
import tokenReducer from './reducers/tokenSlice';
import gridReducer from './reducers/gridSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    token: tokenReducer,
    grid: gridReducer,
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
