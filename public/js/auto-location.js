const getUserLocation = function () {
    $.get('http://ip-api.com/json')
    .then(function(responseData) {
        console.log(responseData);
        setDefaultLocation(responseData);
    });
}

const setDefaultLocation =  function (responseData) {
    let locationInput = $("#locationInput");
    let formattedLocation = `${responseData.city}, ${responseData.region}`;
    locationInput.val(formattedLocation);
}

getUserLocation();