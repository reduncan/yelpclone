$('#submit').on('click', function (e) {
    e.preventDefault();
    let searchTag = $('#searchInput').val().trim();
    let locationTag = $('#locationInput').val().trim();
    sessionStorage.setItem('searchTag', `${searchTag}`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

//GOOGLE MAPS INTERGRATION
function initMap() {
    $.ajax({
        url: `/api/restaurant/${window.location.search}`,
        method: 'GET',
        type: 'object'
    }).then(function (data) {
        const newID = window.location.search.substring(7)
        data.filter(function (obj) {
            if (newID === obj.alias) {
                const latitude = obj.coordinates.latitude;
                const longitude = obj.coordinates.longitude;
                const name = obj.name;
                const state = obj.location.state;
                const street = obj.location.address1;
                const city = obj.location.city;
                const zipCode = obj.location.zip_code;
                const phone = obj.phone;
                const url = obj.url;
                const info = `<ul>
                <li><i class="fas fa-map-marker-alt"></i><p> <span>${street}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${state}, ${city} ${zipCode}</span></p></li>
                <li><i class="fas fa-directions"></i>&nbsp;<a href='#'>Get Directions</a></li>
                <li><i class="fas fa-phone fa-flip-horizontal"></i>&nbsp;${phone}</li>
                <li><i class="fas fa-external-link-alt"></i>&nbsp;<a href='${url}'>${name}</a></li>
                <li><i class="fas fa-mobile-alt"></i>&nbsp;<a href='#'>Send to your phone</a></li></ul>`;
                $('.mapBoxText').html(info);

                const uluru = { lat: latitude, lng: longitude };
                const map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: uluru,
                    tilt: 45,
                    disableDefaultUI: true
                });
                const marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                    title: `${name}`,
                    label: {
                        text: 'Yelp',
                        fontSize: '10px',
                    }
                });
            }
        })
    })

}
initMap()

$.ajax({ url: `/api/restaurant/${window.location.search}`, method: "GET" })
    .then(function (dataList) {
        //console.log(window.location.search)
        const newID = window.location.search.substring(7);
        //console.log(newID);
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].alias === newID) {
                // console.log(dataList[i])
                $(".review").attr("id", newID)
            }
        }

    })

$('.review').on('click', function (event) {
    event.preventDefault();
    if (event.target.id) {
        location.href = `review?alias=${event.target.id}`;

        //console.log(event)

    }
})

const initHeader = function () {
    $.ajax({
        url: `/api/restaurant/${window.location.search}`,
        method: 'GET',
        type: 'object'
    }).then(function (data) {
        const newID = window.location.search.substring(7)
        data.filter(function (obj) {
            if (newID === obj.alias) {
                console.log(obj.rating);
                let header = "";
                header += `<h1>${obj.name}</h1>`;
                header += `<div class='biz-rating'><div class='i-stars ${getStarRatingClass(obj.rating)}' title='${obj.rating}'><img class="offscreen" height="303" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png" width="84" alt="${obj.rating} star rating"></div><span class='review-count'>${obj.review_count} reviews</span></div>`;
                header += `<div class='price-category'><span class='bullet-after'><span class='price-range'>${obj.price || ''}</span></span><span class='category-list'>${anchorCategories(obj.categories)}</span></div>`;
                $(".details").html(header);
            }
        });
    })
}
initHeader();