mapboxgl.accessToken = mapboxToken

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.6538331,-33.443183],
    zoom: 6
});

const marker = new mapboxgl.Marker({
    color: 'green'
})
    .setLngLat([-70.6538331,-33.443183])
    .addTo(map)

let inputLongitude = document.getElementById('inputLongitude')
let inputLatitude = document.getElementById('inputLatitude')

map.addControl(new mapboxgl.NavigationControl())

map.on('drag', function() {
    center = map.getCenter();
    marker.setLngLat(center);
    inputLongitude.value = center.lng
    inputLatitude.value = center.lat
});
  
map.on('zoom', function() {
    center = map.getCenter();
    marker.setLngLat(center);
    inputLongitude.value = center.lng
    inputLatitude.value = center.lat
});