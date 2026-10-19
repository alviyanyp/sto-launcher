/* Service worker launcher STO.
 * Setiap kali file launcher diubah, naikkan CACHE_VERSION (samakan dengan version.json)
 * supaya HP/PC menampilkan tombol "Update".
 */
const CACHE_VERSION = '1.0.1';
const CACHE = 'sto-launcher-' + CACHE_VERSION;
const SHELL = [
  './', './index.html', './config.js', './version.json', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'
];
// File yang selalu dicek ke server dulu (agar perubahan langsung terasa)
const NETWORK_FIRST = ['index.html', 'config.js', 'version.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('sto-launcher-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // Apps Script dll: langsung ke jaringan

  const path = url.pathname.split('/').pop() || 'index.html';
  const netFirst = req.mode === 'navigate' || NETWORK_FIRST.includes(path);

  if (netFirst) {
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
    );
  } else {
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
