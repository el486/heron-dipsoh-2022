//variables que cargan con los layers

var apiKey = "ApjNQIT6SLCoD48dofLod3eQBSMsM933Yoe-GDn1uE3aVZjSCjgQxLWifL1Iic6_" //visor
//var mBpos="/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiNDg2IiwiYSI6IkNadnAwUk0ifQ.BIKNGrVqVAilUH7g0dsmxg";
var wmsURL='https://www.minfra.gba.gob.ar/sig_hidraulica/geoserver/dipsoh/wms'; //gwc/service/wms
var gwcURL='https://www.minfra.gba.gob.ar/sig_hidraulica/geoserver/dipsoh/wms'; //gwc/service/wms

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    /*{
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    },
    {
        name: 'Esri SHP (zip, EPSG:3857 - EPSG:900913)',
        outputFormat: 'SHAPE-ZIP',
        fileExt: '.zip'
    },*/
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
				{nodeType: "gx_layer", layer: "OpenStreetsMap" },
				{nodeType: "gx_layer", layer: "IGN_mde21" , text:"Modelo digital de elevacion IGN" },
				{nodeType: "gx_layer", layer: "Cartas IGN 50K" },
				{text:'Mas...', children:
						[
						    {nodeType: "gx_layer", layer: "ESRI Satelital"},
							{nodeType: "gx_layer", layer: "ESRI Topografico"},
							//{nodeType: "gx_layer", layer: "Bing Aereo"},
							//{nodeType: "gx_layer", layer: "Bing Callejero"},
							//{nodeType: "gx_layer", layer: "Cartas IGN 50K" },
							//{nodeType: "gx_layer", layer: "Cartas IGN 100K" },
							{nodeType: "gx_layer", layer: "Geo5000_Faja5",text:"Geodesia 1:5000 Faja5"},
							{nodeType: "gx_layer", layer: "Geo5000_Faja6",text:"Geodesia 1:5000 Faja6"},
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
		//new OpenLayers.Layer.Stamen("toner"),
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
		*/
		
		new OpenLayers.Layer.WMS("Cartas IGN 50K",gwcURL,
			{layers: 'dipsoh:cartas_50K',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		/*
		new OpenLayers.Layer.WMS("Cartas IGN 100K",gwcURL,
			{layers: 'dipsoh:cartas_100k',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		*/
		new OpenLayers.Layer.WMS("IGN_mde21",gwcURL,
			{layers: 'dipsoh:IGN_mde21',transparent: true, format:'image/png', tiled: true }, 
			{isBaseLayer:true, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 


		new OpenLayers.Layer.WMS("Geo5000_Faja5",gwcURL,
			{layers: 'dipsoh:Geo5000_F5',transparent: true, format:'image/png', tiled: true }, 
			{visibility: false,isBaseLayer:false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
		), 
		
		new OpenLayers.Layer.WMS("Geo5000_Faja6",gwcURL,
			{layers: 'dipsoh:Geo5000_F6',transparent: true, format:'image/png', tiled: true }, 
			{visibility: false,isBaseLayer:false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml'}								 
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
		new OpenLayers.Layer.WMS("Estaciones de medicion historicas",wmsURL,
			{layers: ['dipsoh:estaciones_medicion','dipsoh:estaciones_historico_salado'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Sistema nacional de informacion hidrica",wmsURL,
			{layers: 'dipsoh:estaciones_snih',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
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
							{nodeType: "gx_layer", layer: "Estaciones de medicion historicas",legend:true},
							{nodeType: "gx_layer", layer: "Sistema nacional de informacion hidrica",legend:true}
							
						]
				});
	
	
		/*
		 * Layers nuestros: ARBA
		 */
arba=[
		 layerCircunscripcionesArba = new OpenLayers.Layer.WMS("Partidos y Circunscripciones",gwcURL,
			{layers: ['dipsoh:secciones_vista','dipsoh:circunscripciones_vista','dipsoh:partidos_vista'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),		
		layerMacizosArba = new OpenLayers.Layer.WMS("Macizos",gwcURL,
			{layers: 'dipsoh:macizos_geoinfra_vista',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		layerParcelasArba = new OpenLayers.Layer.WMS("Parcelas",gwcURL,
			{layers: 'dipsoh:parcelas_geoinfra_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
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
		layerBarriosCerradosArba = new OpenLayers.Layer.WMS("Urbanizaciones Cerradas",gwcURL,
			{layers: ['dipsoh:urbanizaciones_cerradas'],transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(arba);
/*
geoinfra=[
		new OpenLayers.Layer.WMS("Parcelas arba con plano", 
			"http://www.geoinfra.mosp.gba.gov.ar/geoserver/Geoinfra/wms?",
			{layers: 'parcelario_completo',transparent: true, format:'image/png', singleTile: true, opacity:0.3},{visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
	
layerItems=layerItems.concat(geoinfra);
*/
treeTheme[1].children.push({
					text:'Parcelario Arba', expanded: false, children:
						[
							{nodeType: "gx_layer", layer: "Partidos y Circunscripciones" },
							{nodeType: "gx_layer", layer: "Macizos" },
							{nodeType: "gx_layer", layer: "Parcelas" },
							{nodeType: "gx_layer", layer: "Calles" },
							{nodeType: "gx_layer", layer: "Urbanizaciones Cerradas" }//,
							//{nodeType: "gx_layer", layer: "Parcelas arba con plano" }
						]
				});

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
		new OpenLayers.Layer.WMS("Parcelas afectadas historicas",wmsURL,
			{layers: 'dipsoh:parcelas_por_obra_historicas',transparent: true, format:'image/png', singleTile: true },
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
		),
		new OpenLayers.Layer.WMS("Sumideros y cunetas",wmsURL,
			{layers: ['dipsoh:sumideros_y_cunetas_line','dipsoh:sumideros'],transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Pavimentos y cordones",wmsURL,
			{layers: 'dipsoh:pavimentos_y_cordones',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Cuencas por obra",wmsURL,
			{layers: 'dipsoh:cuencas_por_obra',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Conductos",wmsURL,
			{layers: 'dipsoh:conductos',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
		
		,
		new OpenLayers.Layer.WMS("Obras",wmsURL,
			{layers: 'dipsoh:obras__dph',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Banco de proyectos",wmsURL,
			{layers: 'dipsoh:obras_bpr',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Obras por convenio",wmsURL,
			{layers: 'dipsoh:obras_obc',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Proyectos",wmsURL,
			{layers: 'dipsoh:obras_pr',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Parcelas afectadas",wmsURL,
			{layers: 'dipsoh:estado_parcelario',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Obras historicas",wmsURL,
			{layers: 'dipsoh:obras_obh',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 2 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_2',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 5 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_5',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 10 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_10',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 25 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_25',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 50 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_50',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Actual-recurrencia 100 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_actual_100',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 2 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_2',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 5 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_5',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 10 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_10',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 25 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_25',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 50 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_50',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Con obra-recurrencia 100 años",wmsURL,
			{layers: 'dipsoh:manchas_inundacion_proyecto_100',transparent: true, format:'image/png', singleTile: true/*, styles:'obras__dph_uniforme_css' */},
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
				
		
	]
layerItems=layerItems.concat(obras);
treeTheme[1].children.push({
					text:'Obras Hidraulica',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Obras" },
							{nodeType: "gx_layer", layer: "Obras por convenio" },
							{nodeType: "gx_layer", layer: "Proyectos" },
							{nodeType: "gx_layer", layer: "Banco de proyectos" },
							{nodeType: "gx_layer", layer: "Obras historicas" },
							{nodeType: "gx_layer", layer: "Parcelas afectadas" },
							{
							text:'Archivo de Obras', expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "Obras con planilla" , text:"Antecedentes en PDF",legend:true },
									{nodeType: "gx_layer", layer: "Parcelas afectadas historicas" ,legend:true },
									{nodeType: "gx_layer", layer: "Trazas DiPSOH" , text:"Trazas DPH",legend:true },
									{nodeType: "gx_layer", layer: "Obras_SIGOS", text:"Obras Sigos - Referencia",legend:true  },
									//{nodeType: "gx_layer", layer: "Trazas+Obras_SIGOS" ,text:"Obras Sigos - Trazas",legend:true }
									]
							},
							{
							text:'Proyectos puntuales', expanded:false, children:
								[
									{nodeType: "gx_layer", layer: "Cuencas por obra"},
									{nodeType: "gx_layer", layer: "Conductos"},
									{nodeType: "gx_layer", layer: "Sumideros y cunetas"},
									{nodeType: "gx_layer", layer: "Pavimentos y cordones"},
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
								]
							}
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
		new OpenLayers.Layer.WMS("Puntos_acotados_IGN",wmsURL,
			{layers: 'dipsoh:puntosacotados_22195',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
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
		//dipsoh:relevamientos
		new OpenLayers.Layer.WMS("Relevamientos",wmsURL,
			{layers: 'dipsoh:relevamientos',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
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
							{nodeType: "gx_layer", layer: "Parcelas_RT",text:"Planos en Rel. Territorial" },
							//{nodeType: "gx_layer", layer: "Parcelas_con_plano",text:"Planos en Geodesia" },
							//{nodeType: "gx_layer", layer: "Puntos_acotados_IGN",legend:true  },
							{nodeType: "gx_layer", layer: "Curvas_de_nivel",legend:true  },
							{nodeType: "gx_layer", layer: "puntosGeodesia5000",legend:true,text:"Puntos fijos Geodesia 5000"},
							{nodeType: "gx_layer", layer: "Cartas_Geodesia_1:5000",legend:true  },
							{nodeType: "gx_layer", layer: "Red de nivelacion IGN",legend:true  },
							{nodeType: "gx_layer", layer: "Relevamientos",legend:true  }
						]
				});
 		/*
		 * Layers nuestros: Mantenimiento
		 */
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
				
audiovisual=[
		new OpenLayers.Layer.WMS("Videos Sobrevuelo",wmsURL,
			{layers: 'dipsoh:vuelos_helicoptero_vista',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Videos VANT",wmsURL,
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
		new OpenLayers.Layer.WMS("Ortomosaicos",wmsURL,
			{layers: ['dipsoh:ortomosaicos_vista','dipsoh:ortomosaicos_raster'],transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Videos Tierra",wmsURL,
			{layers: 'dipsoh:tierra_vista',transparent: true, format:'image/png', singleTile: true },
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
							{nodeType: "gx_layer", layer: "Videos VANT"},
							{nodeType: "gx_layer", layer: "Videos Sobrevuelo"},
							{nodeType: "gx_layer", layer: "Videos Tierra"},
							{nodeType: "gx_layer", layer: "Fotos"},
							{nodeType: "gx_layer", layer: "Ortomosaicos"}
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
		/*
		 * Layers nuestros: Capas meteorologicas
		 
meteorologicas=[
		new OpenLayers.Layer.WMS("Temperaturas",wmsURL,
			{layers: 'dipsoh:capa_temperatura',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Isotermas",wmsURL,
			{layers: 'dipsoh:isotermas_v',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Niveles",wmsURL,
			{layers: 'dipsoh:niveles',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento actual",wmsURL,
			{layers: 'dipsoh:vientos_00',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +03hs",wmsURL,
			{layers: 'dipsoh:vientos_03',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +06hs",wmsURL,
			{layers: 'dipsoh:vientos_06',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +12hs",wmsURL,
			{layers: 'dipsoh:vientos_12',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Viento +24hs",wmsURL,
			{layers: 'dipsoh:vientos_24',transparent: true, format:'image/png', singleTile: true },
			{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +24hs",wmsURL,
			{layers: 'dipsoh:ola_calor_24',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +48hs",wmsURL,
			{layers: 'dipsoh:ola_calor_48',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +72hs",wmsURL,
			{layers: 'dipsoh:ola_calor_72',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Ola calor +96hs",wmsURL,
			{layers: 'dipsoh:ola_calor_96',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +03hs",wmsURL,
			{layers: 'dipsoh:prevision_03_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +06hs",wmsURL,
			{layers: 'dipsoh:prevision_06_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +12hs",wmsURL,
			{layers: 'dipsoh:prevision_12_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +24hs",wmsURL,
			{layers: 'dipsoh:prevision_24_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +36hs",wmsURL,
			{layers: 'dipsoh:prevision_36_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +48hs",wmsURL,
			{layers: 'dipsoh:prevision_48_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +72hs",wmsURL,
			{layers: 'dipsoh:prevision_72_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Prevision +96hs",wmsURL,
			{layers: 'dipsoh:prevision_96_mm',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +03hs",wmsURL,
			{layers: 'dipsoh:prevision_03_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +06hs",wmsURL,
			{layers: 'dipsoh:prevision_06_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +12hs",wmsURL,
			{layers: 'dipsoh:prevision_12_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +24hs",wmsURL,
			{layers: 'dipsoh:prevision_24_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +36hs",wmsURL,
			{layers: 'dipsoh:prevision_36_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +48hs",wmsURL,
			{layers: 'dipsoh:prevision_48_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +72hs",wmsURL,
			{layers: 'dipsoh:prevision_72_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),
		new OpenLayers.Layer.WMS("Acumulada +96hs",wmsURL,
			{layers: 'dipsoh:prevision_96_acc',transparent: true, format:'image/png', singleTile: true },
			{opacity: 0.75,visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)
	]
layerItems=layerItems.concat(meteorologicas);
treeTheme[1].children.push({
					text:'Capas meteorologicas',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Temperaturas"},
							{nodeType: "gx_layer", layer: "Isotermas"}, 
							{nodeType: "gx_layer", layer: "Niveles"},
							{text:'Viento',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Viento actual"},
										{nodeType: "gx_layer", layer: "Viento +03hs"}, 
										{nodeType: "gx_layer", layer: "Viento +06hs"},
										{nodeType: "gx_layer", layer: "Viento +12hs"}, 
										{nodeType: "gx_layer", layer: "Viento +24hs"}
									]
							},
							{text:'Prevision ola de calor',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Ola calor +24hs"},
										{nodeType: "gx_layer", layer: "Ola calor +48hs"}, 
										{nodeType: "gx_layer", layer: "Ola calor +72hs"},
										{nodeType: "gx_layer", layer: "Ola calor +96hs"}
									]
							},
							{text:'Prevision de precipitaciones',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Prevision +03hs"},
										{nodeType: "gx_layer", layer: "Prevision +06hs"}, 
										{nodeType: "gx_layer", layer: "Prevision +12hs"},
										{nodeType: "gx_layer", layer: "Prevision +24hs"}, 
										{nodeType: "gx_layer", layer: "Prevision +36hs"},
										{nodeType: "gx_layer", layer: "Prevision +48hs"},
										{nodeType: "gx_layer", layer: "Prevision +72hs"},
										{nodeType: "gx_layer", layer: "Prevision +96hs"}
									]
							},
							{text:'Precipitaciones acumuladas',expanded:false, children:
									[
										{nodeType: "gx_layer", layer: "Acumulada +03hs"},
										{nodeType: "gx_layer", layer: "Acumulada +06hs"},
										{nodeType: "gx_layer", layer: "Acumulada +12hs"},
										{nodeType: "gx_layer", layer: "Acumulada +24hs"},
										{nodeType: "gx_layer", layer: "Acumulada +36hs"},
										{nodeType: "gx_layer", layer: "Acumulada +48hs"},
										{nodeType: "gx_layer", layer: "Acumulada +72hs"},
										{nodeType: "gx_layer", layer: "Acumulada +96hs"}										
									]
							},
						]
				});
		*/
		
		
		/*
		 * Layers nuestros: Descargas
		 */
descargas=[		 
		layerPartidos_descarga = new OpenLayers.Layer.WMS("Descarga_Partidos_DWG",wmsURL,
			{layers: 'dipsoh:departamentos_descarga',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		),

		new OpenLayers.Layer.WMS("Descarga_Cartas_IGN50000",wmsURL,
			{layers: 'dipsoh:cartas050igm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)/*,
		new OpenLayers.Layer.WMS("Descarga_MDT_IGN",wmsURL,
			{layers: 'dipsoh:cartas100igm',transparent: true, format:'image/png', singleTile: true },{visibility: false, displayInLayerSwitcher:false, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
					wfs: {
						protocol: 'fromWMSLayer',
						downloadFormats:Heron.options.wfs.downloadFormats
						}
					}
			}
		)*/
	]
layerItems=layerItems.concat(descargas);
treeTheme[1].children.push({
					text:'Descargas',expanded:false, children:
						[
							{nodeType: "gx_layer", layer: "Descarga_Cartas_IGN50000" ,text:"Descarga cartas IGN 1:50K",legend:true },
							{nodeType: "gx_layer", layer: "Descarga_Partidos_DWG" ,text:"Descarga de partidos en DWG",legend:true }//,
							//{nodeType: "gx_layer", layer: "Descarga_MDT_IGN" ,text:"Descarga MDT IGN 1:50K",legend:true }
						]
				});	

		//http://www.geobasig.com.ar:8080/geoserver/Geodesia/wms?SERVICE=WMS&LAYERS=Parcelario_Transparente (layer geodesia) http://geobasig.com.ar/geoserver29/Geodesia/wms?
		//http://www.geoinfra.mosp.gba.gov.ar/geoserver/Geoinfra/wms?LAYERS=parcelario_completo
