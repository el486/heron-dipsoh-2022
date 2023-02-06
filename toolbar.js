function armarNomencla(){ //arma la nomenclatura para la busqueda por nomencla

	var circ = Ext.getCmp('form_circ').getValue();
	var secc = Ext.getCmp('form_secc').getValue();
	var chac = Ext.getCmp('form_chacra').getValue();
	var quin = Ext.getCmp('form_quinta').getValue();
	var frac = Ext.getCmp('form_fraccion').getValue();
	var manz = Ext.getCmp('form_manzana').getValue();
	var pnum = Ext.getCmp('form_pnum').getValue();
	Ext.getCmp('form_nomencla').setValue(circ+secc+chac+quin+frac+manz+pnum);
	
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

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

//agregar popup https://www.geoinfra.minfra.gba.gob.ar/historial.php?nomencla=011070000000000000000000000000000000653000	
var gridCellRenderers=[
{
   featureType: 'estaciones_permanentes_ign', 
   attrName: 'name',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				// Encode the String
				var encodedValue = Base64.encode(value);
				return '<a href="http://www.ign.gob.ar/archivos/ramsac/estacion2.php?estacion='+value+'" target="_blank">'+value+'</a><br><a href="http://ramsac.ign.gob.ar/ver_formulario.php?e='+encodedValue+'" target="_blank">PDF</a>';
		   }
	}
}, //dipsoh:Lujan_ManchaSituacionActual-Rec2
/*
{
   featureType: 'Lujan_ManchaSituacionActual-Rec2',
   attrName: 'GRAY_INDEX',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (value > 0){
				return value;
				}else{ return 'Sin Datos'; }
		   },
   }
},
{
   featureType: 'Lujan_ManchaSituacionActual-Rec5',
   attrName: 'GRAY_INDEX',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (value > 0){
				return value;
				}else{ return 'Sin Datos'; }
		   },
   }
},
{
   featureType: 'Lujan_ManchaSituacionActual-Rec10',
   attrName: 'GRAY_INDEX',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (value > 0){
				return value;
				}else{ return 'Sin Datos'; }
		   },
   }
},
{
   featureType: 'Lujan_ManchaSituacionActual-Rec25',
   attrName: 'GRAY_INDEX',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (value > 0){
				return value;
				}else{ return 'Sin Datos'; }
		   },
   }
},
{
   featureType: 'Lujan_ManchaSituacionActual-Rec50',
   attrName: 'GRAY_INDEX',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (value > 0){
				return value;
				}else{ return 'Sin Datos'; }
		   },
   }
},
{
   featureType: 'Lujan_ManchaSituacionActual-Rec100',
   attrName: 'GRAY_INDEX',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (value > 0){
				return value;
				}else{ return 'Sin Datos'; }
		   },
   }
},
*/

