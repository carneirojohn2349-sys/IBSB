// IBSB — service worker
// Para publicar uma atualização, basta trocar a VERSAO abaixo (ex.: 2026-11-24.2).
const VERSAO = '2026-11-24.7';
const CACHE = 'ibsb-' + VERSAO;
const ARQUIVOS = [
  './', 'index.html', 'manifest.webmanifest', 'firebase-config.js',
  'biblia.json', 'hinos.json', 'documentos.json',
  'logo.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith('ibsb-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fontes do Google e scripts do Firebase: guarda uma cópia para funcionar sem internet
  if (url.hostname.endsWith('gstatic.com') || url.hostname === 'fonts.googleapis.com') {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') c.put(req, res.clone());
      return res;
    }));
    return;
  }
  if (url.origin !== location.origin) return; // Firebase (dados e login) vai direto pela rede

  // Páginas e configuração: busca a versão nova primeiro; sem internet, usa a cópia
  const rede = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('firebase-config.js');
  if (rede) {
    e.respondWith(
      fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
    return;
  }

  // Demais arquivos (Bíblia, hinos, imagens): usa a cópia e atualiza em segundo plano
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req);
    const novo = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || novo;
  }));
});
