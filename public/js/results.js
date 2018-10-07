$(function () {

  /* --- PHASE 4 - WRITE THE AJAX CALLS --- */

  const render = function () {
    $('#holder').empty();

    $.ajax({
        url: '/api/restraurant',
        method: 'GET'
      })
      .then(function (data) {
        let htmlstr = '';
        data.forEach(element => {
          htmlstr += `<h5 class="card-title">${element.name}</h5>`;
          htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.image_URL} / In stock: ${element.itemCount}</h6>`;
          htmlstr += `<button id="edit" data-id=${element.price} class="btn btn-primary">Edit</button>`;
          htmlstr += `<div id="${element.rating}">`;
          htmlstr += `<h5 class="card-title">${element.review_count}</h5>`;
          htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.phone} / In stock: ${element.itemCount}</h6>`;
          htmlstr += `<button id="edit" data-id=${element.hours} class="btn btn-primary">Edit</button>`;
          htmlstr += `<div id="${element.categories}">`;
          htmlstr += `<h5 class="card-title">${element.photos}</h5>`;
          htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.phone} / In stock: ${element.itemCount}</h6>`;
          htmlstr += `<button id="edit" data-id=${element.location} class="btn btn-primary">Edit</button>`;
          htmlstr += `<div id="${element.transactions}">`;
          htmlstr += `</div>`;
          htmlstr += `<hr />`;
        });

        $('#holder').html(htmlstr);
      })
      .catch(function (err) {
        res.json(err);
      })
  }

  // Click listener for the submit button
  $('#submit').on('click', function (event) {
    event.preventDefault();

    // Here we grab the form elements
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: $('#locationInput').val().trim(),
    };

    for (let key in newSearch) {
      if (newSearch[key] === '') {
        alert('Please fill out all fields');
        return;
      }
    }
    $('#searchInput').val('');
    $('#locationInput').val('');

    $('#searchInput').focus();
  });
})