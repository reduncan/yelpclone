const bgIndex = Math.floor((Math.random() * 10) + 1);

const generate = function () {
    $.ajax({
        url: '/api/background',
        method: 'GET',
        dataType: 'json',
    }).then (function (image) {
        const newBG = image[bgIndex].url;
        console.log(newBG)
        $('body').css({"background-image": "url(${newBG})"});
    });
};

window.onload = generate();