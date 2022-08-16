function armarNomencla(){ //arma la nomenclatura para la busqueda por nomencla
	var part = Ext.getCmp('form_part').getValue();
	var circ = Ext.getCmp('form_circ').getValue();
	var secc = Ext.getCmp('form_secc').getValue();
	var chac = Ext.getCmp('form_chacra').getValue();
	var quin = Ext.getCmp('form_quinta').getValue();
	var frac = Ext.getCmp('form_fraccion').getValue();
	var manz = Ext.getCmp('form_manzana').getValue();
	var pnum = Ext.getCmp('form_pnum').getValue();
	var plet = Ext.getCmp('form_plet').getValue();
	var rejunte=chac+quin+frac+manz;
	rejunte=rejunte.replace(/\s+/g,'');
	rejunte=rejunte.split('').join('%');
	Ext.getCmp('form_nomencla').setValue(part+circ+secc+"%"+rejunte+"%"+pnum+plet);
}
			
function convertNomencla(value){ //funcion para convertir la nomenclatura en un formato legible
				var nomencla='';
				var convert=[
					["Pt:",0,3],[" Circ:",3,5],[" Secc:",5,7],
					[" Ch:",7,11],["",11,14],[" Qt:",14,18],["",18,21],
					[" Fr:",21,25],["",25,28],[" Mz:",28,32],["",32,35],
					[" Pc:",35,39],["",39,42]
					];
				for (var i=0; i<13; i++) {
					var k=convert[i][2];
					for (var j=convert[i][1]; j<k;j++){
						if(value.substring(j,j+1)!='0'){
						nomencla+=convert[i][0]+value.substring(j,k);
						j=k;
						}
					}
				}
			   return nomencla;
}

var partidos=[  
["Adolfo Alsina","1"],["Alberti","2"],["Almirante Brown","3"],["Ameghino","128"],["Arrecifes","10"],["Avellaneda","4"],["Ayacucho","5"],["Azul","6"],
["Bahia Blanca","7"],["Balcarce","8"],["Baradero","9"],["Berazategui","120"],["Berisso","114"],["Bolivar","11"],["Bragado","12"],
["Brandsen","13"],["CaÃ±uelas","15"],["Campana","14"],["Capitan Sarmiento","121"],["Carlos Casares","16"],["Carlos Tejedor","17"],
["Carmen de Areco","18"],["Castelli","20"],["Chacabuco","26"],["Chascomus","27"],["Chivilcoy","28"],["Colon","21"],["Coronel Dorrego","22"],
["Coronel Pringles","23"],["Coronel Rosales","113"],["Coronel Suarez","24"],["Daireaux","19"],["Dolores","29"],["Ensenada","115"],
["Escobar","118"],["Esteban Echeverria","30"],["Exaltacion de la Cruz","31"],["Ezeiza","130"],["Florencio Varela","32"],["General Alvarado","33"],
["General Alvear","34"],["General Arenales","35"],["General Belgrano","36"],["General Guido","37"],["General Lamadrid","40"],
["General Las Heras","41"],["General Lavalle","42"],["General Madariaga","39"],["General Paz","43"],["General Pinto","44"],["General Pueyrredon","45"],
["General Rodriguez","46"],["General San Martin","47"],["General Viamonte","49"],["General Villegas","50"],["Gonzalez Chavez","51"],["Guamini","52"],
["Hipolito Yrigoyen","119"],["Hurlingham","135"],["Islas Baradero","309"],["Islas Campana","314"],["Islas Ramallo","387"],["Islas San Fernando","396"],
["Islas San Nicolas","398"],["Islas San Pedro","399"],["Islas Tigre","357"],["Islas Zarate","338"],["Ituzaingo","136"],["Jose C. Paz","132"],["Juarez","53"],
["Junin","54"],["La Costa","123"],["La Plata","55"],["Lanus","25"],["Laprida","56"],["Las Flores","58"],["Leandro N. Alem","59"],["Lezama","137"],["Lincoln","60"],
["Loberia","61"],["Lobos","62"],["Lomas de Zamora","63"],["Lujan","64"],["Magdalena","65"],["Maipu","66"],["Malvinas Argentinas","133"],["Mar Chiquita","69"],
["Marcos Paz","68"],["Matanza","70"],["Mercedes","71"],["Merlo","72"],["Monte","73"],["Monte Hermoso","126"],["Moreno","74"],["Moron","101"],["Navarro","75"],
["Necochea","76"],["Nueve de Julio","77"],["Olavarria","78"],["Patagones","79"],["Pehuajo","80"],["Pellegrini","81"],["Pergamino","82"],["Pila","83"],["Pilar","84"],
["Pinamar","124"],["Pte. Peron","129"],["Puan","85"],["Punta Indio","134"],["Quilmes","86"],["Ramallo","87"],["Rauch","88"],["Rivadavia","89"],["Rojas","90"],["Roque Perez","91"],
["Saavedra","92"],["Saladillo","93"],["Salliquelo","122"],["Salto","67"],["San Andres de Giles","94"],["San Antonio de Areco","95"],["San Cayetano","116"],["San Fernando","96"],
["San Isidro","97"],["San Miguel","131"],["San Nicolas","98"],["San Pedro","99"],["San Vicente","100"],["Suipacha","102"],["Tandil","103"],["Tapalque","104"],["Tigre","57"],
["Tordillo","105"],["Tornquist","106"],["Trenque Lauquen","107"],["Tres Arroyos","108"],["Tres de Febrero","117"],["Tres Lomas","127"],["Veinticinco de Mayo","109"],
["Vicente Lopez","110"],["Villa Gesell","125"],["Villarino","111"],["Zarate","38"]
];
	
