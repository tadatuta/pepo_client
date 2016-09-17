modules.define('vmap', ['i-bem__dom', 'jquery', 'vmap-loader'], function (provide, BEMDOM, $) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    var self = this;
                    this.mapInitedDeferr = $.Deferred();
                    if (window.navigator.geolocation !== undefined) {
                        window.navigator.geolocation.getCurrentPosition(function (position) {
                            self.emit('navigatorPosition', {
                                lat: position.coords.latitude,
                                lon: position.coords.longitude
                            });
                        });
                    }
                    this.checkMapsApi();
                    this.on('mapInited', this.onMapInited);
                    this.on('navigatorPosition', this.onNavigatorPosition);
                    console.log(this);
                }
            }
        },

        centerDefault: [55.76, 37.64],
        zoomDefault: 7,
        checkMapsApi: function () {
            if (!window.ymaps) {
                var self = this;
                $.when(this.findBlockOn('vmap-loader').ymapsDeferred).then(function () {
                    self.onAPILoaded();
                });
            } else {
                this.onAPILoaded();
            }
        },
        onAPILoaded: function () {
            console.log('api loaded');
            this.initMap();
        },
        onNavigatorPosition: function (e, data) {
            var self = this;
            $.when(this.mapInitedDeferr).then(function () {
                self.setPosition([data.lat, data.lon]);
            });

        },
        initMap: function () {
            var center = this.params.center || this.centerDefault,
                zoom = this.params.zoom || this.zoomDefault;
            this._map = new window.ymaps.Map(this.elem('view')[0], {
                center: center,
                zoom: zoom,
                behaviors: ['drag', 'dblClickZoom', 'scrollZoom']
            });

            this._myPlacemark = new window.ymaps.Placemark(center);

            this._map.geoObjects.add(this._myPlacemark);

            this.mapInitedDeferr.resolve();
            this.findBlockInside('lat', 'input').elem('control').val(center[0]);
            this.findBlockInside('lon', 'input').elem('control').val(center[1]);
            this.emit('mapInited', {
                map: this._map
            });
        },
        onMapInited: function () {
            this.bindTo(this.elem('btn'), 'pointerclick', this.onBtnSearch);
            var self = this;
            this._map.events.add('click', function (e) {
                var coords = e.get('coords');
                self.setPosition(coords);
            });
        },
        onBtnSearch: function () {
            var lat = parseFloat(this.findBlockInside('lat', 'input').elem('control').val());
            var lon = parseFloat(this.findBlockInside('lon', 'input').elem('control').val());
            var coords = [lat, lon];
            this._map.geoObjects.removeAll();
            this._map.setCenter(coords);
            this._myPlacemark = new window.ymaps.Placemark(coords);
            this._map.geoObjects.add(this._myPlacemark);

        },
        setPosition: function (arr) {
            this._map.geoObjects.removeAll();
            this._map.setCenter(arr);
            this._map.geoObjects.add(new window.ymaps.Placemark(arr));
            this.findBlockInside('lat', 'input').elem('control').val(arr[0]);
            this.findBlockInside('lon', 'input').elem('control').val(arr[1]);
        },
        getPoint: function () {
            var lat = parseFloat(this.findBlockInside('lat', 'input').elem('control').val());
            var lon = parseFloat(this.findBlockInside('lon', 'input').elem('control').val());
            return { 'type': 'Point', 'coordinates': [lon, lat] };
        }

    }));

});
