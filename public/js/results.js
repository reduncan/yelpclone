/**
 * gets two string inputs from index.html then stores to session storage
 * @param {String} searchIndexInput - catagory searchInput
 * @param {String} locationIndexInput - location locationInput
 */

let searchIndexInput = sessionStorage.getItem('searchTag');
let locationIndexInput = sessionStorage.getItem('locationTag');

let _businessData = {};

const renderResults = function (data, page) {
  let htmlstr = '';

  const initial = (10 * (page - 1)) + 1;
  count = initial - 1;

  for (let i = initial; i < initial + 10 && i < data.length; i++) {
    let e = data[i];
    htmlstr += build.businessBlock(e);
  }

  $('#holder').html(htmlstr);
};

if (locationIndexInput !== null) {

  // Calls Google Geocoding API with location param as LocationIndexInput
  const geocode = () => {
    let location = locationIndexInput;
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (data) {
        let formattedAddress = data.results[0].formatted_address;
        let addressComponents = data.results[0].address_components;
        callAddressCityIndex(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  /**
   * @param {string} shortNameIndex - uncapitalized alias of location ex. atlanta
   * @param {string} cityStateIndex - Properly formatted city, state ex. Atlanta, GA, USA
   * @return {object} businessData - filtered business by tag and location
   */

  const callAddressCityIndex = function (shortNameIndex, cityStateIndex) {
    const newSearchIndex = {
      searchInput: searchIndexInput,
      locationInput: shortNameIndex,
    };

    $.post('/api/search', newSearchIndex)
      .then(function (businessData) {
        _businessData = businessData;
        renderResults(businessData, 1);

        for (let i = 2; i <= Math.ceil((businessData.length - 1) / 10); i++) {
          $('footer').append(`<a>${i}</a>`);
        }

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
  let searchTag = $('#searchInput').val().trim();
  let locationTag = $('#locationInput').val().trim();
  sessionStorage.setItem('searchTag', `${searchTag}`);
  sessionStorage.setItem('locationTag', `${locationTag}`);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let formattedAddress = res.results[0].formatted_address;
        let addressComponents = res.results[0].address_components;
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
      locationInput: shortName,
    };

    $.post('/api/search', newSearch)
      .then(function (businessData) {
        let htmlstr = '';
        businessData.forEach(e => {
          htmlstr += build.businessBlock(e);
        });
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

// Filter businessData.price returned from /api/search route by $
$('#oneDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
  let searchTag = $('#searchInput').val().trim();
  let locationTag = $('#locationInput').val().trim();
  sessionStorage.setItem('searchTag', `${searchTag}`);
  sessionStorage.setItem('locationTag', `${locationTag}`);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let formattedAddress = res.results[0].formatted_address;
        let addressComponents = res.results[0].address_components;
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {

    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
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

// Filter businessData.price returned from /api/search route by $$
$('#twoDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
  let searchTag = $('#searchInput').val().trim();
  let locationTag = $('#locationInput').val().trim();
  sessionStorage.setItem('searchTag', `${searchTag}`);
  sessionStorage.setItem('locationTag', `${locationTag}`);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let formattedAddress = res.results[0].formatted_address;
        let addressComponents = res.results[0].address_components;
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
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

// Filter businessData.price returned from /api/search route by $$$
$('#threeDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
  let searchTag = $('#searchInput').val().trim();
  let locationTag = $('#locationInput').val().trim();
  sessionStorage.setItem('searchTag', `${searchTag}`);
  sessionStorage.setItem('locationTag', `${locationTag}`);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let formattedAddress = res.results[0].formatted_address;
        let addressComponents = res.results[0].address_components;
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
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

// Filter businessData.price returned from /api/search route by $$$$
$('#fourDollar').on('click', function (event) {
  event.preventDefault();
  count = 0;
  let searchTag = $('#searchInput').val().trim();
  let locationTag = $('#locationInput').val().trim();
  sessionStorage.setItem('searchTag', `${searchTag}`);
  sessionStorage.setItem('locationTag', `${locationTag}`);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let formattedAddress = res.results[0].formatted_address;
        let addressComponents = res.results[0].address_components;
        callAddressCity(addressComponents[0].short_name, formattedAddress)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName, cityState) {
    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
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
 * -Changes Map text on expand of window, rotates chevron
 */
const lessMoreToggle = function () {
  if ($('.map-header a span').text() === "Mo' Map") {
    $('.map-header a span').text("Less Map");
    $('.rotate').toggleClass('left');
    $('.media-story').addClass('newgrid');
    $('.media-block').addClass('gridnew');
    $('.secondary-attributes, .biz-extra-info').addClass('hide');
  } else {
    $('.map-header a span').text("Mo' Map");
    $('.rotate').toggleClass('left');
    $('.media-story').removeClass('newgrid');
    $('.media-block').removeClass('gridnew');
    $('.secondary-attributes, .biz-extra-info').removeClass('hide');
  }
}

/**
 * -On click function calls LessMoreToggle
 */
$('.map-header a').on('click', function (e) {
  e.preventDefault();
  lessMoreToggle();
  $('.result-map').toggleClass('mo-map');
});

$('footer').on('click', 'a', function (e) {
  $('footer a').each(function () {
    $(this).removeClass('active');
  });

  $(this).addClass('active');

  renderResults(_businessData, $(this).text());
});
