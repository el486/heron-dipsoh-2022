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
Ext.namespace("Heron.widgets.search");

/** api: (define)
 *  module = Heron.widgets.search
 *  class = SearchByBuffer
 *  base_link = `Heron.widgets.search.SpatialSearchPanel <SpatialSearchPanel.html>`_
 */

/** api: example
 *  This Panel is mostly used in combination with the  `Heron.widgets.search.FeaturePanel <FeaturePanel.html>`_
 *  in which results from a search are displayed in a grid and on the Map. Both Panels are usually bundled
 *  in a `Heron.widgets.search.SearchCenterPanel <SearchCenterPanel.html>`_ that manages the search and result Panels.
 *  See config example below.
 *
 *  .. code-block:: javascript

 {
 xtype: 'hr_searchcenterpanel',
 hropts: {
     searchPanel: {
     xtype: 'hr_searchbybuffer',
         id: 'hr-searchbybuffer',
         header: false,
         border: false,
         style: {
             fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
             fontSize: '12px'
         }
     },
     resultPanel: {
         xtype: 'hr_featuregridpanel',
         id: 'hr-featuregridpanel',
         header: false,
         border: false,
         autoConfig: true,
         exportFormats: ['XLS', 'WellKnownText'],
         hropts: {
             zoomOnRowDoubleClick: true,
             zoomOnFeatureSelect: false,
             zoomLevelPointSelect: 8,
             zoomToDataExtent: false
         }
     }
 }
 }

 *
 *  A ``SearchCenterPanel`` can be embedded in a Toolbar item popup as toolbar definition item ``searchcenter``
 *  as below. ``Heron.examples.searchPanelConfig`` is the ``SearchCenterPanel`` config as above.
 *
 *  .. code-block:: javascript

 {
 type: "searchcenter",
 // Options for SearchPanel window
 options: {
      show: true,

     searchWindow: {
         title: __('Search by Drawing'),
         x: 100,
         y: undefined,
         width: 360,
         height: 400,
         items: [
             Heron.examples.searchPanelConfig
         ]
     }
 }
 }
 */

/** api: constructor
 *  .. class:: SearchByBuffer(config)
 *
 *  A Panel to hold a spatial search by selecting features (via drawing) from another layer.
 *
 *  Search by Feature Selection works as follows:
 *
 *   * select a source layer,
 *   * draw a geometry using a draw tool
 *   * observe features/geometries selected in the source layer
 *   * select a target layer (in which to search, using the geometries of features found in the source layer)
 *   * select a spatial operator for the search like WITHIN, or INTERSECTS
 *   * fire search through 'Search' button
 *
 */
