import { useAppDispatch, useAppSelector } from '../store/hooks';

import { languageChanged, themePreferenceChanged } from '../store/settingsSlice';
import useMessages from '../locales/useMessages';

import themeLight from '../assets/icons/theme-light.svg';
import themeDark from '../assets/icons/theme-dark.svg';
import themeSystem from '../assets/icons/theme-system.svg';

import '../styles/Settings.css';

function Settings() {
  const language = useAppSelector((state) => state.settings.language);
  const theme = useAppSelector((state) => state.settings.themePreference);
 
  const dispatch = useAppDispatch();

  const { settings: messages } = useMessages();

  return (
    <main className='settings' id="settings">
      <header className='settings__header'>
        <h1>
          {messages.title}
        </h1>
        <p>
          {messages.description}
        </p>
      </header>

      <fieldset aria-labelledby='setting-theme' className='settings__setting'>
        <div className='settings__setting-title'>
          <h2 id='setting-theme' className='settings__setting-title__text'>
            {messages.themeTitle}
          </h2>

          <p className='settings__setting-title__description'>
            {messages.themeDescription}
          </p>
        </div>

        <div className='settings__setting-options'>
          <label className='settings__setting-option settings__setting-option__theme'>
            <img
              src={themeLight}
              alt=""
              className='settings__theme-preview'
            />

            <div className='settings__setting-option__theme-info'>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={() => dispatch(themePreferenceChanged('light'))}
              />
              {messages.themeLight}
            </div>
            
          </label>

          <label className='settings__setting-option settings__setting-option__theme'>
            <img
              src={themeDark}
              alt=""
              className='settings__theme-preview'
            />

            <div className='settings__setting-option__theme-info'>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={() => dispatch(themePreferenceChanged('dark'))}
              />
              {messages.themeDark}
            </div>
          </label>

          <label className='settings__setting-option settings__setting-option__theme'>
            <img
              src={themeSystem}
              alt=""
              className='settings__theme-preview'
            />

            <div className='settings__setting-option__theme-info'>
              <input
                type="radio"
                name="theme"
                value="system"
                checked={theme === 'system'}
                onChange={() => dispatch(themePreferenceChanged('system'))}
              />
              {messages.themeSystem}
            </div>
          </label>
        </div>
      </fieldset>

      {/* Language */}
      <fieldset aria-labelledby='setting-language' className='settings__setting'>
        <div className='settings__setting-title'>
          <h2 id='setting-language' className='settings__setting-title__text'>
            {messages.languageTitle}
          </h2>

          <p className='settings__setting-title__description'>
            {messages.languageDescription}
          </p>
        </div>

        <div className='settings__setting-options'>
          <label className='settings__setting-option settings__setting-option__language'>
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === 'en'}
              onChange={() => dispatch(languageChanged('en'))}
            />
            English

            <p className='settings__setting-option__default'>
              {messages.defaultLabel}
            </p>
          </label>

          <label className='settings__setting-option settings__setting-option__language'>
            <input
              type="radio"
              name="language"
              value="ru"
              checked={language === 'ru'}
              onChange={() => dispatch(languageChanged('ru'))}
            />
            Русский
          </label>
        </div>
      </fieldset>

      <p className='settings__setting-title__description'>
        {messages.info}
      </p>
    </main>
  );
};

export default Settings;