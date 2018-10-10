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
        let formattedAddress = res.data.results[0].formatted_address;
        let addressComponents = res.data.results[0].address_components;
        for (let i = 0; i < addressComponents.length; i++) {
          callAddressCity(addressComponents[i].long_name, formattedAddress)
        }
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (longName, cityState) {
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: longName,
    };

    $.post('/api/search', newSearch)
      .then(function (businessData) {
        let htmlstr = '';
        if (newSearch.searchInput && newSearch.locationInput != '') {
          businessData.forEach(e => {
            htmlstr += build.businessBlock(e);
          });
          $('#holder').html(htmlstr);
          let lowerSearchInput = newSearch.searchInput.charAt(0).toUpperCase() + newSearch.searchInput.slice(1);
          $('#bestNear').html(`Best ${lowerSearchInput} near ${cityState}`);
        }
      })

      .catch(function (err) {
        console.log(err);
      })

    $('#searchInput').val(null)
    $('#locationInput').val(null)
    $('#searchInput').focus()
  };
})

$('#oneDollar').on('click', function (event) {
  event.preventDefault();

  $('#searchInput').val(null)
  $('#locationInput').val(null)

  $.ajax({
      url: '/api/restaurant',
      method: 'GET'
    })
    .then(function (businessData) {
      let htmlstr = '';
      let filteredData = businessData.filter(e => e.price === '$')
      filteredData.forEach(e => {
        htmlstr += build.businessBlock(e);
      });
      $('#holder').html(htmlstr);
    })

    .catch(function (err) {
      console.log(err);
    })
});

$('#twoDollar').on('click', function (event) {
  event.preventDefault();

  $('#searchInput').val(null)
  $('#locationInput').val(null)

  $.ajax({
      url: '/api/restaurant',
      method: 'GET'
    })
    .then(function (businessData) {
      let htmlstr = '';
      let filteredData = businessData.filter(e => e.price === '$$')
      filteredData.forEach(e => {
        htmlstr += build.businessBlock(e);
      });
      $('#holder').html(htmlstr);
    })

    .catch(function (err) {
      console.log(err);
    })
});

$('#threeDollar').on('click', function (event) {
  event.preventDefault();

  $('#searchInput').val(null)
  $('#locationInput').val(null)

  $.ajax({
      url: '/api/restaurant',
      method: 'GET'
    })
    .then(function (businessData) {
      let htmlstr = '';
      let filteredData = businessData.filter(e => e.price === '$$$')
      filteredData.forEach(e => {
        htmlstr += build.businessBlock(e);
      });
      $('#holder').html(htmlstr);
    })

    .catch(function (err) {
      console.log(err);
    })
});

$('#fourDollar').on('click', function (event) {
  event.preventDefault();

  $('#searchInput').val(null)
  $('#locationInput').val(null)

  $.ajax({
      url: '/api/restaurant',
      method: 'GET'
    })
    .then(function (businessData) {
      let htmlstr = '';
      let filteredData = businessData.filter(e => e.price === '$$$$')
      filteredData.forEach(e => {
        htmlstr += build.businessBlock(e);
      });
      $('#holder').html(htmlstr);
    })

    .catch(function (err) {
      console.log(err);
    })
});

// $('#openStatus').on('click', function (event) {
//       event.preventDefault();

//       $('#searchInput').val(null)
//       $('#locationInput').val(null)

//       $.ajax({
//           url: '/api/restaurant',
//           method: 'GET'
//         })
//         .then(function (businessData) {
//           axios.get('https://api.yelp.com/v3/businesses/:id', {
//               params: {
//                 id: businessData.forEach(e => e.id),
//                 'api-key': 'api-key-here'
//               }
//             }).then(function (businessHours) {
//               let htmlstr = '';
//               let filteredData = businessHours.filter(e => e.hours.is_open_now === true)
//               filteredData.forEach(e => {
//                 htmlstr += build.businessBlock(e);
//               });
//               $('#holder').html(htmlstr);
//             })
//             .catch(function (err) {
//               console.log(err);
//             })
//         });
//       });
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
          const uluru = {
            lat: latitude,
            lng: longitude
          };
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
        }).catch(function (err) {
          console.log(err);
        })
      };
      const lessMoreToggle = function () {
        if ($('.map-header a span').text() === "Mo' Map") {
          $('.map-header a span').text("Less Map");
        } else {
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