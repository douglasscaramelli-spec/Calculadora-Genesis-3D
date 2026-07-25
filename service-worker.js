const CACHE_NAME='genesis3d-v11-assets-makerworld-20260725';
const CORE=['./','./index.html','./corrigido.html','./manifest.json','./genesis-logo.png','./genesis-192.png','./genesis-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('genesis3d-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,cp));}return r;}).catch(async()=>await caches.match(e.request)||await caches.match('./corrigido.html')));return;}
e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,cp));}return r;})));});