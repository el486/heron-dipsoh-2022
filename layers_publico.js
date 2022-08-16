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
							//{nodeType: "gx_layer", layer: "Geo5000_Faja5",text:"Geodesia 1:5000 Faja5"},
							//{nodeType: "gx_layer", layer: "Geo5000_Faja6",text:"Geodesia 1:5000 Faja6"},
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
		 * Basemaps ESRI
		 */
		new OpenLayers.Layer.XYZ("ESRI Topografico",
				"//services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a>", isBaseLayer: true, displayInLayerSwitcher:false} 
		),
		new OpenLayers.Layer.XYZ("ESRI Satelital",
				"//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}",
				{sphericalMercator: true, attribution: "<font color='white'>Base Map Tiles &copy; <a href='http://www.esri.com/'>Esri</a></font>", isBaseLayer: true,displayInLayerSwitcher:false} 
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
			type: "Road",
			displayInLayerSwitcher:false
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Hibrido",
			key: apiKey,
			type: "AerialWithLabels",
			displayInLayerSwitcher:false
		}),
		new OpenLayers.Layer.Bing({
			name: "Bing Aereo",
			key: apiKey,
			type: "Aerial",
			displayInLayerSwitcher:false
		}),
		*/

		/*
		 * Basemap Blanco
		 */
		
		new OpenLayers.Layer.Image(
				"Blanco",
				Ext.BLANK_IMAGE_URL,
				new OpenLayers.Bounds(-7822279.086949371,-5021408.575019243,-5346607.805595686,-3837573.972371518),
				new OpenLayers.Size(10, 10),
				{isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize',numZoomLevels: 18}
		),
	]	
		/*
		 * Layers nuestros: Provincia
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
		),
		
		new OpenLayers.Layer.WMS("Lagos_y_lagunas",wmsURL,
			{layers: 'dipsoh:lagunas',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		), 
		
		new OpenLayers.Layer.WMS("Cuencas",wmsURL,
			{layers: 'dipsoh:cuencas',transparent: true, format:'image/png', singleTile: true },{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Cuencas Detalle",wmsURL,
			{layers: 'dipsoh:cuencas_detalle',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
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
		new OpenLayers.Layer.WMS("Barrios populares BA",wmsURL,
			{layers: '	dipsoh:barrios_populares_ba',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Urbanizaciones ACUMAR",wmsURL,
			{layers: 'dipsoh:urbanizaciones_emergentes_matanza_riachuelo',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),	
		new OpenLayers.Layer.WMS("Estaciones de medicion",wmsURL,
			{layers: ['dipsoh:estaciones_medicion','dipsoh:estaciones_historico_salado'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
	]

layerItems=layerItems.concat(provincia);
treeTheme[1].children.push({
					text:'Provincia', expanded: true, children:
						[
							{nodeType: "gx_layer", layer: "Partidos" },
							{nodeType: "gx_layer", layer: "Hidrografia",text:"Hidrografia escala 1:250.000" },
							{nodeType: "gx_layer", layer: "Hidrografia_detalle" },
							{nodeType: "gx_layer", layer: "Hidrografia_detalle_OSM" },
							{nodeType: "gx_layer", layer: "Lagos_y_lagunas",text:"Lagos y lagunas",legend:true },
							{nodeType: "gx_layer", layer: "Cuencas",text:"Cuencas (actualizado el 12/4/2017)" },
							{nodeType: "gx_layer", layer: "Cuencas Detalle"},
							{nodeType: "gx_layer", layer: "Rutas" ,legend:true },
							{nodeType: "gx_layer", layer: "Censo_2010",text:"Censo 2010 INDEC",legend:true },
							{nodeType: "gx_layer", layer: "Barrios populares BA",legend:true },
							{nodeType: "gx_layer", layer: "Urbanizaciones ACUMAR",legend:true },											  
							{nodeType: "gx_layer", layer: "Estaciones de medicion",legend:true} 
							
						]
				});
	
		/*
		 * Layers nuestros: Obras
		 */