/*
{
   featureType: 'Mantenimiento_AnalisisZonaVIII',
   attrName: 'name',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if (record.data.base==300){
				return '<a href="javascript:void(0)" onclick="popupFoto(\''+value+'\');">' + value + '</a>';
				}else{ return value; }
		   },
   }
},
{
   featureType: 'mantenimiento_relevamientos_kml',
   attrName: 'Description',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				
				return '<a href="javascript:void(0)" onclick="popupHTML(\''+Base64.encode(value)+'\');">' + value + '</a>';
				
		   },
   }
},*/
{
   featureType: 'nivelacion_ign',
   attrName: 'link',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://ramsac.ign.gob.ar/posgar07_pg_web/index.php?frm=punto_nivelacion&nxt=punto_nivelacion_ver&'+value+'" target="_blank">Ver</a>';
		   },
   }
},
{
   featureType: 'estaciones_medicion',
   attrName: 'estacion',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																				
				   return '<a href="./php/verMediciones.php?cod='+value+'&tipo='+record.data.oid_+'" target="_blank">'+ value +'</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'estaciones_historico_salado',
   attrName: 'codest',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
					var v=parseInt(value);															
				   return '<a href="./php/verMediciones.php?cod='+v+'&tipo=h" target="_blank">'+v+'</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'parcelas_rt_geom',
   attrName: 'plano_rt',
    renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.minfra.gba.gob.ar/sig_hidraulica/planos/planos.asp?partido=0&todos=s&numpla='+value+'" target="_new">'+ value +'</a>';
			}
   }
},
{
   featureType: 'parcelas_rt_geom',
   attrName: 'ultimo_pla',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="https://www.geoinfra.minfra.gba.gob.ar/lista_lamina.php?plano='+value+' " target="_blank">'+ value +'</a>';
		   },
   }
},
{
   featureType: 'parcelas_vista_arba_2023',
   attrName: 'plano',
   renderer: {
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.geoinfra.minfra.gba.gob.ar/planos/'+value+'(PA).dwf " target="_blank">'+ value +'</a>';
		   }
   }
},
{
   featureType: 'parcelas_vista_arba_2023',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) { //funcion para convertir nomencla en human friendly
			  //return convertNomencla(value);
			  //return '<a href="javascript:void(0)" onclick="popupPlanos(\''+value+'\');">Historial Planos</a>';
			  return '<a href="https://www.geoinfra.minfra.gba.gob.ar/historial.php?nomencla='+value+'" target="_blank">Historial planos</a>'; 
		   },
		   options : {}
   }
},
{
   featureType: 'obras_sigos_ref',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   																	
				   return '<a href="./php/descargaArchObra.php?codigo='+value+'" target="_blank">'+value+'</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'obras_dph_line',
   attrName: 'id_obra',
   renderer:{
		   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																				
				   return '<a href="./php/descargaArchObra.php?codigo='+value+'" target="_blank">'+ value +'</a>';
		   },
		   options : {}
   }
},
{
   featureType: 'cartas050igm',
   attrName: 'codigo',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				if(value.substring(0,7)!='Buffer:'){
				   return value +'  <a href="./php/descargaIGN.php?codigo='+value+'&faja='+record.data.faja+'" target="_blank">ORIGINAL</a> - <a href="./php/descargaIGN_posgar2007.php?codigo='+value+'" target="_blank">POSGAR07</a>';
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
   featureType: 'conductos_con_planilla',
   attrName: 'text',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="./php/verPDF.php?codigo='+value+'" target="_blank">'+value+'</a>';
		   },
		   options : {}
   }
},
/*{
   featureType: 'parcelas',
   attrName: 'plano',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				   return '<a href="http://www.minfra.gba.gob.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
		   },
		   options : {}
   }
},*/
{
   featureType: 'parcelas_vista_arba_2023',
   attrName: 'nomencla',
   renderer: {
			fn : function(value, metaData, record, rowIndex, colIndex, store) {
				//return '<a href="javascript:void(0)" onclick="popupPlanos(\''+value+'\');">' + value + '</a>';
				return '<a href="https://www.geoinfra.minfra.gba.gob.ar/historial.php?nomencla='+value+'" target="_blank">'+ value +'</a>';
		   },
		   options : {}
   }
}
];

var uploadFormats=[
	 {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
	 {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML'},
	 {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
	 {name: 'CSV (with X,Y)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
	 {name: 'ESRI Shape (zip, WGS84/EPSG:4326)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
	 {name: 'ESRI Shape (zip, EPSG:3857, EPSG:900913 - Google)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:900913')},
	 {name: 'ESRI Shape (zip, Campo Inchauspe faja 5 - EPSG:22195)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22195')},
	 {name: 'DXF (Posgar07 Faja 5 - EPSG:5347)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:5347')},
	 {name: 'DXF (Posgar07 Faja 6 - EPSG:5348)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:5348')},
	 {name: 'DXF (Posgar07 Faja 4 - EPSG:5346)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:5346')},
	 {name: 'DXF (Campo inchauspe Faja 5 - EPSG:22195)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22195')},
	 {name: 'DXF (Campo inchauspe Faja 6 - EPSG:22196)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22196')},
	 {name: 'DXF (Campo inchauspe Faja 4 - EPSG:22194)', fileExt: '.dxf', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22194')}
];
							