Heron.widgets.search.SearchByBuffer = Ext.extend(Heron.widgets.search.SpatialSearchPanel, {

    /** api: config[name]
     *  ``String``
     *  Name, e.g. for multiple searches combo.
     */
    name: __('Search by Feature Selection'),

    /** api: config[sourceSpatialFilterType]
     *  ``String``
     *  A valid value from the OpenLayers.Filter.Spatial.* enum like OpenLayers.Filter.Spatial.WITHIN
     *  Used in the WFS request Spatial Filter for the Source Layer. Default is: OpenLayers.Filter.Spatial.INTERSECTS
     */
    sourceSpatialFilterType: OpenLayers.Filter.Spatial.INTERSECTS,

    /** api: config[spatialDistanceUnits]
     *  ``String``
     *  Units to use for DWITHIN spatial filter.
     *  Default 'meter'
     */
    spatialDistanceUnits: 'meter',

    spatialFilterDistance: 1,
	
	vectorLayer: '',

    /** api: config[targetLayerFilter]
     *  ``Function``
     *  Filter for OpenLayer getLayersBy(), to filter out WFS-enabled Layers from Layer array except the source selection layer.
     *  Default: only Layers that have metadata.wfs (see OpenLayers Layer spec and examples) set.
     */
    targetLayerFilter: function (map) {
        /* Select only those (WMS) layers that have a WFS attached
         * Note: WMS-layers should have the 'metadata.wfs' property configured,
         * either with a full OL WFS protocol object or the string 'fromWMSLayer'.
         * The latter means that a WMS has a related WFS (GeoServer usually).
         */
        return map.getLayersBy('metadata',
            {
                test: function (metadata) {
                    return metadata && metadata.wfs && !metadata.isSourceLayer;
                }
            }
        )
    },
	
	vectorLayerFilter: function (map) {
        /* Select only those (WMS) layers that have a WFS attached
         * Note: WMS-layers should have the 'metadata.wfs' property configured,
         * either with a full OL WFS protocol object or the string 'fromWMSLayer'.
         * The latter means that a WMS has a related WFS (GeoServer usually).
         */
        return map.getLayersByClass("OpenLayers.Layer.Vector"); 
    },
// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {

        this.resetButton = new Ext.Button({
            anchor: "20%",
            text: 'Reset',
            tooltip: __('Start a new search'),
            listeners: {
                click: function () {
                    this.resetForm();
                },
                scope: this
            }

        });
		
		this.bufferButton = new Ext.Button({
            anchor: "20%",
            text: 'Buffer',
            tooltip: __('Buffer'),
            listeners: {
                click: function () {
					if (this.sourceLayer && this.sourceLayer.metadata) {
						this.sourceLayer.metadata.isSourceLayer = false;
					}
					this.sourceLayer = this.vectorLayer;
					if (this.sourceLayer && this.sourceLayer.metadata) {
						this.sourceLayer.metadata.isSourceLayer = true;
					}
					this.searchButton.enable();
					this.cancelButton.disable();
					this.searchVector();
                },
                scope: this
            }

        });

        this.items = [
            this.createSourceLayerCombo(),
			this.createVectorLayerCombo(),
			this.createSearchDistField(),
			this.bufferButton,
			this.createDrawFieldSet(),
            this.createTargetLayerCombo({selectFirst: true}),
            //this.createSearchTypeCombo(),
            this.createActionButtons(),
            this.createStatusPanel(),
            this.resetButton
        ];

        Heron.widgets.search.SearchByBuffer.superclass.initComponent.call(this);
    },

    activateSearchByFeature: function () {
        this.deactivateSearchByFeature();
        this.sourceLayerCombo.addListener('selectlayer', this.onSourceLayerSelect, this);
		this.vectorLayerCombo.addListener('selectlayer', this.onVectorLayerSelect, this);
        this.selectionLayer.events.register('featureadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featuresadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featureremoved', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featuresremoved', this, this.onSelectionLayerUpdate);
    },

    deactivateSearchByFeature: function () {
        this.sourceLayerCombo.removeListener('selectlayer', this.onSourceLayerSelect, this);
		this.vectorLayerCombo.removeListener('selectlayer', this.onVectorLayerSelect, this);
        this.selectionLayer.events.unregister('featureadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.unregister('featuresadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.unregister('featureremoved', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.unregister('featuresremoved', this, this.onSelectionLayerUpdate);
    },

    resetForm: function () {
        this.selectionLayer.removeAllFeatures();
        this.searchButton.disable();
		this.sourceLayerCombo.show();
		this.sourceLayerCombo.reset();
        this.vectorLayerCombo.show();
		this.vectorLayerCombo.reset();
		this.targetLayerCombo.reset();
        this.spatialFilterType = OpenLayers.Filter.Spatial.INTERSECTS;
        this.drawFieldSet.hide();
        this.deactivateDrawControl();
        this.selectionStatusField.hide();
        this.targetLayerCombo.hide();
        //this.searchTypeCombo.hide();
        this.searchDistField.setValue(1);
        this.spatialFilterDistance = 1;
        this.searchDistField.hide();
		this.bufferButton.hide();
        this.actionButtons.hide();
        this.updateStatusPanel(__('Select a source Layer and then draw to select objects from that layer. <br/>Then select a target Layer to search in using the geometries of the selected objects.'));
        this.fireEvent('searchreset');
    },

    createActionButtons: function () {
        this.searchButton = new Ext.Button({
            text: __('Search'),
            tooltip: __('Search in target layer using the feature-geometries from the selection'),
            disabled: true,
            handler: function () {
                this.searchFromFeatures();
            },
            scope: this
        });

        this.cancelButton = new Ext.Button({
            text: 'Cancel',
            tooltip: __('Cancel ongoing search'),
            disabled: true,
            listeners: {
                click: function () {
                    this.fireEvent('searchcanceled', this);
                },
                scope: this
            }

        });
        return this.actionButtons = new Ext.ButtonGroup({
            fieldLabel: __('Actions'),
            anchor: "100%",
            title: null,
            border: false,
            items: [
                this.cancelButton,
                this.searchButton
            ]});
    },

    createDrawFieldSet: function () {

        this.selectionStatusField = new Heron.widgets.HTMLPanel({
            html: __('No objects selected'),
            preventBodyReset: true,
            bodyCfg: {
                style: {
                    padding: '2px',
                    border: '0px'
                }
            },
            style: {
                marginTop: '2px',
                marginBottom: '2px',
                fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                fontSize: '11px',
                color: '#0000C0'
            }
        });

        return this.drawFieldSet = new Ext.form.FieldSet(
            {
                xtype: "fieldset",
                title: null,
                anchor: "100%",
                items: [
                    this.createDrawToolPanel({
                            style: {
                                marginTop: '12px',
                                marginBottom: '12px'
                            },
                            activateControl: false}
                    ),

                    this.selectionStatusField
                ]
            }
        );
    },
    createSearchDistField: function () {
		this.spatialFilterDistance = 1;
        return this.searchDistField = new Ext.form.NumberField({
            fieldLabel: __('Distance of Search'),
            name: 'basic',
            value: 1,
            minValue: -99999,
            maxValue: 99999,
            // all of your config options
            enableKeyEvents: true,
            listeners: {
                keyup: function (numberfield, ev) {
                    this.spatialFilterDistance = numberfield.getValue();
                },
                scope: this
            }
        });
    },
	
/*
    createSearchTypeCombo: function () {
        var store = new Ext.data.ArrayStore({
            fields: ['name', 'value'],
            data: [
                [__('INTERSECTS (default)'), OpenLayers.Filter.Spatial.INTERSECTS],
                [__('WITHIN'), OpenLayers.Filter.Spatial.WITHIN],
                [__('WITHIN DISTANCE'), OpenLayers.Filter.Spatial.DWITHIN],
                [__('CONTAINS'), OpenLayers.Filter.Spatial.CONTAINS]
            ]
        });
        return this.searchTypeCombo = new Ext.form.ComboBox({
            mode: 'local',
//            anchor: "100%",
            listWidth: 160,
            value: store.getAt(0).get("name"),
            fieldLabel: __('Type of Search'),
            store: store,
            displayField: 'name',
            valueField: 'value',
            forceSelection: true,
            triggerAction: 'all',
            editable: false,
            // all of your config options
            listeners: {
                select: function (cb, record) {
                    this.spatialFilterType = record.data['value'];
                    if (record.data['value'] == OpenLayers.Filter.Spatial.DWITHIN) {
                        this.searchDistField.show();
                    } else {
                        this.searchDistField.hide();
                    }
                },
                scope: this
            }
        });
    },
*/
    createVectorLayerCombo: function () {
        return this.vectorLayerCombo = new Heron.widgets.LayerCombo(
            {
//                     anchor: "100%",
                fieldLabel: __('Vector Layers'),
                sortOrder: this.layerSortOrder,
                layerFilter: this.vectorLayerFilter
            }
        );
    },
	
	createSourceLayerCombo: function () {
        return this.sourceLayerCombo = new Heron.widgets.LayerCombo(
            {
//                     anchor: "100%",
                fieldLabel: __('Choose Layer to select with'),
                sortOrder: this.layerSortOrder,
                layerFilter: this.layerFilter
            }
        );
    },

    updateSelectionStatusField: function (text) {
        if (this.selectionStatusField.body) {
            this.selectionStatusField.body.update(text);
        } else {
            this.selectionStatusField.html = text;
        }
    },

    onFeatureDrawn: function (evt) {

        // Protect against too many features returned in query (see wfs config options)
        var selectionLayer = this.selectionLayer;
        selectionLayer.removeAllFeatures();
        selectionLayer.addFeatures(evt.feature);
        var geometries = [selectionLayer.features[0].geometry];
        if (!this.search(geometries, {
            spatialFilterType: this.sourceSpatialFilterType,
            targetLayer: this.sourceLayer,
            projection: this.selectionLayer.projection,
            units: this.selectionLayer.units
        })) {
            return;
        }
        this.searchSelect = true;
        this.searchButton.enable();
        this.cancelButton.disable();
    },

    onSourceLayerSelect: function (layer) {
        if (this.sourceLayer && this.sourceLayer.metadata) {
            this.sourceLayer.metadata.isSourceLayer = false;
        }
        this.sourceLayer = layer;
        if (this.sourceLayer && this.sourceLayer.metadata) {
            this.sourceLayer.metadata.isSourceLayer = true;
        }
        this.searchButton.enable();
        this.cancelButton.disable();
        this.drawFieldSet.show();
        this.activateDrawControl();
		this.searchDistField.show();
		this.vectorLayerCombo.hide();

        this.selectionStatusField.show();
        this.updateStatusPanel();
        this.updateSelectionStatusField(__('Enter a buffer distance and draw to apply to objects from') + (this.sourceLayer ? '<br/>"' + this.sourceLayer.name + '"' : ''));
    },
	
	    onVectorLayerSelect: function (layer) {
        if (this.sourceLayer && this.sourceLayer.metadata) {
            this.sourceLayer.metadata.isSourceLayer = false;
        }
        this.vectorLayer = layer;
        if (this.sourceLayer && this.sourceLayer.metadata) {
            this.sourceLayer.metadata.isSourceLayer = true;
        }
		this.sourceLayerCombo.hide();
		this.searchDistField.show();
		this.bufferButton.show();
		
		this.updateStatusPanel(__('Enter a buffer distance and press "Buffer" to apply to objets from') + (this.vectorLayer ? '<br/>"' + this.vectorLayer.name + '"' : ''));
        
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onSelectionLayerUpdate: function () {
//        this.searchButton.disable();
//
//        if (this.selectionLayer.features.length == 0) {
//            this.updateSelectionStatusField(__('No objects selected.'));
//            return;
//        }
//        if (this.selectionLayer.features.length > this.maxFilterGeometries) {
//            this.updateSelectionStatusField(__('Too many geometries for spatial filter: ') + this.selectionLayer.features.length + ' ' + 'max: ' + this.maxFilterGeometries);
//            return;
//        }
//        this.searchButton.enable();
//        this.updateStatusPanel(__('Press the Search button to start your Search.'));
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onTargetLayerSelected: function () {
        //this.searchDistField.show();
        this.actionButtons.show();
        this.searchButton.enable();
        this.cancelButton.disable();

        this.doLayout();
        this.updateStatusPanel(__('Press the Search button to start your Search.'));
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
        if (this.fromLastResult && this.filterFeatures) {
            this.selectionLayer.addFeatures(this.filterFeatures);
        }
        this.activateSearchByFeature();

        this.resetForm();
    },

    /** api: method[onParentShow]
     *  Called when parent Panel is shown in Container.
     */
    onParentShow: function () {
        this.activateSearchByFeature();
    },

    /** api: method[onParentHide]
     *  Called when parent Panel is hidden in Container.
     */
    onParentHide: function () {
        this.deactivateSearchByFeature();
        this.resetForm();
    },


    /** api: method[onBeforeDestroy]
     *  Called just before Panel is destroyed.
     */
    onBeforeDestroy: function () {
        this.deactivateSearchByFeature();
        if (this.selectionLayer) {
            this.selectionLayer.removeAllFeatures();
            this.map.removeLayer(this.selectionLayer);
        }
    },

    /** api: method[onSearchCanceled]
     *  Function called when search is canceled.
     */
    onSearchCanceled: function (searchPanel) {
        Heron.widgets.search.SearchByBuffer.superclass.onSearchCanceled.call(this);
        this.resetForm();
    },
	
	 /** api: method[bufferFeatures]
     *  Function called before performing the (vector or wfs) search, 
	 *  applies the buffer to all input features and returns an array of buffer features
     */
	bufferFeatures: function (features){
		var input,buffer,distance;
		var buffered=[];
		var reader = new jsts.io.WKTReader();
		var parser = new jsts.io.GeoJSONWriter();
		var geoJSON = new OpenLayers.Format.GeoJSON();
		//var parser = new jsts.io.OpenLayersParser(); //jsts version 0.11
		var distance=this.spatialFilterDistance;
		for (var i = 0; i < features.length; i++) {
				input = reader.read(features[i].geometry.toString());
				buffer = input.buffer(distance*1.25); //corrects distance error (caused maybe because of projection issues)
				buffer = parser.write(buffer);
				buffer = geoJSON.read(buffer, 'Geometry'); //added for jsts version 1.2 
				var newfeat=new OpenLayers.Feature.Vector(buffer,null,null);
				buffered.push(newfeat);
        }
		return buffered;
	},

    /** api: method[onSearchSuccess]
     *  Function called when search is complete and succesful.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchSuccess: function (searchPanel, result) {
        // All ok display result and notify listeners
        var features = this.features = this.filterFeatures = result.olResponse.features;
        this.searchButton.enable();
        this.cancelButton.disable();
        if (this.searchSelect) {
            this.selectionLayer.removeAllFeatures();
		    this.selectionLayer.addFeatures(this.bufferFeatures(features));
            this.targetLayerCombo.hide();
            this.updateStatusPanel();
            if (this.selectionLayer.features.length == 0) {
                this.updateSelectionStatusField(__('No objects selected.'));
                return;
            }
            if (this.selectionLayer.features.length > this.maxFilterGeometries) {
                this.updateSelectionStatusField(__('Too many geometries for spatial filter: ') + this.selectionLayer.features.length + ' ' + 'max: ' + this.maxFilterGeometries);
                return;
            }
            this.searchSelect = false;

            // Replace the initial layers with all but the source layer
            this.targetLayerCombo.setLayers(this.targetLayerFilter(this.map));

            this.targetLayerCombo.show();
            var text = this.selectionLayer.features.length + ' ' + __('objects selected from "') + (this.sourceLayer ? this.sourceLayer.name : '') + '"';
            this.updateSelectionStatusField(text);
            this.updateStatusPanel(__('Select a target layer to search using the geometries of the selected objects'));
        } else {
            // Usually regular search
            Heron.widgets.search.SearchByBuffer.superclass.onSearchSuccess.call(this, searchPanel, result);
        }
    },
	
    searchVector: function () { //modified onSearchSuccess without the wfs search in source layer
        // All ok display result and notify listeners
		features=this.sourceLayer.features;
		this.searchButton.enable();
        this.cancelButton.disable();
        this.selectionLayer.addFeatures(this.bufferFeatures(features));
		this.targetLayerCombo.hide();
		this.updateStatusPanel();
		if (this.selectionLayer.features.length == 0) {
			this.updateStatusPanel(__('No objects selected.'));
			return;
		}
		if (this.selectionLayer.features.length > this.maxFilterGeometries) {
			this.updateStatusPanel(__('Too many geometries for spatial filter: ') + this.selectionLayer.features.length + ' ' + 'max: ' + this.maxFilterGeometries);
			return;
		}
		this.searchSelect = false;
		
		// Replace the initial layers with all but the source layer
		this.targetLayerCombo.setLayers(this.targetLayerFilter(this.map));

		this.targetLayerCombo.show();
		var text = this.selectionLayer.features.length + ' ' + __('objects selected from "') + (this.sourceLayer ? this.sourceLayer.name : '') + '". '+ __('Select a target layer to search using the geometries of the selected objects');
		this.updateStatusPanel(text); //using Status Panel because SelectionStatusField isn??t visible.
		//this.updateStatusPanel(__('Select a target layer to search using the geometries of the selected objects'));
    },
	
	/** api: method[searchFromFeatures]
     *
     *  Issue spatial search via WFS.
     */
    searchFromFeatures: function () {
        var geometries = [];
        var features = this.selectionLayer.features;
        for (var i = 0; i < features.length; i++) {
			geometries.push(features[i].geometry);
        }
        this.searchButton.disable();
        this.cancelButton.enable();
        if (!this.search(geometries, {
            spatialFilterType: this.spatialFilterType,
            targetLayer: this.targetLayer,
            projection: this.selectionLayer.projection,
            spatialDistanceUnits: this.spatialDistanceUnits,
            spatialFilterDistance: this.spatialFilterDistance
        })) {
            //this.selectionLayer.removeAllFeatures();
        }
    }
});


/** api: xtype = hr_searchbydrawpanel */
Ext.reg('hr_searchbybuffer', Heron.widgets.search.SearchByBuffer);