var gridCellRenderers=[
{
   featureType: 'LimpiezaCooperativas2015', 
   attrName: 'expediente',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				  var val2=value.replace('/','-').replace(' Alc:','-').replace(' Cpo:','-').replace(' ','');
				  var array=val2.split('-');
				  return '<a href="http://sistemas.gba.gov.ar/consulta/expedientes/movimientos.php?caract='+array[0]+'&nroexp='+array[1]+'&anioexp='+array[2]+'&alcance=0&nrocuerpo=1" target="_blank">'+value+'</a>';
		   }
	}
},
{
   featureType: 'parcelas_rt_geom',
   attrName: 'plano_rt',
    renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.minfra.gba.gov.ar/sig_hidraulica/planos/planos.asp?partido=0&todos=s&numpla='+value+'" target="_new">'+ value +'</a>';
			}
   }
},
{
   featureType: 'parcelas_rt_geom',
   attrName: 'ultimo_plano',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.minfra.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   },
   }
},
{
   featureType: 'parcelas_con_plano_geom',
   attrName: 'plano',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.minfra.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   }
   }
},
{
   featureType: 'parcelas_con_plano_geom',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) { //funcion para convertir nomencla en human friendly
			  return convertNomencla(value);
		   },
		   options : {}
   }
},
{
   featureType: 'departamentos',
   attrName: 'PARTIDO',
   renderer: {
		   fn : Heron.widgets.GridCellRenderer.directLink,
		   options : {
				   url: 'http://www.minfra.gba.gov.ar/sig_hidraulica/planos/planos.asp?partido={PARTIDO}',
				   target: '_new'
		   }
   }
},
{
   featureType: 'dipsoh_obras_ref',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																				
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'obras_sigos_line',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																				
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'dipsoh_obras_sigos_total',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){															
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
				}else return value;
				},
		   options : {}
			}
},
{
   featureType: 'obras_dipsoh_por_etapa',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'cartas050igm',
   attrName: 'CODIGO',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){
				   return '<a href="./php/descargaIGN.php?codigo='+value+'&faja='+record.data.Faja+'" target="_blank">'+ value +'</a>';
				   }else return value;
		   },
		   options : {}
   }
},
{
   featureType: 'cartas100igm',
   attrName: 'codigo_0',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){
				   return '<a href="http://ramsac.ign.gob.ar/posgar07_pg_web/modelo_100000_descarga.php?p=1&c='+value+'" target="_blank">'+ value +'</a>';
				   }else return value;
		   },
		   options : {}
   }
},
{
   featureType: 'departamentos_descarga',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="./php/descargaDWG.php?codigo='+value+'&fajaOrig=NO" target="_blank">Faja 5</a> - <a href="./php/descargaDWG.php?codigo='+value+'&fajaOrig=SI" target="_blank">Faja Origen</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'parcelas',
   attrName: 'plano',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.minfra.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'parcelas',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				return convertNomencla(value);
		   },
		   options : {}
   }
}];

