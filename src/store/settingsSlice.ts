import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Language = 'ru' | 'en';

export type ThemePreference = 'light' | 'dark' | 'system';

type SettingsState = {
  language: Language;
  themePreference: ThemePreference;
};

const savedLanguage = localStorage.getItem('travel-planner-language');
const savedTheme = localStorage.getItem('travel-planner-theme');

const initialState: SettingsState = {
  language: (savedLanguage === 'ru' || savedLanguage === 'en') ? savedLanguage : 'en',
  themePreference: (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') ? savedTheme : 'system',
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    languageChanged(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    themePreferenceChanged(state, action: PayloadAction<ThemePreference>) {
      state.themePreference = action.payload;
    }
  },
});

export const { languageChanged, themePreferenceChanged } = settings.actions;
export default settings.reducer;
