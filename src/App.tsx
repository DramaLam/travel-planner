import { useEffect, useState } from 'react';

import { useAppSelector } from './store/hooks';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import TripEditor from './components/TripEditor';

import './styles/App.css';

function App() {
  const language = useAppSelector((state) => state.settings.language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
        
        <div hidden={isSettingsOpen}>
          <TripEditor />
        </div>

        {isSettingsOpen && <Settings />}
      </div>
    </>
  )
};

export default App;
