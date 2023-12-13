const CACHE_NAME = 'version-1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html', // Add any other assets you want to cache
];

// Install the service worker
this.addEventListener('install', async (event) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
    console.log('Service Worker installed');
  } catch (error) {
    console.error('Error during installation:', error);
  }
});

// Fetch resources from cache or network
this.addEventListener('fetch', async (event) => {
  try {
    const response = await caches.match(event.request);
    if (response) {
      return response;
    }
    const fetchResponse = await fetch(event.request);
    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
      return fetchResponse;
    }
    const responseToCache = fetchResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, responseToCache);
    return fetchResponse;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
});

// Activate the service worker and remove old caches
this.addEventListener('activate', async (event) => {
  try {
    const cacheWhiteList = [CACHE_NAME];
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(async (cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          await caches.delete(cacheName);
        }
      })
    );
    console.log('Service Worker activated');
  } catch (error) {
    console.error('Error during activation:', error);
  }
});
