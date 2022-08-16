//variables que cargan con los layers

var apiKey = "ApjNQIT6SLCoD48dofLod3eQBSMsM933Yoe-GDn1uE3aVZjSCjgQxLWifL1Iic6_" //visor
//var mBpos="/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiNDg2IiwiYSI6IkNadnAwUk0ifQ.BIKNGrVqVAilUH7g0dsmxg";
var wmsURL='https://www.minfra.gba.gob.ar/sig_hidraulica/geoserver/dipsoh/wms'; //gwc/service/wms
var gwcURL='https://www.minfra.gba.gob.ar/sig_hidraulica/geoserver/dipsoh/wms'; //gwc/service/wms

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    {
        name: 'GeoJSON - EPSG:900913',
        outputFormat: 'json',
        fileExt: '.json'
    }
];

var treeTheme = [
	{
		text:'Capas Base', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "MapQuest Hibrido" },
				//{nodeType: "gx_layer", layer: "Cartas IGN 50K" },
				//{nodeType: "gx_layer", layer: "Cartas IGN 100K" },
				{nodeType: "gx_layer", layer: "OpenStreetsMap" },
				{nodeType: "gx_layer", layer: "mdt_ign" , text:"Modelo digital IGN" },
				{text:'Mas...', children:
						[
							{nodeType: "gx_layer", layer: "ESRI Satelital" },
							{nodeType: "gx_layer", layer: "ESRI Topografico"},
							//{nodeType: "gx_layer", layer: "Bing Aereo"},
							//{nodeType: "gx_layer", layer: "Bing Callejero"},
							//{nodeType: "gx_layer", layer: "Bing Hibrido"},
							{nodeType: "gx_layer", layer: "Blanco"}
						]
				}
			]
	},
	{
		text:'Capas de informacion', expanded: true, children:[]
	}
];

