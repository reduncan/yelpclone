let searchIndexInput = sessionStorage.getItem('searchTag');
let locationIndexInput = sessionStorage.getItem('locationTag');

if (locationIndexInput !== null) {
  const geocode = () => {
    let location = locationIndexInput;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyAxG39mIjdDBwU3JnRsD1SmItsodWv_1lw'
      }
    })
      .then(function (res) {
        let formattedAddress = res.data.results[0].formatted_address;
        let addressComponents = res.data.results[0].address_components;
        callAddressCityIndex(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCityIndex = function (shortNameIndex, cityStateIndex) {
    const newSearchIndex = {
      searchInput: searchIndexInput,
      locationInput: shortNameIndex,
    };

    $.post('/api/search', newSearchIndex)
      .then(function (businessData) {
        let htmlstr = '';
        count = 0;
        businessData.forEach(e => {
          htmlstr += build.businessBlock(e);
        });
        $('#holder').html(htmlstr);
        let lowerSearchInput = newSearchIndex.searchInput.charAt(0).toUpperCase() + newSearchIndex.searchInput.slice(1);

        if (newSearchIndex.searchInput !== '') {
          $('#bestNear').html(`Best ${lowerSearchInput} near ${cityStateIndex}`);
          $('#title').text(`Best ${lowerSearchInput} near ${cityStateIndex}`);
        } else {
          $('#bestNear').html(`Places near ${cityStateIndex}`);
          $('#title').text(`Places near ${cityStateIndex}`);
        }
        $('#searchInput').val(`${lowerSearchInput}`);
        $('#locationInput').val(`${cityStateIndex}`);
      })
      .catch(function (err) {
        console.log(err);
      })

    /**
     * -Google Maps API, Use returned restaurant lat/lon to add 10 pins to the map.
     * -Ajax returns all resturants JSON from database
     * -Get all the ID's from the resturants returned from search results
     * -Filter empty/blank array elements
     * -Push matched ID results to list array
     * -Create Google Map, with center on first result of search, 
     *   loop through list array create pin for each one
     */

    function initMap() {
      $.ajax({
        url: '/api/restaurant',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        
        const resultsId = [];
        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        });

        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        });

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          center: {
            lat: list[0].coordinates.latitude,
            lng: list[0].coordinates.longitude
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < 10; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Yelp',
              fontSize: '10px',
            }

          })
        }
      });
    }
    initMap();
  }
}

$('#submit').on('click', function (event) {
  event.preventDefault();
  count = 0;
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
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: shortName,
    };

    $.post('/api/search', newSearch)
      .then(function (businessData) {
        let htmlstr = '';
        businessData.forEach(e => {
          htmlstr += build.businessBlock(e);
        });
        console.log(count);
        $('#holder').html(htmlstr);
        let lowerSearchInput = newSearch.searchInput.charAt(0).toUpperCase() + newSearch.searchInput.slice(1);

        if ($('#searchInput').val() !== '') {
          $('#bestNear').html(`Best ${lowerSearchInput} near ${cityState}`);
          $('#title').text(`Best ${lowerSearchInput} near ${cityState}`);
        } else {
          $('#bestNear').html(`Places near ${cityState}`);
          $('#title').text(`Places near ${cityState}`);
        };
        $('#searchInput').val(`${lowerSearchInput}`);
        $('#locationInput').val(`${cityState}`);
      })
      .catch(function (err) {
        console.log(err);
      })

    function initMap() {
      $.ajax({
        url: '/api/restaurant',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];

        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        })
        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        })

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          center: {
            lat: list[0].coordinates.latitude,
            lng: list[0].coordinates.longitude
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < 10; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Yelp',
              fontSize: '10px',
            }

          })
        }
      });
    }
    initMap();
  };
})

$('#oneDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
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
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {

    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: shortName,
    };
    if (newSearch.searchInput !== '') {
      $.post('/api/search', newSearch)
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
    } else {
      $.post('/api/search', newSearch)
        .then(function (businessData) {
          let htmlstr = '';
          let filteredData = businessData.filter(e => e.price === '$')
          filteredData.forEach(e => {
            htmlstr += build.businessBlock(e);
          });
          $('#holder').html(htmlstr);
          $('#bestNear').html(`Places near ${cityState}`);
          $('#title').text(`Places near ${cityState}`);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    function initMap() {
      $.ajax({
        url: '/api/restaurant',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];

        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        })
        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        })

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          center: {
            lat: list[0].coordinates.latitude,
            lng: list[0].coordinates.longitude
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < 10; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Yelp',
              fontSize: '10px',
            }

          })
        }
      });
    }
    initMap();
  }
});

