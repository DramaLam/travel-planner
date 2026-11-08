import type {TripDay} from '../types/trip';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TripState = {
  days: TripDay[],
};

const initialState: TripState = {
  days: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    dayAdded(state, action: PayloadAction<TripDay>) {
      state.days.push(action.payload);
    },
  },
});

export const { dayAdded } = tripSlice.actions;
export default tripSlice.reducer;
