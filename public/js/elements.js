/** API to build elements dynamically */

/** Yelp - Results Page */
let count = 0;

const buildIndivBusinessBlock = function (businessData) {
    count++;
    let businessElement = '';
    businessElement += `<div class='media-block'>`;
    businessElement += `<div class='media-avatar'><img alt='Photo of ${businessData.name}' src='${businessData.image_url}' height='210' width='210'></div>`;
    businessElement += `<div class='media-story'>`;
    businessElement += `<div class='biz-attributes'>`;
    businessElement += `<div class='main-attributes'>`;
    businessElement += `<div class='search-result-title'><span class='indexed-biz-name'>${count}. <a class='biz-name'  href='business?alias=${businessData.alias}'><span id='${businessData.alias}'>${businessData.name}</span></a></span></div>`; businessElement += `<div class='biz-rating'><div class='i-stars ${getStarRatingClass(businessData.rating)}' title='${businessData.rating}'><img class="offscreen" height="303" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/yelp_design_web/9b34e39ccbeb/assets/img/stars/stars.png" width="84" alt="${businessData.rating} star rating"></div><span class='review-count'>${businessData.review_count} reviews</span></div>`;
    businessElement += `<div class='price-category'><span class='bullet-after'><span class='price-range'>${businessData.price || ''}</span></span><span class='category-list'>${anchorCategories(businessData.categories)}</span></div>`; businessElement += `</div>`;
    businessElement += `<div class='secondary-attributes'>`;
    businessElement += `<span class='biz-phone'>${formatPhoneNumbers(businessData.phone)}</span>`;
    businessElement += `<address class='biz-address'>${businessData.location.address1}</address>`;
    businessElement += `<span class='neighborhood-str-list'>${businessData.location.city}</span>`;
    businessElement += `</div>`;
    businessElement += `</div>`;
    businessElement += `<div class='biz-extra-info'>`;
    businessElement += `<div class='snippet-block'><p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim…” <a href='#'>read more</a></p></div>`;
    businessElement += `</div>`;
    businessElement += `</div>`;
    businessElement += `</div>`;
    count++;
    return businessElement;
}

const anchorCategories = function (categories) {
    let html = "";
    categories.forEach(category => { html += `<a href="#">${category.title}</a>,` });
    html = html.substring(0, html.lastIndexOf(","));
    return html;
}

const formatPhoneNumbers = function (phoneNumber) {
    //     'phone': '+14048733088'
    let noCountryCode = phoneNumber.substring(2);
    let areaCode = noCountryCode.substring(0, 3);
    let prefix = noCountryCode.substring(3, 6);
    let lineNumber = noCountryCode.substring(6);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
}

const getStarRatingClass = function (rating) {
    let stringRating = rating.toString();
    stringRating = stringRating.replace(".", "-");
    return `star-rating-${stringRating}`;
}

const build = {
    businessBlock: buildIndivBusinessBlock,
    count: count
}

const testJson = {
    '_id': '5bb6bacc6b166a662080d323',
    'id': 'ZMEZgMF9FkgR9yl_RJkWfQ',
    'alias': 'fellinis-pizza-atlanta',
    'name': 'Fellinis Pizza',
    'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/l0pFkkzJF3mUTMoxrKv3wA/o.jpg',
    'is_closed': false,
    'url': 'https://www.yelp.com/biz/fellinis-pizza-atlanta?adjust_creative=cmzVxWTsJIZNaQUCYD1Cmg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cmzVxWTsJIZNaQUCYD1Cmg',
    'review_count': 400,
    'categories': [
        {
            'alias': 'pizza',
            'title': 'Pizza'
        }
    ],
    'rating': 4,
    'coordinates': {
        'latitude': 33.7734718322754,
        'longitude': -84.357666015625
    },
    'transactions': '',
    'price': '$',
    'location': {
        'address1': '909 Ponce De Leon Ave NE',
        'address2': '',
        'address3': '',
        'city': 'Atlanta',
        'zip_code': '30306',
        'country': 'US',
        'state': 'GA',
        'display_address': [
            '909 Ponce De Leon Ave NE',
            'Atlanta, GA 30306'
        ]
    },
    'phone': '+14048733088',
    '__v': 0
}