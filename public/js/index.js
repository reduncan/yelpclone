$('#submit').on('click', function (e) {
    e.preventDefault();
    let searchTag = $('#searchInput').val().trim();
    let locationTag = $('#locationInput').val().trim();
    sessionStorage.setItem('searchTag', `${searchTag}`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

/**
 * Creates random number between 0 and 9. This 
 * is used as an index to reference items 
 * in the database. 
 */
const bgIndex = Math.floor((Math.random() * 9) + 1);

/**
 * Generates the random background that changes
 * on reload. The styling for the background is 
 * inserted into the html as inline styling. 
 */
const generate = function () {
    $.ajax({
        url: '/api/background',
        method: 'GET',
        dataType: 'json',
    }).then(function (image) {
        const newBG = image[bgIndex].url;
        const rgba = "rgba(51, 51, 51, .3)";
        $('body').css({
            "background": "linear-gradient("
                + rgba + ","
                + rgba +
                ")" + "," + "url(" + newBG + ")",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": "center"
        });
    });
};

/**
 * Runs Generate on each load/reload of 
 * the homepage. 
 */
window.onload = generate();
