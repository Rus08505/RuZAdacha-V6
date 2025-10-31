const APP_VERSION='6.0.0';
const CACHE=`ruza-${APP_VERSION}`;
const ASSETS=['./','./index.html','./css/styles.css','./js/app.js','./icons/icon-192.png','./icons/icon-512.png','./manifest.webmanifest','./assets/logo.png'];
self.addEventListener('install',e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate',e=>{ e.waitUntil((async()=>{ const keys=await caches.keys(); await Promise.all(keys.filter(k=>k.startsWith('ruza-')&&k!==CACHE).map(k=>caches.delete(k))); await self.clients.claim(); })()); });
self.addEventListener('message',e=>{ if(e.data==='SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch',e=>{ const req=e.request; e.respondWith(caches.match(req).then(r=>r||fetch(req).catch(()=>caches.match('./')))); });