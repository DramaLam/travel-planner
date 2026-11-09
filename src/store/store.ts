import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './tripSlice';
import saveStatusReducer from './saveStatusSlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    saveStatus: saveStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
