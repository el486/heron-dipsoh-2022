(function () {
    /**
     * `false` para deshabilitar worker
     * 
     *  Tener en cuenta que para eliminar un worker ya instalado en el cliente
     *  no es suficiente eliminarlo/borrarlo del código, sino que debe ejecutarse 
     *  su "desinstalación" en el browser.
     **/
    var ACTIVE = auth ? true : false;

    // Path absoluto donde está alojado el worker
    var WORKER_PATH = 'https://www.minfra.gba.gob.ar/sig_hidraulica/apps/visor/sw-requests.js';

    //var USERNAME = 'usuario';
    //var PASSWORD = 'contraseña';
	//console.log(auth);

    // Parámetros que s epasarán al worker una vez instalado
    var WORKER_PARAMS = {
        active: ACTIVE,
		urls: [
            'minfra.gba.gob.ar/sig_hidraulica/geoserver/dipsoh/'
        ],
        headers: {
            //Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD)
			Authorization: 'Basic ' + auth
        },
        // El proxy (opcional) se antepondrá en la url de cada petición
        proxy: ''
    };

    /**
     * Desactivamos el worker instalado
     * @param {string} workerPath 
     */
    function unregister(workerPath) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            registrations.forEach(function (registration) {
                if (registration.active.scriptURL === WORKER_PATH) {
					registration.unregister();
                    console.log('ServiceWorker desinstalado:', workerPath);
                }
            });
        });
    }

    /**
     * Instalamos el worker, y una vez que está "ready",
     * pasamos los parámetros de funcionamiento
     * @param {string} workerPath 
     */
    function activate(workerPath) {
        navigator.serviceWorker
            .register(workerPath)
            .then((reg) => {
                console.log('ServiceWorker registrado', reg);
            })
            .catch((err) => {
                console.error('ServiceWorker registro fallido:', err);
            });

        navigator.serviceWorker.ready.then(function (reg) {
            reg.active.postMessage(WORKER_PARAMS);
        });
    }

    // Al iniciar el código, evaluamos si los workers son soportados en el browser
    // https://caniuse.com/webworkers
    if ('serviceWorker' in navigator) {
        if (ACTIVE) {
            activate(WORKER_PATH);
        } else {
            unregister(WORKER_PATH);
        }
    } else {
        alert('Su navegador no soporta algunas funciones, use uno más moderno')
    }
})()
