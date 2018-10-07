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