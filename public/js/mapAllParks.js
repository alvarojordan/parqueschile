mapboxgl.accessToken = mapboxToken
geoJSONdata = JSON.parse(geoJSONdata)

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-72.6377404,-38.7290173],
    zoom: 3.5
});

map.addControl(new mapboxgl.NavigationControl())

map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('parks', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: geoJSONdata,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });
        
        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'parks',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#26A69A',
                    10, // point count step 1
                    '#00796B',
                    20, // point count step 2
                    '#004D40'
                    ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    15, // cluster radius below step 1
                    10, // point count step 1
                    24, // cluster radius between step 1 and 2
                    20, // point count step 2
                    30  // cluster radius above step 2
                ]
            }
        });
            
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'parks',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });
         
        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'parks',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#80CBC4',
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#000'
            }
        });
        
        // inspect a cluster on click
        map.on('click', 'clusters', (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            map.getSource('parks').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                    if (err) return;
                    
                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });
         
        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice()
            const popUpMarkUp = 
                `<strong><a class="text-decoration-none" href="/parks/${e.features[0].properties.id}">${e.features[0].properties.title}</a></strong>`
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
         
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popUpMarkUp)
                .addTo(map);
        });
            
        map.on('mouseenter', 'clusters', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', () => {
            map.getCanvas().style.cursor = '';
        });
});