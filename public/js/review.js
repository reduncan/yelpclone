$(document).ready(function () {

  /**
   * Searches database for businesses based on URL alias
   * @param {dataList}  all restaurants.
   * @param {business}  each specific restaurant. 
   * @const {newID}  the trimmed version of the URL to match an restaurant's alias.
   * if they match append the name of business, any previous reviews and ratings.
   */
  $.ajax({ url: `/api/restaurant/${window.location.search}`, method: "GET" })
    .then(function (dataList) {
      const newID = window.location.search.substring(7);
      dataList.forEach((business) => {
        if (business.alias === newID) {
          const newURL = `https://yelpper.herokuapp.com/business${window.location.search}`
          $(".heading-link a").append(`${business.name}`)
          $(".heading-link a").attr("href", newURL)
          $('.review-input').val(`${business.personal_review.personal_review_text}`)
          $(".i-selector-star").attr('data-stars', business.personal_review.personal_review_rating)
        }
      });
    })

  /**
   * Add personal review to database 
   * @const {newReview}  the new updated added
   * @param {dataList}  the the specific restaurant. 
   * @const {newID}  the trimmed version of the URL to match an restaurant's alias.
   * if they match, add the name of business to html, and new URL.
   */
  const addReview = function () {
    $('.outer-post').on('click', function (event) {
      event.preventDefault();
      const newDate = (new Date().toJSON()).substring(0, 10);
      const reviewUrl = window.location.search.substring(7);
      const newReview = {
        rating: $(".i-selector-star").attr('data-stars'),
        text: $('.review-input').val().trim(),
        time_created: newDate,
        url: reviewUrl
      }
      if ($('.review-input').val() == '') {
        $('.reviewBox').addClass('alert-review')
        $(".review-input").keypress(function () {
          $('.reviewBox').removeClass('alert-review');
        });

      } else if ($(".i-selector-star").data('stars') == '0') {
        $('.reviewBox').addClass('alert-rating')

      }
      if ($('.review-input').val() != '' && $(".i-selector-star").data('stars') != '0') {
        $.ajax({ url: "/api/review", method: "POST", data: newReview }).then(function (data) {
          $('.review-input').empty();
          $('#content').empty();
        }).then(function () {
          $('#thank-you').slideDown(500, 'linear').delay(4000);
          $('#thank-you').removeClass('hide');
          $('.outer-post').html('<i class="fas fa-check"></i> Posted');
          $('.outer-post').attr('disabled', 'disabled')
        })
          .fail(function (err) {

          })
      }


      $.ajax({ url: `/api/restaurant/${window.location.search}`, method: "GET" })
        .then(function (dataList) {
          const newID = window.location.search.substring(7);
          dataList.forEach((business) => {
            if (business.alias === newID) {
              const newURL = `https://yelpper.herokuapp.com/business${window.location.search}`
              $(".thank-you-header").html(`${business.name}`)
              $(".see-review").attr("href", newURL)
            }
          });
        })
    })
  }


  /**
  * Input the ratings of each starts.
  * @var {msg}  the different messages for each stars.
  * @var {$info}  the appends each message next to the rating. 
  * @function {setStars}  sets the input and attributes of the stars to latest number.
  * On hover display the stars where the cursor is at, when off hover stars should return to latest number.
  * on click change the current stars to latest stars
  */

  $("[data-stars]").each(function () {
    var msg = ["Select your rating", "Eek! Methinks not", "Meh. I've experienced better", "A-OK", "Yay! I'm a fan", "Woohoo! As good as it gets!"];

    var $el = $(this);
    var h = $el.height();
    var w = $el.width();
    var old = $el.data("stars");
    var now;
    var $info = $(".des-text");
    $el.append($info);

    function setStars(val) {
      $el.attr("data-stars", val);
      $el.data("stars", val);
      $info.text(msg[val]);
    }
    setStars(old);

    $el.on("mousemove", function (e) {
      $('.reviewBox').removeClass('alert-rating');
      now = (e.pageX - $(this).offset().left) / w * 5 + 1 | 0;
      setStars(now);
    }).on("mouseleave", function () {
      setStars(old);
    }).on("click", function () {
      old = now;
      setStars(old);

    });

  });


  addReview();
})
