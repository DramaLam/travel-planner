import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './tripSlice';
import saveStatusReducer from './saveStatusSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    saveStatus: saveStatusReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
