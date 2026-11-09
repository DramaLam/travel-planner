import { useAppDispatch, useAppSelector } from '../store/hooks';

import { languageChanged } from '../store/settingsSlice';
import useMessages from '../locales/useMessages';

import '../styles/Settings.css';

function Settings() {
  const language = useAppSelector((state) => state.settings.language);

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

      <fieldset className='settings__language'>
        <div className='settings__setting'>
          <h2 className='settings__setting-title'>
            {messages.languageTitle}
          </h2>

          <p className='settings__setting-description'>
            {messages.languageDescription}
          </p>
        </div>

        <div className='settings__language-options'>
          <label className='settings__language-option'>
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === 'en'}
              onChange={() => dispatch(languageChanged('en'))}
            />
            English

            <p className='settings__language-option__default'>
              {messages.defaultLabel}
            </p>
          </label>

          <label className='settings__language-option'>
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

      <p className='settings__setting-description'>
        {messages.info}
      </p>
    </main>
  );
};

export default Settings;