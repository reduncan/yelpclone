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
  
  // Click listener for the submit button
  $('#submit').on('click', function (event) {
    event.preventDefault();
    const newSearch = {
      searchInput: $('#searchInput').val().trim(),
      locationInput: $('#locationInput').val().trim(),
    };

    $.post('/api/search', newSearch)
      .then(function (businessData) {
        console.log(businessData);
        let htmlstr = '';
        businessData.forEach(e => {
          htmlstr += build.businessBlock(e);
        });
        $('#holder').html(htmlstr);
      })
  });
});