import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Language = 'ru' | 'en';

type SettingsState = {
  language: Language;
};

const initialState: SettingsState = {
  language: 'en'
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    languageChanged(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    }
  },
});

export const { languageChanged } = settings.actions;
export default settings.reducer;
