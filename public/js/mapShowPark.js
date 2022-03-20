mapboxgl.accessToken = mapboxToken
parkCoordinates = JSON.parse(parkCoordinates)

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: parkCoordinates,
    zoom: 12
});

const marker = new mapboxgl.Marker({
    color: 'green'
})
    .setLngLat(parkCoordinates)
    .addTo(map)