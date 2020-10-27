self.addEventListener('install', function(event) {
	caches.open('cache').then(function(cache) {
		return cache.addAll([
			'/index.html',
			'/images/background_mobile.png',
			'/images/background_web.png',
			'/images/icon_192x192.png',
			'/images/logo.png',
			'/images/shortcut.png'
		]);
	});
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});