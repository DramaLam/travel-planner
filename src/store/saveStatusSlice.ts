import { createSlice } from '@reduxjs/toolkit';

type SaveStatusState = {
  writeStatus: 'idle' | 'saving' | 'saved' | 'error';
  isTitleDirty: boolean;
  isDayDirty: boolean;
};

const initialState: SaveStatusState = {
  writeStatus: 'idle',
  isTitleDirty: false,
  isDayDirty: false,
};

const saveStatusSlice = createSlice({
  name: 'saveStatus',
  initialState,
  reducers: {
    saveStarted(state) {
      state.writeStatus = 'saving';
    },
    saveSucceeded(state) {
      state.writeStatus = 'saved';
    },
    saveFailed(state) {
      state.writeStatus = 'error';
    },
  },
});

export const { saveStarted, saveSucceeded, saveFailed } = saveStatusSlice.actions;

export default saveStatusSlice.reducer;