$('#twoDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
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
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: shortName,
    };
    if (newSearch.searchInput !== '') {
      $.post('/api/search', newSearch)
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
    } else {
      $.post('/api/search', newSearch)
        .then(function (businessData) {
          let htmlstr = '';
          let filteredData = businessData.filter(e => e.price === '$$')
          filteredData.forEach(e => {
            htmlstr += build.businessBlock(e);
          });
          $('#holder').html(htmlstr);
          $('#bestNear').html(`Places near ${cityState}`);
          $('#title').text(`Places near ${cityState}`);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    function initMap() {
      $.ajax({
        url: '/api/restaurant',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];

        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        })
        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        })

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          center: {
            lat: list[0].coordinates.latitude,
            lng: list[0].coordinates.longitude
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < 10; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Yelp',
              fontSize: '10px',
            }

          })
        }
      });
    }
    initMap();
  }
});

$('#threeDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
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
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: shortName,
    };
    if (newSearch.searchInput !== '') {
      $.post('/api/search', newSearch)
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
    } else {
      $.post('/api/search', newSearch)
        .then(function (businessData) {
          let htmlstr = '';
          let filteredData = businessData.filter(e => e.price === '$$$')
          filteredData.forEach(e => {
            htmlstr += build.businessBlock(e);
          });
          $('#holder').html(htmlstr);
          $('#bestNear').html(`Places near ${cityState}`);
          $('#title').text(`Places near ${cityState}`);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    function initMap() {
      $.ajax({
        url: '/api/restaurant',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];

        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        })
        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        })

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          center: {
            lat: list[0].coordinates.latitude,
            lng: list[0].coordinates.longitude
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < 10; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Yelp',
              fontSize: '10px',
            }

          })
        }
      });
    }
    initMap();
  }
});

$('#fourDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
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
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: shortName,
    };
    if (newSearch.searchInput !== '') {
      $.post('/api/search', newSearch)
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
    } else {
      $.post('/api/search', newSearch)
        .then(function (businessData) {
          let htmlstr = '';
          let filteredData = businessData.filter(e => e.price === '$$$$')
          filteredData.forEach(e => {
            htmlstr += build.businessBlock(e);
          });
          $('#holder').html(htmlstr);
          $('#bestNear').html(`Places near ${cityState}`);
          $('#title').text(`Places near ${cityState}`);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    function initMap() {
      $.ajax({
        url: '/api/restaurant',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];

        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        })
        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        })

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          center: {
            lat: list[0].coordinates.latitude,
            lng: list[0].coordinates.longitude
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < 10; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Yelp',
              fontSize: '10px',
            }

          })
        }
      });
    }
    initMap();
  }
});
    /**
     * -Google Maps API, Use to find your location if no results are found
     */
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 18,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
    tilt: 45,
    disableDefaultUI: true
  });
  let marker = new google.maps.Marker({
    position: {
      lat: -34.397,
      lng: 150.644
    },
    map: map,
    title: "You are here!",
    animation: google.maps.Animation.BOUNCE
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      marker.setPosition(pos);
    }, function () {
      handleLocationError(true, map.getCenter());
    });
  } else {
    handleLocationError(false, map.getCenter());
  }
}
    /**
     * -Changes Map text on expand of window
     */
const lessMoreToggle = function () {
  if ($('.map-header a span').text() === "Mo' Map") {
    $('.map-header a span').text("Less Map");
  } else {
    $('.map-header a span').text("Mo' Map");
  }
}
    /**
     * -Rotates the chevron on click
     */
const rotate = function () {
  $('.rotate').toggleClass('left');
};
    /**
     * -On click function rotates checkron changes words
     */
$('.map-header a').on('click', function (e) {
  e.preventDefault();
  rotate();
  lessMoreToggle();
  $('.result-map').toggleClass('mo-map');
})