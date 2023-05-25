// serviceWorker.js
// Este archivo es necesario para habilitar el soporte de PWA en Create React App.
// Configuración del service worker
// Aquí puedes personalizar cómo se almacena en caché tu aplicación y otras opciones relacionadas con el service worker.
// Consulta la documentación de Workbox para obtener más detalles: https://developers.google.com/web/tools/workbox
/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                // Lista de recursos que se almacenarán en caché
                '/',
                '/index.html',
                // Agrega aquí los archivos estáticos, como tus iconos, imágenes y archivos CSS/JS adicionales.
            ]);
        })
    );
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});