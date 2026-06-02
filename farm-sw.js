/* 任务农场 Service Worker（独立仓库版，作用域仅 /farm/）。
   首次联网缓存页面与素材，之后离线秒开；GitHub API（看板数据）永不缓存。 */
const CACHE = 'farm-cache-v65';
const ASSETS = [
  './', './index.html', './farm-manifest.json', './farm-icon.svg',
  './farm-assets/mon_hamster.png', './farm-assets/mon_fox.png', './farm-assets/mon_dragon.png',
  './farm-assets/icon_coin.png', './farm-assets/icon_gacha.png', './farm-assets/icon_level.png',
  './farm-assets/icon_task.png', './farm-assets/icon_trophy.png', './farm-assets/icon_setting.png',
  './farm-assets/bg_farm.jpg','./farm-assets/grow_panel_v2.png',
  './farm-assets/soil_1.png','./farm-assets/soil_2.png','./farm-assets/soil_3.png',
  './farm-assets/pond_1.png','./farm-assets/pond_2.png','./farm-assets/pond_3.png',
  './farm-assets/pasture_1.png','./farm-assets/pasture_2.png','./farm-assets/pasture_3.png',
  './farm-assets/wild_1.png','./farm-assets/wild_2.png','./farm-assets/wild_3.png',
  // 衰败贴图：soil/pond/pasture × 变种1-3 × 档位d1-d3
  './farm-assets/soil_1_d1.png','./farm-assets/soil_1_d2.png','./farm-assets/soil_1_d3.png',
  './farm-assets/soil_2_d1.png','./farm-assets/soil_2_d2.png','./farm-assets/soil_2_d3.png',
  './farm-assets/soil_3_d1.png','./farm-assets/soil_3_d2.png','./farm-assets/soil_3_d3.png',
  './farm-assets/pond_1_d1.png','./farm-assets/pond_1_d2.png','./farm-assets/pond_1_d3.png',
  './farm-assets/pond_2_d1.png','./farm-assets/pond_2_d2.png','./farm-assets/pond_2_d3.png',
  './farm-assets/pond_3_d1.png','./farm-assets/pond_3_d2.png','./farm-assets/pond_3_d3.png',
  './farm-assets/pasture_1_d1.png','./farm-assets/pasture_1_d2.png','./farm-assets/pasture_1_d3.png',
  './farm-assets/pasture_2_d1.png','./farm-assets/pasture_2_d2.png','./farm-assets/pasture_2_d3.png',
  './farm-assets/pasture_3_d1.png','./farm-assets/pasture_3_d2.png','./farm-assets/pasture_3_d3.png'
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
