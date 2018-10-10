<<<<<<< HEAD
// const geocode = (e) => {
//   e.preventDefault();
//   let location = document.getElementById('locationInput').value
//   $.get('https://maps.googleapis.com/maps/api/geocode/json', {
//       params: {
//         address: location,
//         key: 'AIzaSyAQPXz579UmeXLiAqMxez-ud7xJJgnsxaI'
//       }
//     })
//     .then(function (res) {
//       console.log(res);

//       let addressComponents = res.data.results[0].address_components;

//       for (let i = 0; i < addressComponents.length; i++) {
//         addressComponentsOutput +=
//           `<li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>`;
//       }
//       console.log(addressComponents[i].types[0])
//       console.log(addressComponents[i].long_name)
//     })

//     .catch(function (err) {
//       console.log(err);
//     })

// };
// geocode();

$(function () {

=======
$(function () {
>>>>>>> 691fe62deed897868ec805f90f8a03f5c2cbe758
  // Click listener for the submit button
  $('#submit').on('click', function (event) {
    event.preventDefault();
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: $('#locationInput').val().trim(),
    };

    $.post('/api/search', newSearch)
      .then(function (data) {
        console.log(data);
        let htmlstr = '';
        data.forEach(element => {
          htmlstr += `<a href="${element.id}"><h5 class="card-title">${element.name}</h5></a>`;
          htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.image_URL} / In stock: ${element.itemCount}</h6>`;
          htmlstr += `<button id="edit" data-id=${element.price} class="btn btn-primary">Review</button>`;
          htmlstr += `<div id="${element.rating}">`;
          htmlstr += `<h5 class="card-title">${element.review_count}</h5>`;
          htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.phone} / In stock: ${element.itemCount}</h6>`;
          htmlstr += `<button id="edit" data-id=${element.hours} class="btn btn-primary">Review</button>`;
          htmlstr += `<div id="${element.categories}">`;
          htmlstr += `<h5 class="card-title">${element.photos}</h5>`;
          htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.phone} / In stock: ${element.itemCount}</h6>`;
          htmlstr += `<button id="edit" data-id=${element.location} class="btn btn-primary">Review</button>`;
          htmlstr += `<div id="${element.transactions}">`;
          htmlstr += `</div>`;
          htmlstr += `<hr />`;
        });

        $('#holder').html(htmlstr);
      })
  });
});

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