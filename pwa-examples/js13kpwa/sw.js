self.importScripts('data/games.js');

// Files to cache
const cacheName = 'js13kPWA-v1';
const appShellFiles = [
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/index.html',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/app.js',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/style.css',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/fonts/graduate.eot',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/fonts/graduate.ttf',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/fonts/graduate.woff',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/favicon.ico',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/img/js13kgames.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/img/bg.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-32.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-64.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-96.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-128.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-168.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-192.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-256.png',
  '/mirai-kara-no-anata-no-totemo-subarashi-shinbun/pwa-examples/js13kpwa/icons/icon-512.png',
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(
       e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return; 
    }

  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
