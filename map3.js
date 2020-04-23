var lab9Map3 = L.map('map3id').setView([32.18, -99.14], 4)
var americaLayerObject = L.layerGroup().addTo(lab9Map3)
var lab9Map3BasemapObjectpObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(lab9Map3)
var dataUrl = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'
var routesBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(lab9Map3)
var basemapsObject = {
    'Streets': routesBasemapObject,
    'Gray canvas': lab9Map3BasemapObjectpObject
}
jQuery.getJSON(dataUrl, function (data) {
    var StylingFunction = function (feature) {
        var age = feature.properties.MED_AGE // get the current state's Median Age attribute
        var color = 'olive' // let the initial color be a darker green
        if (age < 38) { color = 'blue' } // if the state's median age is less than the average, color it a lighter green
        return {
            color: color, // use the color variable above for the value
            weight: 1,
            fillOpacity: 0.5
        }
    }
    var lab9PopulateGeojsonOptionsObject = {
        style: StylingFunction,
        onEachFeature: populateEachFunction
    }
    L.geoJSON(data, lab9PopulateGeojsonOptionsObject).addTo(lab9Map3)
})
var populateEachFunction= function (feature, layer) {
    var name = feature.properties.STATE_NAME
    var age = feature.properties.MED_AGE
    layer.bindPopup('Median age of ' + name + ': ' + age + '<br>National average: 38')
    americaLayerObject.addLayer(layer)
}
var layersObject = {
    'Median age by state': americaLayerObject
}
L.control.layers(basemapsObject, layersObject).addTo(lab9Map3)