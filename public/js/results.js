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