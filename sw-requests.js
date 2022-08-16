var headers_ = '', proxy_ = '', urls_ = [], active_;

// Al instalar no hacemos nada
self.addEventListener('install', function () { self.skipWaiting(); });

// Al activarse esperamos los parámetros de funcionamiento desde el cliente
self.addEventListener('activate', function (evt) { evt.waitUntil(clients.claim()); });

// Interceptamos todos los fetch del sitio
self.addEventListener('fetch', function (evt) {

    var currentUrl = evt.request.url;

    // Chequeamos si la petición actual coincide con alguna url
    var match = urls_.length ? urls_.some(function (url) { return currentUrl.indexOf(url) > -1 }) : false;

    // Añadimos proxy
    if (proxy_) {
        evt.request.url = proxy + evt.request.url;
    }

    // Si la petición matchea agregamos proxy (si existe) y headers
    // Si no matchea el request no es modificado
    if (active_ && match) {

        var req = new Request(evt.request, {
            mode: 'cors',
            headers: { ...evt.request.headers, ...headers_ }
        })

        evt.respondWith(
            fetch(req)
        );
    }

});

// Al iniciar el worker, obtenemos los nuevos parámetros de funcionamiento
self.addEventListener('message', function (evt) {

    if (evt.data.active) {
        active_ = evt.data.active;
    }

    if (evt.data.urls) {
        urls_ = evt.data.urls;
    }

    if (evt.data.headers) {
        headers_ = evt.data.headers;
    }

    if (evt.data.proxy) {
        proxy_ = evt.data.proxy;
    }

});