var downloadFormats=['CSV',
					 'XLS',
					{
						name: 'KML (Google Earth)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'KML',
						targetSrs: 'EPSG:4326',
						fileExt: '.kml',
						mimeType: 'application/kml'
					},
					{
						name: 'Esri Shapefile (Posgar07 faja 4 - EPSG:5346)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:5346',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'Esri Shapefile (Posgar07 faja 5 - EPSG:5347)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:5347',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'Esri Shapefile (Posgar07 faja 6 - EPSG:5348)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:5348',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'DXF (Posgar 07 faja 4 - EPSG:5346)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:5346',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Posgar 07 faja 5 - EPSG:5347)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:5347',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Posgar 07 faja 6 - EPSG:5348)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:5348',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'Esri Shapefile (Campo Inchauspe faja 4 - EPSG:22194)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:22194',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'Esri Shapefile (Campo Inchauspe faja 5 - EPSG:22195)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:22195',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'Esri Shapefile (Campo Inchauspe faja 6 - EPSG:22196)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:22196',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'DXF (Campo Inchauspe faja 4 - EPSG:22194)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22194',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Campo Inchauspe faja 5 - EPSG:22195)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22195',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Campo Inchauspe faja 6 - EPSG:22196)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22196',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					}//,
					/*{
						name: 'DXF (POSGAR 94 faja 4 - EPSG:22184)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22184',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (POSGAR 94 faja 5 - EPSG:22185)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22185',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (POSGAR 94 faja 6 - EPSG:22186)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22186',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},*/
					
					];
							
