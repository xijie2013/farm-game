/* 任务农场 Service Worker（独立仓库版，作用域仅 /farm/）。
   首次联网缓存页面与素材，之后离线秒开；GitHub API（看板数据）永不缓存。 */
const CACHE = 'farm-cache-v10';
const ASSETS = [
  './', './index.html', './farm-manifest.json', './farm-icon.svg',
  './farm-assets/mon_hamster.png', './farm-assets/mon_fox.png', './farm-assets/mon_dragon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname === 'api.github.com') return;          // 看板数据始终走网络
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit || fetch(e.request).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return resp; })
        .catch(() => caches.match('./index.html'))
    )
  );
});
