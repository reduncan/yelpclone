$(function () {
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
  })
};

const lessMoreToggle = function(){
  if($('.map-header a span').text() === "Mo' Map"){
    $('.map-header a span').text("Less Map");
  }
  else{
    $('.map-header a span').text("Mo' Map");
  }
}

  

const rotate = function(){
  $('.rotate').toggleClass('left');
};

$('.map-header a').on('click', function(e){
  e.preventDefault();
  rotate();
  lessMoreToggle();
  $('.result-map').toggleClass('mo-map');
})