var resultPanel={
					xtype: 'hr_featurepanel',
					id: 'hr-featurepanel',
					header: false,
					border: false,
					autoConfig: true,
					showBottomToolbar:true,
					showTopToolbar:true,
					exportFormats: downloadFormats,
					gridCellRenderers: gridCellRenderers,
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
				gridCellRenderers: gridCellRenderers,
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
									searchPanel: { 						//busqueda de parcelas por partida/partido
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda parcelas Arba por partido y partida',
										description: 'Busqueda de parcelas Arba por partido y partida inmobiliaria',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wms"
											,featureType: "parcelas_vista_arba_2023"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{	
												xtype:'combo',
												fieldLabel: '  Partido',
												name: "partido",
												typeAhead: true,
												width: 150,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												tpl: '<tpl for="."><div ext:qtip="{tip}" class="x-combo-list-item">{display}</div></tpl>',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: ['display',	'tip'],
													data: partidos
												}),
												listeners: { 'select': function(combo, record, index){ 
														combo.setValue(record.data['tip']);
														label = Ext.getCmp('partido_label');
														label.setText(record.data['display']);
														}  
												}
											},
											{
												xtype: "label",
												id: "partido_label",
												html: '',
												style: {
													padding: '105px'
												}
											},
											{
												 xtype: "textfield",
												 name: "partida",
												 fieldLabel: "  Partida"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Ingrese partido y partida inmobiliaria.<br/>La busqueda puede tardar 10-20 segundos. <br/>Si demora mas es posible que los datos ingresados sean incorrectos',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {								//busqueda de parcelas por nomenclatura
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de parcelas Arba por nomenclatura',
										description: 'Busqueda de parcelas Arba por nomenclatura',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wms"
											,featureType: "parcelas_vista_arba_2023"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{	
												xtype:'combo',
												fieldLabel: '  Partido',
												name: "partido",
												id:'form_part',

												typeAhead: true,
												width: 150,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												tpl: '<tpl for="."><div ext:qtip="{tip}" class="x-combo-list-item">{display}</div></tpl>',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: ['display',	'tip'],
													data: partidos
												}),
												listeners: { 'select': function(combo, record, index){ 

														combo.setValue(record.data['tip']);
														label = Ext.getCmp('partido_label');
														label.setText(record.data['display']);
														}  
												}
											},
											{
												xtype: "label",
												id: "partido_label",
												html: '',
												style: {
													padding: '105px'
												}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_circ',
												fieldLabel: "  Circunscripcion",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Circ:"+val;



														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_secc',
												fieldLabel: "  Seccion",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Secc:"+val;



														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_chacra',
												fieldLabel: "  Chacra",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Ch:"+val;
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_quinta',
												fieldLabel: "  Quinta",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Qt:"+val;
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_fraccion',
												fieldLabel: "  Fraccion",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Fr:"+val;
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_manzana',
												fieldLabel: "  Manzana",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Mz:"+val;
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype: "textfield",
												name: "rural__ne",
												value: '',
												id:'form_pnum',
												fieldLabel: "  Parcela",
												listeners: { 'change': function(e){ 
														var val=(e.getValue());
														val=val.replace(/\s+/g,'');
														val="%Pc:"+val;
														e.setValue(val);
														armarNomencla();
														}}
											},
											{
												xtype:"button",
												//anchor: "20%",
												text: 'Borrar datos',
												listeners: {
													click: function () {
														Ext.getCmp('form_part').setValue('');
														Ext.getCmp('form_circ').setValue('');
														Ext.getCmp('form_secc').setValue('');
														Ext.getCmp('form_chacra').setValue('');
														Ext.getCmp('form_quinta').setValue('');
														Ext.getCmp('form_fraccion').setValue('');
														Ext.getCmp('form_manzana').setValue('');
														Ext.getCmp('form_pnum').setValue('');

														Ext.getCmp('form_nomencla').setValue('');
													}
												}
											},
											{
												xtype: "textfield",
												name: "nomcat__like",
												value: '',
												id:'form_nomencla',
												hidden:true,
												fieldLabel: "  Nomenclatura:",
												listeners: { 'specialkey': function(e){ armarNomencla();}}
											}
											
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {							//busqueda de planos rt
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de planos Rel Territorial',
										description: 'Busqueda de planos Rel Territorial',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wms"
											,featureType: "planos_geom"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{
												xtype: "textfield",
												name: "plano__like",
												//value: '55-',
												fieldLabel: "  Num.Plano"
											},
											{
												 xtype: "textfield",
												 name: "obra__like",
												 fieldLabel: "  Obra"
											},
											{
												 xtype: "textfield",
												 name: "propietario__like",
												 fieldLabel: "  Propietario"
											},
											{
												 xtype: "textfield",
												 name: "expediente__like",
												 fieldLabel: "  Expediente"
											},
											{
												 xtype: "textfield",
												 name: "partido",
												 fieldLabel: "  Partido"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba una parte o un numero de plano completo para buscar.<br/>',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 0,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
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
										description: 'Busqueda por atributos',
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
							  projEpsg: 'EPSG:5347'
							, projDesc: 'EPSG:5347 - Posgar2007/Faja5'
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
		/*{
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
		},*/
		{type: "-"},
		{type: "printdialog", options: {
			iconCls: 'bimp',
			text: 'Impresión',
			url:serverURL+'/print/pdf' , 
			windowWidth: 360, 
			id:'prevImpresion'
			// , showTitle: true
			 , mapTitle: 'Sig DPH'
			// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
			// , showComment: true
			 , mapComment: 'Provincia de Buenos Aires'
			// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
			// , showFooter: true
			// , mapFooter: 'My Footer - Print Dialog'
			// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
			// , showRotation: true
			, showLegend: false
			//, showLegendChecked: true
			, showOutputFormats: true
			// , mapLimitScales: false
		  }
		},
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
		{  //distancias
			
			create : function(mapPanel, options) {
				// A trivial handler
				options.handler = function() {
				Heron.App.map.events.register('click', this , fnclick);
				Ext.getCmp('hr-info-west').expand(true);
				document.getElementById('infoDIV').innerHTML="Haga click sobre el mapa para obtener el cuadro de distancias";
				};
				// Provide an ExtJS Action object
				// If you use an OpenLayers control, you need to provide a GeoExt Action object.
				return new Ext.Action(options);
			},

			/* Options to be passed to your create function. */
			options : {
				tooltip: 'Consultar distancia a puntos fijos',
				iconCls: "icon-dist",
				enableToggle : true,
				pressed : false,
				id: "dist",
				toggleGroup: "toolGroup",
				msg: 'Consultar distancia a puntos fijos'
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