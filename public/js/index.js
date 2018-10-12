$('#submit').on('click', function (e) {
    e.preventDefault();
    let searchTag = $('#searchInput').val().trim();
    let locationTag = $('#locationInput').val().trim();
    sessionStorage.setItem('searchTag', `${searchTag}`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});
const bgIndex = Math.floor((Math.random() * 9) + 1);

const generate = function () {
    $.ajax({
        url: '/api/background',
        method: 'GET',
        dataType: 'json',
    }).then (function (image) {
        const newBG = image[bgIndex].url;
        const rgba = "rgba(51, 51, 51, .3)";
        console.log(newBG)
        $('body').css({
            "background": "linear-gradient("
                + rgba +"," 
                + rgba +
              ")"+","+"url("+ newBG +")",
              "background-size": "cover",
              "background-repeat": "no-repeat",
              "background-position": "center"
    });
    });
};

window.onload = generate();
