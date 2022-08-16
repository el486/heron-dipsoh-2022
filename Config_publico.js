/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/** api: example[googlemaps]
 *  Google Maps
 *  -----------
 *  Use Google Maps within a Heron app.
 */

//serverURL='http://www.mosp.gba.gov.ar/sig_hidraulica/ms';  //se define en index
Ext.namespace("Heron");
Ext.namespace("Heron.globals");
//Heron.globals.serviceUrl=serverURL+'http://www.mosp.gba.gov.ar/sig_hidraulica/cgi-bin/heron.cgi';
OpenLayers.ProxyHost = serverURL+'/cgi-bin/proxy.cgi?url=';

// Avoid pink tiles (not always)
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
OpenLayers.Util.onImageLoadErrorColor = "transparent";

//console.log(OpenLayers);
//var layerKML;
//var layerParcelas;
//var layerObras;
//var layerBuffer;
var layerOculto;
var mapPanel;
var textoDIV;
var searchWin;

/* deshabilitado por interferir en la busqueda por cruce de capas
var layerOptions = {visibility: false, displayInLayerSwitcher:true, featureInfoFormat: 'application/vnd.ogc.gml',metadata: {
										wfs: {
											protocol: 'fromWMSLayer',
											downloadFormats:Heron.options.wfs.downloadFormats
											}
										}
								};
								
							
*/

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;
//alert(Heron.options.layertree.tree);

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{	xtype: 'panel',
					id: 'hr-container-north',
					region: 'north',
					layout: 'border',
					width: '100%',
					height: 65,
					bodyBorder: false,
					border: true,
					items : [
							{
							xtype: 'hr_htmlpanel',
							id: 'hr-logo-panel',
							region: 'center',
							bodyBorder: false,
							border: false,
							autoLoad: {
								url: 'header.html'//,
							},
							height: 55
							}
					]
		},		
		{
			xtype: 'panel',
			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			collapsed: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_layertreepanel',
					id:'layertree',
					title: 'Arbol de Capas Predefinidas',
					layerIcons: 'bylayertype',
					contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
					hropts: Heron.options.layertree
				},
				{
					xtype: 'panel',
					id: 'hr-info-west',
					html: String.format('<div id="infoMiniDIV" align="center"></div><div id="infoDIV" align="center">'+
										'<input type="hidden" id="numPlano" value="'+planoUrl+'">'+
										'<input type="hidden" id="idObra" value="'+obraUrl+'">'+
										'<input type="hidden" id="etapa">'+
										'<input type="hidden" id="nombre"></div>'),
					preventBodyReset: true,
					title: 'Informacion',
					items:[
							{
								xtype: "grid",
								id: "capasGrid", // makes the grid available as app.capsGrid
								//title: "Capas DiPSOH",
								header:false,
								visible:false,
								collapsible:true,
								collapsed:true,
								viewConfig: {
									stripeRows: true,
									enableTextSelection: true
								},
								store: new GeoExt.data.WMSCapabilitiesStore({
									url: serverURL+"/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1",
									autoLoad: true
								}),
								columns: [
									{header: "Titulo",width: 80, dataIndex: "title", sortable: true, renderer: function(value, metaData, record, rowIndex, colIndex, store) {metaData.css = 'multilineColumn'; return value; }},
									{header: "Resumen",width: 160, dataIndex: "abstract", renderer: function(value, metaData, record, rowIndex, colIndex, store) {metaData.css = 'multilineColumn'; return value; }},
									{header: "SRS",width: 80, dataIndex: "bbox"},
									{header: "capaWms",width: 80, dataIndex: "name"}
								]
							}
					]
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: false,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					id: 'hr-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: {
						settings :
						{
							projection: 'EPSG:900913',
							displayProjection: new OpenLayers.Projection("EPSG:5347"),
							units: 'm',
							//maxExtent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
							tileSize: new OpenLayers.Size(256, 256),
							maxResolution:2445.984904688, 
							//resolutions:[2445.984904688,1222.992452344,611.496226172,305.748113086,152.874056543,76.437028271,38.218514136,19.109257068,9.554628534,4.777314267,2.388657133,1.194328567],  //desactivados para imprimir OSM
							numZoomLevels: 12,
							maxExtent:new OpenLayers.Bounds(-7600000,-5100000,-5900000,-3600000), //pcia 900913
							restrictedExtent: new OpenLayers.Bounds(-7600000,-5100000,-5900000,-3600000),

							center: '-6700000, -4450000',			//maxResolution: 'auto',
							xy_precision: 2,
							zoom: 7,
							controls: [
							new OpenLayers.Control.PanPanel(),
                       		new OpenLayers.Control.ZoomPanel(),
							new OpenLayers.Control.ScaleLine(),
							new OpenLayers.Control.Attribution(),
                       		new OpenLayers.Control.OverviewMap({
								mapOptions:{
									numZoomLevels:2,
									projection: "EPSG:900913",
									units: 'm',
									maxExtent: new OpenLayers.Bounds(-7196781, -5036226, -6200364, -3906201),
									restrictedExtent: new OpenLayers.Bounds(-7196781, -5036226, -6200364, -3906201)								
									},								
								maximized: false,
								layers: [new OpenLayers.Layer.WMS("Partidos",wmsURL,
								{layers: 'dipsoh:departamentos',transparent: true, format:'image/png', singleTile: true }, 
								{visibility: true, displayInLayerSwitcher:true,isBaseLayer:true})]
								})
							],
							theme: null
						},

						layers : layerItems,
						toolbar: toolBarItems
					}
				}
			]
		}
	]
};




