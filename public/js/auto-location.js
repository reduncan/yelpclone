
/**
 * Date: 10/14/2018
 * @version 1.0 
 * @author David Ye
 * @description
 *  1.0
 *  - getUserLocation will retrieve the user's location
 *    by submitting the request ip to a third-party open source API
 *    (http://ip-api.com/json)
 */

/**
 * Gets the user's location by sending the request
 * IP to 'http://ip-api.com/json'.
 * The callback will be a json that gives a detail
 * description of where the ip originated.
 * @since 1.0
 */
const getUserLocation = function () {
    $.get('http://ip-api.com/json')
    .then(function(responseData) {
        setDefaultLocation(responseData);
    });
}

/**
 * Takes in an object that has city and region properties.
 * Sets the location input to be a formatted location using
 * those properties.
 * @since 1.0
 * @param {Object} responseData 
 */
const setDefaultLocation =  function (responseData) {
    let locationInput = $("#locationInput");
    let formattedLocation = `${responseData.city}, ${responseData.region}`;
    locationInput.val(formattedLocation);
}

getUserLocation();