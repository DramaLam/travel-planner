import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { loadTrip, saveTrip } from './storage/tripDb';
import { tripRestored } from './store/tripSlice';
import './styles/index.css';
import App from './App.tsx'
import { saveStarted, saveSucceeded, saveFailed } from './store/saveStatusSlice';

async function startApp() {
  try {
    const trip = await loadTrip();

    if (trip !== undefined) {
      store.dispatch(tripRestored(trip));
    }

    let previousTrip = store.getState().trip;
    let saveQueue = Promise.resolve();

    store.subscribe(() => {
      const currentTrip = store.getState().trip;

      if (currentTrip === previousTrip) return;

      previousTrip = currentTrip;
      store.dispatch(saveStarted());

      saveQueue = saveQueue
        .then(async () => {
          await saveTrip(currentTrip);

          if (store.getState().trip === currentTrip) {
            store.dispatch(saveSucceeded());
          }
        })
        .catch((error) => {
          console.error('Не удалось сохранить маршрут', error);

          if (store.getState().trip === currentTrip) {
            store.dispatch(saveFailed());
          }
        });
    });

  } catch (error) {
    console.error('Не удалось загрузить маршрут из IndexedDB', error);
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}

void startApp();
