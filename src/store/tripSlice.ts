import type {TripDay} from '../types/trip';

import { trip as messages } from '../locales/ru.json';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TripState = {
  title: string,
  days: TripDay[],
};

const initialState: TripState = {
  title: messages.title,
  days: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    tripRenamed(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    dayAdded(state, action: PayloadAction<TripDay>) {
      state.days.push(action.payload);
    },
    tripRestored(_state, action: PayloadAction<TripState>) {
      return action.payload;
    },
  },
});

export const { tripRenamed, dayAdded, tripRestored } = tripSlice.actions;
export default tripSlice.reducer;
