import type { TripState } from '../store/tripSlice';

export function openTripDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('travel-planner', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore('trips');
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export async function saveTrip(trip: TripState): Promise<void> {
  const db = await openTripDb();

  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('trips', 'readwrite');

      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(transaction.error);

      const store = transaction.objectStore('trips');
      store.put(trip, 'current');
    });
  } finally {
    db.close();
  }
};

export async function loadTrip(): Promise<TripState | undefined> {
  const db = await openTripDb();

  try {
    return await new Promise<TripState | undefined>((resolve, reject) => {
      const transaction = db.transaction('trips', 'readonly');
      const store = transaction.objectStore('trips');
      const request = store.get('current');

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
};
