Ext.ns('GObec.streetview');
BingApiKey = "Alq3YrLo7YbYmZ1Ckn3ZfZ5GxzjpB9QI0_laxg5yshZvXUyaOMqjDpf0aU4raz_5";
/* pegman feature */
GObec.streetview.pegman = null;
/* street view coverage layer */
GObec.streetview.coverage = null;
GObec.streetview.toolbar = {
	options: {
		tooltip: 'Street View',
		//iconCls: 'silk-camera',
		icon: 'resources/images/silk/streetview.png',
		enableToggle: true,
		pressed: false,
		id: 'streetviewButton'
	},
	create: function (mapPanel, options) {
		options.handler = function () {
			var button = Ext.getCmp('streetviewButton');
			var map = mapPanel.getMap();

			/* try to find any google hybrid layer */
			var gLayers = map.getLayersBy('type', {
				test: function(type){
					return type == 'hybrid';
				}
			});
			var gLayer = (gLayers.length > 0) ? gLayers[0] : null;

			if (button.pressed) {
				/* if no google satellite layers defined, add one */
				if (Ext.isObject(gLayer)) {
					map.setBaseLayer(gLayer);
				} else {
					gLayer = new OpenLayers.Layer.Google('Street View', {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22});
					map.addLayer(gLayer);
					map.setBaseLayer(gLayer);
				}

				/* set coverage layer for satellite */
				GObec.streetview.coverage = new google.maps.StreetViewCoverageLayer();
				GObec.streetview.coverage.setMap(gLayer.mapObject);

				/* add vector layer for pegman */
				var streetViewCursor = new OpenLayers.Layer.Vector('Stret View Cursor', {
					hideInLegend: true,
					metadata: {
						legend: {
							hideInLegend: true
						}
					},
					styleMap: new OpenLayers.StyleMap({
						'default': {
							graphicName: 'triangle',
							pointRadius: 10,
							fillColor: 'orange',
							fillOpacity: 0.6,
							rotation: '${angle}'
						}
					})
				});
				map.addLayer(streetViewCursor);
				GObec.streetview.pegman = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(map.getCenter().lon, map.getCenter().lat), {angle: 0});
				streetViewCursor.addFeatures([GObec.streetview.pegman]);

				/* show window with default street view location*/
				var window = new GObec.streetview.Window({
					id: 'streetviewWindow',
                    			animateTarget: button.getEl(),
					items: [
						{
							xtype: 'gxp_googlestreetviewpanel',
							heading: 0,
							location: map.getCenter().clone().transform(map.getProjectionObject(), new OpenLayers.Projection('EPSG:4326'))
						}
					]
				});
				window.show();

				/* register event to synchronize panorama location */
				map.events.register('moveend', map, GObec.streetview.panStreetView);
				var panorama = window.findByType('gxp_googlestreetviewpanel')[0].panorama;

				/* register events to synchronize pegman with panorama */
				google.maps.event.addListener(panorama, 'position_changed', GObec.streetview.panPosChanged);
				google.maps.event.addListener(panorama, 'pov_changed', GObec.streetview.panPovChanged);
			} else {
               			var window = Ext.getCmp('streetviewWindow');
                		if (Ext.isObject(window)) {
                    			window.close();
                		}
			}
		};
		return new Ext.Action(options);
	}
}

GObec.streetview.panPosChanged = function() {
	var position = 	new OpenLayers.LonLat(this.getPosition().lng(), this.getPosition().lat()).transform(new OpenLayers.Projection('EPSG:4326'), Heron.App.getMap().getProjectionObject());
	GObec.streetview.pegman.move(position);
}
GObec.streetview.panPovChanged = function() {
	GObec.streetview.pegman.attributes.angle = this.getPov().heading;
	GObec.streetview.pegman.layer.redraw();
}

GObec.streetview.panStreetView = function() {
	var panorama = Ext.getCmp('streetviewWindow').findByType('gxp_googlestreetviewpanel')[0].panorama;
	var location = this.getCenter().clone().transform(this.getProjectionObject(), new OpenLayers.Projection('EPSG:4326'));
	panorama.setPosition(new google.maps.LatLng(location.lat, location.lon));
}

GObec.streetview.WindowUi = Ext.extend(Ext.Window, {
//	shadow: false,
	width: 640,
	height: 480,
	border: false,
	closeAction: 'close',
	plain: true,
	resizable: true,
	title: 'Google Maps Street View',
	iconCls: 'icon-streetview',
	layout: 'fit',

	initComponent: function() {
		Ext.applyIf(this, {
			listeners: {
				beforeshow:function () {
                    			this.anchorTo(Heron.App.getMapPanel().getEl(), 'tl-tl', [60, 37]);
				},
				close: function() {
 					var map = Heron.App.getMap();
					/* clear listeners */
					google.maps.event.clearInstanceListeners(this.findByType('gxp_googlestreetviewpanel')[0].panorama);
					map.events.unregister('moveend', map, GObec.streetview.panStreetView);
					/* remove layers */
					map.removeLayer(GObec.streetview.pegman.layer);
					GObec.streetview.coverage.setMap(null);
					/* toggle button to false */
					Ext.getCmp('streetviewButton').toggle(false);
					//riportati su bing
					/*---------------------------------------------------*/
					//gLayer = new OpenLayers.Layer.Bing({
					//	name:"Bing Aerial", 
					//	key: BingApiKey,
					//	attributionTemplate: '',
					//	type:"Aerial"
					//});
					gLayer = new OpenLayers.Layer.Bing({
					   name: "Bing Road",
					   key: BingApiKey,
					   type: "Road"
				        }),
					/*gLayer = new OpenLayers.Layer.XYZ("ESRI Satellite",
					    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",{
					    sphericalMercator: true,
                                            attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a></font>",
                                            isBaseLayer: true
                                            } 
					),
			                */
					map.addLayer(gLayer);
					map.setBaseLayer(gLayer);
					/*----------------------------------------------------*/
					//alert('Riattiva Bing Layers');
				}
			}
		});

		GObec.streetview.WindowUi.superclass.initComponent.call(this);
	}
});
GObec.streetview.Window = Ext.extend(GObec.streetview.WindowUi, {
	initComponent: function() {
		GObec.streetview.Window.superclass.initComponent.call(this);
	}
});