obras=[
		 new OpenLayers.Layer.WMS("Obras con planilla",wmsURL,
			{layers: 'dipsoh:conductos_con_planilla',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Trazas DiPSOH",wmsURL,
			{layers: 'dipsoh:obras_dph_line',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Obras_SIGOS",wmsURL,
			{layers: 'dipsoh:obras_sigos_ref',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)/*,
		layerTrazas = new OpenLayers.Layer.WMS("Trazas+Obras_SIGOS",wmsURL,
			{layers: ['dipsoh:dipsoh_obras_sigos_total_local'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),*/
	]
layerItems=layerItems.concat(obras);
treeTheme[1].children.push({
					text:'Obras Hidraulica',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Obras con planilla" , text:"Antecedentes en PDF",legend:true },
							{nodeType: "gx_layer", layer: "Trazas DiPSOH" , text:"Obras DPH",legend:true },
							{nodeType: "gx_layer", layer: "Obras_SIGOS", text:"Obras Sigos - Referencia",legend:true  },
							//{nodeType: "gx_layer", layer: "Trazas+Obras_SIGOS" ,text:"Obras Sigos - Trazas",legend:true }
						]
				});

		/*
		 * Layers nuestros: Relevamiento
		 */
relevamiento=[
		new OpenLayers.Layer.WMS("Red_Geoba",wmsURL,
			{layers: 'dipsoh:red_geoba_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Estaciones permanentes IGN",wmsURL,
			{layers: 'dipsoh:estaciones_permanentes_ign',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerParcelasRT = new OpenLayers.Layer.WMS("Parcelas_RT",wmsURL,
			{layers: 'dipsoh:parcelas_rt_geom',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
/* 		new OpenLayers.Layer.WMS("Puntos_acotados_IGN",wmsURL,
			{layers: 'dipsoh:puntosacotados_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),*/
		new OpenLayers.Layer.WMS("Curvas_de_nivel",wmsURL,
			{layers: 'dipsoh:curvas_de_nivel',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("puntosGeodesia5000",wmsURL,
			{layers: 'dipsoh:puntosGeodesia5000',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Cartas_Geodesia_1:5000",wmsURL,
			{layers: 'dipsoh:cartas_geodesia_5000',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Red de nivelacion IGN",wmsURL,
			{layers: 'dipsoh:nivelacion_ign',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(relevamiento);
treeTheme[1].children.push({
					text:'Relevamiento',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Red_Geoba",legend:true },
							{nodeType: "gx_layer", layer: "Estaciones permanentes IGN",legend:true },
							//{nodeType: "gx_layer", layer: "Parcelas_RT",text:"Planos en Rel. Territorial" },
							//{nodeType: "gx_layer", layer: "Parcelas_con_plano",text:"Planos en Geodesia" },
							//{nodeType: "gx_layer", layer: "Puntos_acotados_IGN",legend:true  },
							{nodeType: "gx_layer", layer: "Curvas_de_nivel",legend:true  },
							{nodeType: "gx_layer", layer: "puntosGeodesia5000",legend:true,text:"Puntos fijos Geodesia 5000"},
							{nodeType: "gx_layer", layer: "Cartas_Geodesia_1:5000",legend:true  },
							{nodeType: "gx_layer", layer: "Red de nivelacion IGN",legend:true  }
						]
				});
		/*
		 * Layers nuestros: Mantenimiento
		 */
/*
mantenimiento=[
		new OpenLayers.Layer.WMS("Convenios para limpieza de arroyos",wmsURL,
			{layers: 'dipsoh:convenios_vista',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Convenios vigentes",wmsURL,
			{layers: 'dipsoh:convenios_vigentes',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Estaciones de bombeo",wmsURL,
			{layers: 'dipsoh:estaciones_de_bombeo',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Obras de retencion y admision",wmsURL,
			{layers: 'dipsoh:obras_de_retencion_y_admision',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Puentes",wmsURL,
			{layers: 'dipsoh:puentesba',transparent: true, format:'image/png', singleTile: true },
																										  
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(mantenimiento);
treeTheme[1].children.push({
					text:'Mantenimiento/Operativa',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Convenios para limpieza de arroyos"}, 
							{nodeType: "gx_layer", layer: "Convenios vigentes"}, 
							{nodeType: "gx_layer", layer: "Obras de retencion y admision"},
							{nodeType: "gx_layer", layer: "Estaciones de bombeo"},
							{nodeType: "gx_layer", layer: "Puentes"},
							
						]
				});
*/				
audiovisual=[
		new OpenLayers.Layer.WMS("Videos Helicoptero",wmsURL,
			{layers: 'dipsoh:vuelos_helicoptero_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Videos Drone",wmsURL,
			{layers: 'dipsoh:vuelos_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Fotos",wmsURL,
			{layers: 'dipsoh:fotos_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Mapeos",wmsURL,
			{layers: 'dipsoh:mapeos_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(audiovisual);
treeTheme[1].children.push({
					text:'Registro audiovisual',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Videos Drone"},
							{nodeType: "gx_layer", layer: "Videos Helicoptero"},
							{nodeType: "gx_layer", layer: "Fotos"},
							{nodeType: "gx_layer", layer: "Mapeos"}
						]
				});				
				
 		/*
		 * Layers nuestros: INA
		 */
ina=[
		new OpenLayers.Layer.WMS("Estaciones de medicion INA",wmsURL,
			{layers: 'dipsoh:ina_estaciones_de_medicion',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
																											 
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Boyas",wmsURL,
																												 
			{layers: 'dipsoh:ina_boyas_metadata',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Mareografos",wmsURL,
			{layers: 'dipsoh:ina_mareografos',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Muestras",wmsURL,
			{layers: 'dipsoh:ina_muestras_recolectadas',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Infraestructura",wmsURL,
			{layers: 'dipsoh:ina_infraestructura',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(ina);
treeTheme[1].children.push({
					text:'INA',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Estaciones de medicion INA"}, 
							{nodeType: "gx_layer", layer: "Mareografos"}, 
							{nodeType: "gx_layer", layer: "Boyas"},
							{nodeType: "gx_layer", layer: "Infraestructura"},
							{nodeType: "gx_layer", layer: "Muestras"},
							
						]
				});
				
		/*
		 * Layers nuestros: Cuenca Lujan
		 */
lujan=[
		new OpenLayers.Layer.WMS("Ribera preliminar ADA",wmsURL,
			{layers: 'dipsoh:lujan_ribera_provisoria_ADA',transparent: true, format:'image/png', singleTile: true },{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
																											 
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
		new OpenLayers.Layer.WMS("Cursos de agua IGN",wmsURL,
			{layers: 'dipsoh:lujan_cursos_agua_IGN',transparent: true, format:'image/png', singleTile: true },
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
					text:'Cuenca Lujan',expanded:false, children:
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
							{text:'Topografia',expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "MDE Palsar Lujan"},
									{nodeType: "gx_layer", layer: "Curvas_de_nivel",legend:true  }//,
								]
							},
							{text:'Hidrografia',expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "Cursos de agua IGN"},
									{nodeType: "gx_layer", layer: "Cursos cuenca baja"}									
								]
							}
						]
});