var uploadFormats=[
	 {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
	 {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML'},
	 {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
	 {name: 'CSV (with X,Y)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
	 {name: 'ESRI Shape (zip, WGS84/EPSG:4326)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
	 {name: 'ESRI Shape (zip, EPSG:3857, EPSG:900913 - Google)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:900913')},
	 {name: 'ESRI Shape (zip, Campo Inchauspe faja 5 - EPSG:22195)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22195')},
	 {name: 'DXF (Faja 5 - EPSG:22195)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22195')},
	 {name: 'DXF (Faja 6 - EPSG:22196)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22196')},
	 {name: 'DXF (Faja 4 - EPSG:22194)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22194')}
];
							
var downloadFormats=[
					{
						name: '(las descargas están deshabilitadas en el visor público)',
						//formatter: 'OpenLayersFormatter',
						//format: 'OpenLayers.Format.GeoJSON',
						//targetFormat: 'ESRI Shapefile',
						//targetSrs: 'EPSG:22194',
						//fileExt: '.zip',
						mimeType: 'application/zip'
					}
					];
							
var resultPanel={
					xtype: 'hr_featurepanel',
					id: 'hr-featurepanel',
					header: false,
					border: false,
					autoConfig: true,
					showBottomToolbar:false,
					showTopToolbar:false,
					exportFormats: downloadFormats,
					//gridCellRenderers: gridCellRenderers,
					hropts: {
						zoomOnRowDoubleClick: true,
						zoomOnFeatureSelect: false,
						zoomLevelPointSelect: 8,
						zoomToDataExtent: false
					}
				};
							
