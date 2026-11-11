import { useEffect, useState } from 'react';

import { useAppSelector } from './store/hooks';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import TripEditor from './components/TripEditor';

import './styles/App.css';

function App() {
  const language = useAppSelector((state) => state.settings.language);
  const themePreference = useAppSelector((state) => state.settings.themePreference);

  useEffect(() => {
    document.documentElement.lang = language;

    localStorage.setItem('travel-planner-language', language);
  }, [language]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    localStorage.setItem('travel-planner-theme', themePreference);

    function applyTheme() {
      let resolvedTheme = themePreference;

      if (themePreference === 'system'){
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      }

      document.documentElement.dataset.theme = resolvedTheme;
    };

    applyTheme();

    mediaQuery.addEventListener('change', applyTheme);

    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [themePreference]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(
    () => window.location.hash === '#settings'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsSettingsOpen(window.location.hash === '#settings');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Header />

      <div className='app-layout'>
        <Sidebar />
        
        <div
          className='app-layout__editor'
          hidden={isSettingsOpen}
        >
          <TripEditor />
        </div>

        {isSettingsOpen && <Settings />}
      </div>
    </>
  )
};

export default App;
