
  /**
   * add two numbers JSDoc format
   * @param {Number} num1 - The first Number
   * @param {Number} num2 - The second Number
   * @return {Number} sum of the two param
   */

  $('#submit').on('click', function (event) {
        event.preventDefault();

        const geocode = () => {
          let location = document.getElementById('locationInput').value
          axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: location,
                key: 'AIzaSyAxG39mIjdDBwU3JnRsD1SmItsodWv_1lw'
              }
            })
            .then(function (res) {
              let addressComponents = res.data.results[0].address_components;
              //long_name is Atlanta
              callAddressCity(addressComponents[0].long_name)
            })

            .catch(function (err) {
              console.log(err);
            })

        };
        geocode();
        const callAddressCity = function (longName) {
          const newSearch = {
            searchInput: $('#searchInput').val().trim(),
            locationInput: longName,
          };

          $.post('/api/search', newSearch)
            .then(function (businessData) {
              //location.city is Atlanta
              // console.log(businessData[0].location.city)
              let htmlstr = '';
              businessData.forEach(e => {
                htmlstr += build.businessBlock(e);
              });
              $('#holder').html(htmlstr);
            })
        };
  })

 //GOOGLE MAPS INTERGRATION
 function initMap() {
  $.ajax({
    url: '/api/restaurant',
    method: 'GET',
    dataType: 'json',
  }).then(function (data) {
    const latitude = data[0].coordinates.latitude;
    const longitude = data[0].coordinates.longitude;
    const name = data[0].name;
    const uluru = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
      },
      center: uluru,
      tilt: 45,
      disableDefaultUI: true
    });
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: `${name}`
    });
  }).catch(function(err){
    console.log(err);
  })
};
const lessMoreToggle = function () {
  if ($('.map-header a span').text() === "Mo' Map") {
    $('.map-header a span').text("Less Map");
  }
  else {
    $('.map-header a span').text("Mo' Map");
  }
}

const rotate = function () {
  $('.rotate').toggleClass('left');
};

$('.map-header a').on('click', function (e) {
  e.preventDefault();
  rotate();
  lessMoreToggle();
  $('.result-map').toggleClass('mo-map');
})