var toolBarItems=[
		{type: "featureinfo", options: {
        pressed: true,
		text: 'Información',
		iconCls: 'binfo',
		popupWindow: {
            width: 320,
            height: 200,
            featureInfoPanel: {
				showTopToolbar: true,
				showBottomToolbar: true,
                //displayPanels: ['Table'],
				displayPanels: ['Table','Detail'],
                exportFormats: downloadFormats,
                hideColumns: ['objectid', 'gid'],
                maxFeatures: 10,
                autoConfigMaxSniff: 10,
				//gridCellRenderers: gridCellRenderers,
                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
				}
			}
		}},
		//{type: "scale", options: {width: 110}},
		{type: "-"} ,
		{type: "pan", options: {
			pressed: true,
			text: 'Navegación',
			iconCls: 'bnav'
			}
		},
		{type: "zoomin"},
		{type: "zoomout"},
		{type: "zoomvisible"},
		{type: "zoomprevious"},
		{type: "zoomnext"},
		{type: "-"},
		{type: "measurelength", options: {
			geodesic: true,
			text: 'Medición',
			iconCls: 'bmed'//,
			//tooltip: "Herramientas de medición",
			}},
		{type: "measurearea", options: {geodesic: true}},
		{type: "-"}, 
		/*{type: "any",
			options: {
				text: 'Búsqueda',
				tooltip: "Herramientas búsqueda y consultas",
				disabled: true
			}
		},*/
		{
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
			iconCls: 'bsearch',
			text: 'Búsqueda',
            show: false,
				searchWindow: {
					title: __('Multiple Searches'),
					x: 100,
					y: undefined,
					width: 360,
					height: 440,
					items: [
						{
						xtype: 'hr_multisearchcenterpanel',
						height: 600,
						hropts: [
								{
									searchPanel: {
										xtype: 'hr_searchbydrawpanel',
										name: __('Search by Drawing'),
										header: false
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbyfeaturepanel',
										name: __('Search by Feature Selection'),
										description: 'Seleccione objetos espaciales de una capa y realize una busqueda espacial basada en ellos en otra capa.',
										header: false,
										border: false,
										bodyStyle: 'padding: 6px',
										style: {
											fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
											fontSize: '12px'
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbybuffer',
										name: __('Busqueda por buffer'),
										description: 'Seleccione objetos espaciales de una capa y realize una busqueda espacial basada en un buffer.',
										header: false,
										border: false,
										bodyStyle: 'padding: 6px',
										style: {
											fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
											fontSize: '12px'
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_gxpquerypanel',
										name: 'Busqueda por atributos',
										description: 'Busqueda por recuadro y por atributos',
										header: false,
										border: false,
										caseInsensitiveMatch: true,
										autoWildCardAttach: true
									},
									resultPanel: resultPanel
								}
							]
						}
					]
				}
			}
		},
		{type: "coordinatesearch", options: {

				// see ToolbarBuilder.js
					  formWidth: 320
					, formPageX: 15
					, formPageY: 200
				// see CoordSearchPanel.js
					// , title: 'My title'
					, titleDescription: 'Elija la proyección de entrada...<br><br>Luego ingrese los valores Lon/Lat o las coordenadas<br>X/Y.<br>&nbsp;<br>'
					, titleDescriptionStyle: 'font-size:11px; color:dimgrey;'
					, bodyBaseCls: 'x-form-back'
					, bodyItemCls: 'hr-html-panel-font-size-11'
					, bodyCls: 'hr-html-panel-font-size-11'
					, fieldMaxWidth: 200
					, fieldLabelWidth: 80
					, fieldStyle: 'color: blue;'
					, fieldLabelStyle: 'color: darkblue'
					, layerName: 'Lon/Lat'
					, onProjectionIndex: 1
					, onZoomLevel: -1
					, showProjection: true
					, showZoom: true
					, showAddMarkers: true
					, checkAddMarkers: true
					, showHideMarkers: true
					, checkHideMarkers: false
					, showResultMarker: true
					, fieldResultMarkerStyle: 'color: green;'
					, fieldResultMarkerText: 'Posicion del marcador: '
					, fieldResultMarkerSeparator: ' | '
					, fieldResultMarkerPrecision: 4
					, removeMarkersOnClose: true
					, showRemoveMarkersBtn: true
					, buttonAlign: 'center'		// left, center, right
					, hropts: [
						{
							  projEpsg: 'EPSG:22195'
							, projDesc: 'EPSG:22195 - Campo Inchauspe/Faja5'
							, fieldLabelX: 'X [m]'
							, fieldLabelY: 'Y [m]'
							, fieldEmptyTextX: 'Ingrese coordenada X...'
							, fieldEmptyTextY: 'Ingrese coordenada Y...'
							, fieldMinX: 4500000
							, fieldMinY: 5000000
							, fieldMaxX: 6500000
							, fieldMaxY: 7000000
							, fieldDecPrecision: 2
							, iconWidth: 32
							, iconHeight: 32
							, localIconFile: 'redpin.png'
							, iconUrl: null
						},
						{
							  projEpsg: 'EPSG:4326'
							, projDesc: 'EPSG:4326 - WGS 84'
							, fieldLabelX: 'Lon [Grad]'
							, fieldLabelY: 'Lat [Grad]'
							, fieldEmptyTextX: 'Ingrese Longitud...'
							, fieldEmptyTextY: 'Ingrese Latitud...'
							, fieldMinX: -180
							, fieldMinY: -90
							, fieldMaxX: 180
							, fieldMaxY: 90
							, fieldDecPrecision: 6
							, iconWidth: 32
							, iconHeight: 32
							, localIconFile: 'bluepin.png'
							, iconUrl: null
						}
					]

		// ====================================

		}},
		//GObec.streetview.toolbar,
		{
		type: "any",
		options: {
			text: '',
			tooltip: 'Buscar con Google Places',
			iconCls: 'icon-map-magnify',
			id: "googleSearch",
			handler: function (objRef) {
				if (!searchWin) {
					searchWin = new Ext.Window({
						title: "Find",
						layout: 'fit',
						width: 400,
						height: 70,
						plain: true,
						closeAction: 'hide',
						html: '<div style="padding: 5px" id="searchContent"><input style="width: 370px" type="text" id="gAddress" name="gAddress" value="" /></div>',
						x: 300,
						y: 100
					});
				}
				if (typeof(objRef) === "object") {
					searchWin.show(objRef);
				} else {
					searchWin.show();
				}//end if object reference was passed
				var input = document.getElementById('gAddress');
				var options = {
					//bounds: defaultBounds
					//types: ['establishment']
				};
				var autocomplete = new google.maps.places.Autocomplete(input, options);
				//console.log(autocomplete.getBounds());
				google.maps.event.addListener(autocomplete, 'place_changed', function () {
					var place = autocomplete.getPlace();
					var transformPoint = function (lat, lon, s, d) {
						var p = [];
						if (typeof Proj4js === "object") {
							var source = new Proj4js.Proj(s);    //source coordinates will be in Longitude/Latitude
							var dest = new Proj4js.Proj(d);
							p = new Proj4js.Point(lat, lon);
							Proj4js.transform(source, dest, p);
						}
						else {
							p.x = null;
							p.y = null;
						}
						return p;
					};
					var p = transformPoint(place.geometry.location.lng(), place.geometry.location.lat(), "EPSG:4326", "EPSG:900913");
					var point = new OpenLayers.LonLat(p.x, p.y);
					Heron.App.map.setCenter(point, 12);
					try {
						placeMarkers.destroy();
					} catch (e) {
					}

					placeMarkers = new OpenLayers.Layer.Markers("Markers");
					Heron.App.map.addLayer(placeMarkers);
					placeMarkers.addMarker(new OpenLayers.Marker(point));
					});

				}
			}
		},
		{type: "-"},
		{type: "printdialog", options: {
			iconCls: 'bimp',
			text: 'Impresión',
			url: 'http://www.minfra.gba.gov.ar/sig_hidraulica/print/pdf' , 
			windowWidth: 360, 
			id:'prevImpresion'
			// , showTitle: true
			 , mapTitle: 'Sig DiPSOH'
			// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
			// , showComment: true
			 , mapComment: 'Provincia de Buenos Aires'
			// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
			// , showFooter: true
			// , mapFooter: 'My Footer - Print Dialog'
			// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
			// , showRotation: true
			// , showLegend: true
			, showLegendChecked: true
			, showOutputFormats: true
			// , mapLimitScales: false
		  }
		},/*
		{  //print screen
			
			create : function(mapPanel, options) {
				// A trivial handler
				options.handler = function() {
				Ext.getCmp('hr-menu-left-container').collapse(true);
				window.print();
				};
				// Provide an ExtJS Action object
				// If you use an OpenLayers control, you need to provide a GeoExt Action object.
				return new Ext.Action(options);
			},

			// Options to be passed to your create function. 
			options : {
				tooltip: 'Imprimir Pantalla',
				iconCls: "icon-printscr",
				enableToggle : false,
				pressed : false,
				id: "print",
				toggleGroup: "toolGroup",
				msg: 'Imprimir Pantalla'
			 }
			
		},*/
		{type: "-"},
		{type: "oleditor", options: {
			iconCls: "bedit",
			text: 'Edición',
			pressed: false,
			// Options for OLEditor
			olEditorOptions: {
					activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
					featureTypes: ['text', 'regular', 'polygon', 'path', 'point'],
					language: 'en',
					DownloadFeature: {
							url: serverURL+'/cgi-bin/heron.cgi',
							formats:uploadFormats,
							// For custom projections use Proj4.js
							fileProjection: new OpenLayers.Projection('EPSG:4326')
					},
					UploadFeature: {
							url: serverURL+'/cgi-bin/heron.cgi',
							formats:uploadFormats,
							// For custom projections use Proj4.js
							fileProjection: new OpenLayers.Projection('EPSG:4326')
					}
				}
			}
         },
		 {type: "upload", options: {
				upload: {
				 layerName: __('My Upload'),
				 visibleOnUpload: true,
				 url: serverURL+'/cgi-bin/heron.cgi',
				 params: {
					 action: 'upload',
					 mime: 'text/html',
					 encoding: 'escape'
				 },
				 formats: uploadFormats,
				 // For custom projections use Proj4.js
				 fileProjection: new OpenLayers.Projection('EPSG:4326')
				}

			}
		},
		{type: "-"},
		{type: "help", options: {tooltip: 'Ayuda', contentUrl: 'help.html'}},
		{  //cerrar sesion
			create : function(mapPanel, options) {
				// A trivial handler
				options.handler = function() {
				window.location.href="./controller/cerrarSesion.php";
				};
				// Provide an ExtJS Action object
				// If you use an OpenLayers control, you need to provide a GeoExt Action object.
				return new Ext.Action(options);
			},

			// Options to be passed to your create function.
			options : {
				tooltip: 'Cerrar Sesion',
				text: 'Cerrar Sesion '+usuario,
				//iconCls: "icon-printscr",
				enableToggle : false,
				pressed : false,
				id: "print",
				toggleGroup: "toolGroup",
				msg: 'Cerrar sesion'
			 }
			
		}
	]