var layerItems=[
		/*
		 * Basemaps OpenStreetMap
		 */
		new OpenLayers.Layer.OSM("OpenStreetsMap", 
			// Official OSM tileset as protocol-independent URLs
			[
				'//a.tile.openstreetmap.org/${z}/${x}/${y}.png',
				'//b.tile.openstreetmap.org/${z}/${x}/${y}.png',
				'//c.tile.openstreetmap.org/${z}/${x}/${y}.png'
			], 
			null
		),
		
		/*
		 * Basemaps ESRI
		 */
		new OpenLayers.Layer.XYZ("ESRI Topografico",
				"//services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a>", isBaseLayer: true} 
		),
		new OpenLayers.Layer.XYZ("ESRI Satelital",
				"//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a></font>", isBaseLayer: true} 
		),
		
		/*
		 * Basemaps MapQuest
		 */
		
		new OpenLayers.Layer.XYZ("MapQuest Hibrido",
				"//tileproxy.cloud.mapquest.com/tiles/1.0.0/hyb/${z}/${x}/${y}.png",
				{sphericalMercator: true, attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.mapbox.com/'>MapBox</a></font>", isBaseLayer: true,displayInLayerSwitcher:false} 
		),
		
		/*
		BING
		
								
		 new OpenLayers.Layer.Bing({
			name: "Bing Callejero",
			key: apiKey,
			type: "Road"
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Hibrido",
			key: apiKey,
			type: "AerialWithLabels"
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Aereo",
			key: apiKey,
			type: "Aerial"
		}),
		
		*/
		
		/*
		 * Basemap Tilecache y geoserver
		 
		
		new OpenLayers.Layer.WMS("Cartas IGN 50K",gwcURL,
			{layers: 'dipsoh:cartas_50k',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		
		new OpenLayers.Layer.WMS("Cartas IGN 100K",gwcURL,
			{layers: 'dipsoh:cartas_100k',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		*/
		new OpenLayers.Layer.WMS("mdt_ign",gwcURL,
			{layers: 'dipsoh:IGN_mde21',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		
		/*
		 * Basemap Blanco
		 */
		
		new OpenLayers.Layer.Image(
				"Blanco",
				Ext.BLANK_IMAGE_URL,
				new OpenLayers.Bounds(-7822279.086949371,-5021408.575019243,-5346607.805595686,-3837573.972371518),
				new OpenLayers.Size(10, 10),
				{isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize',numZoomLevels: 18}
		)
	]
		
		/*
		 * Layers nuestros
		 */
provincia=[	
		layerPartidos = new OpenLayers.Layer.WMS("Partidos",gwcURL,
			{layers: 'dipsoh:departamentos',transparent: true, format:'image/png', singleTile: true }, 
			{visibility: true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Cuenca Lujan",wmsURL,
			{layers: 'dipsoh:cuenca_lujan',transparent: true, format:'image/png', singleTile: true },{opacity: 0.75,visibility: true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Rutas",wmsURL,
			{layers: 'dipsoh:rutas',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			} 
		),
				
		new OpenLayers.Layer.WMS("Censo_2010",wmsURL,
			{layers: 'dipsoh:indec_2010',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia",wmsURL,
			{layers: 'dipsoh:hidro_view',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia_detalle",wmsURL,
			{layers: 'dipsoh:hidro_detalle',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Hidrografia_detalle_OSM",wmsURL,
			{layers: 'dipsoh:hidro_detalle_osm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
		
layerItems=layerItems.concat(provincia);
treeTheme[1].children.push({
					text:'Provincia', expanded: true, children:
						[
							{nodeType: "gx_layer", layer: "Partidos" },
							{nodeType: "gx_layer", layer: "Cuenca Lujan"},
							{nodeType: "gx_layer", layer: "Rutas" ,legend:true }							
						]
				});		

lujan=[
		new OpenLayers.Layer.WMS("Ribera preliminar ADA",wmsURL,
			{layers: 'dipsoh:lujan_ribera_provisoria_ADA',transparent: true, format:'image/png', singleTile: true },{opacity: 0.75,visibility: true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),		

 
		new OpenLayers.Layer.WMS("Urbanizaciones e industrias",wmsURL,
			{layers: 'dipsoh:lujan_urbanizaciones-industrias-asentamientos',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		
		new OpenLayers.Layer.WMS("Parques Industriales",wmsURL,
			{layers: 'dipsoh:lujan_parques_industriales',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),		
		//obras
		new OpenLayers.Layer.WMS("ARTEH",wmsURL,
			{layers: 'dipsoh:ARTEH',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ampliacion de cauce",wmsURL,
			{layers: 'dipsoh:lujan_canalizaciones',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Obras puntuales",wmsURL,
			{layers: 'dipsoh:lujan_obras_point',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		new OpenLayers.Layer.WMS("Puentes proyectados",wmsURL,
			{layers: 'dipsoh:lujan_puentes_proyectados',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),		
		new OpenLayers.Layer.WMS("Actual-recurrencia 2 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_2',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 5 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_5',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 10 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_10',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 25 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_25',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 50 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_50',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 100 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_100',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 2 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_2',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 5 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_5',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 10 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_10',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 25 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_25',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 50 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_50',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 100 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_100',transparent: true, format:'image/png', singleTile: true, styles:'manchas_inundacion_0-20_css'},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		//topo
		new OpenLayers.Layer.WMS("Curvas_de_nivel",wmsURL,
			{layers: 'dipsoh:curvas_de_nivel',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("MDE Palsar Lujan",wmsURL,
			{layers: 'dipsoh:MDE_PALSAR_LUJAN',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		//hidro
		new OpenLayers.Layer.WMS("Hidro detalle lujan",wmsURL,
			{layers: 'dipsoh:lujan_hidro',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		
		new OpenLayers.Layer.WMS("Cursos cuenca baja",wmsURL,
			{layers: 'dipsoh:lujan_cursos_cuenca_baja',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)		
	]
layerItems=layerItems.concat(lujan);
treeTheme[1].children.push({
					text:'Cuenca Lujan',expanded:true, children:
						[
							{nodeType: "gx_layer", layer: "Urbanizaciones e industrias"},
							{nodeType: "gx_layer", layer: "Parques Industriales"},
							{nodeType: "gx_layer", layer: "Ribera preliminar ADA"},
							{text:'Obras',expanded:true, children:
								[
									{nodeType: "gx_layer", layer: "ARTEH"},
									{nodeType: "gx_layer", layer: "Ampliacion de cauce"},
									{nodeType: "gx_layer", layer: "Obras puntuales"},	
									{nodeType: "gx_layer", layer: "Puentes proyectados"}
								]
							},
							{
							text:'Manchas de inundación', expanded:false, children:
										[
										{nodeType: "gx_layer", layer: "Actual-recurrencia 2 años"},
										{nodeType: "gx_layer", layer: "Actual-recurrencia 5 años"},
										{nodeType: "gx_layer", layer: "Actual-recurrencia 10 años"},
										{nodeType: "gx_layer", layer: "Actual-recurrencia 25 años"},
										{nodeType: "gx_layer", layer: "Actual-recurrencia 50 años"},
										{nodeType: "gx_layer", layer: "Actual-recurrencia 100 años"},
										{nodeType: "gx_layer", layer: "Con obra-recurrencia 2 años"},
										{nodeType: "gx_layer", layer: "Con obra-recurrencia 5 años"},
										{nodeType: "gx_layer", layer: "Con obra-recurrencia 10 años"},
										{nodeType: "gx_layer", layer: "Con obra-recurrencia 25 años"},
										{nodeType: "gx_layer", layer: "Con obra-recurrencia 50 años"},
										{nodeType: "gx_layer", layer: "Con obra-recurrencia 100 años"}											
										]
							},
							{text:'Topografia',expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "MDE Palsar Lujan"},
									{nodeType: "gx_layer", layer: "Curvas_de_nivel",legend:true  }//,
								]
							},
							{text:'Hidrografia',expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "Hidro detalle lujan"},
									{nodeType: "gx_layer", layer: "Cursos cuenca baja"}									
								]
							}
						]
				});
		/*
		 * Layers nuestros: arba
		 */
arba=[
		layerCallesArba = new OpenLayers.Layer.WMS("Calles",gwcURL,
			{layers: 'dipsoh:calles',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerParcelasArba = new OpenLayers.Layer.WMS("Parcelas",gwcURL,
			{layers: 'dipsoh:parcelas_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerMacizosArba = new OpenLayers.Layer.WMS("Macizos",gwcURL,
			{layers: 'dipsoh:macizos_vista',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerCircunscripcionesArba = new OpenLayers.Layer.WMS("Partidos y Circunscripciones",gwcURL,
			{layers: ['dipsoh:secciones_vista','dipsoh:circunscripciones_vista','dipsoh:partidos_vista'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
	
layerItems=layerItems.concat(arba);
treeTheme[1].children.push({
					text:'Parcelario Arba 2018', nodeType: 'hr_cascader', expanded: false, children:
						[
							{nodeType: "gx_layer", layer: "Partidos y Circunscripciones" },
							{nodeType: "gx_layer", layer: "Macizos" },
							{nodeType: "gx_layer", layer: "Parcelas" },
							{nodeType: "gx_layer", layer: "Calles" }							
						]
				});
