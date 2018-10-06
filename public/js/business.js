//GOOGLE MAPS INTERGRATION
$.ajax({
    url: '/api/restaurant',
    method: 'GET',
    dataType: 'json',
}).then(function(data){
    console.log(data);
})

function initMap() {
    var uluru = { lat: 33.928694, lng: -84.343081 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        tilt: 45,
        disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}