$(document).ready(function(){

  // $.ajax({
  //   url: '/api/restaurant',
  //   method: 'GET',
  // }).then(function (data) {
  //   const name = data[0].name;
  //   const url = data[0].url;
  //   $(".heading-link a").append(`${window.location.search }`)
  //   $(".heading-link a").attr("href",` ${url}`)
  
  //   console.log(url)
  // })
  
  $.ajax({ url: `/api/restaurant/${window.location.search}`, method: "GET" })
    .then(function (dataList) {
      console.log(dataList)
      console.log(window.location.search)
      const newID = window.location.search.substring(7);
      console.log(newID);
      for (let i=0; i < dataList.length; i++){
        if(dataList[i].alias === newID){
          console.log(dataList[i])
          const newURL = `http://localhost:3000/business${window.location.search}`
          console.log(newURL)
          $(".heading-link a").append(`${dataList[i].name }`)
          $(".heading-link a").attr("href", newURL)
        }
      }
      
})
  
const addReview = function(){
  console.log('in the function')
  $('.outer-post').on('click', function (event){
    console.log('clicked')
  event.preventDefault();
  const newDate = (new Date().toJSON()).substring(0, 10);
  // const getAlias = cutPrefix.substring(0, cutPrefix.indexOf("?"));
  const reviewUrl = window.location.search.substring(7);
  const newReview = {
    rating: $(".i-selector-star").attr('data-stars'),
    text: $('.review-input').val().trim(),
    time_created: newDate,
    url: reviewUrl
  } 

      
    // console.log(newReview)
    $.ajax({url:"/api/review", method:"POST", data:newReview}).then(function (data){
      $('.review-input').empty();
      $('#content').empty();
    }).fail(function(err){
      console.log('this failed', err)

    })

  })
}
  


  
  $("[data-stars]").each(function(){
    var msg = ["Select your rating","Eek! Methinks not","Meh. I've experienced better","A-OK","Yay! I'm a fan","Woohoo! As good as it gets!"];
    
    var $el = $(this);
    var h   = $el.height();
    var w   = $el.width();
    var old = $el.data("stars");
    var now;
    var $info = $(".des-text");  
    $el.append($info);
  
    function setStars( val ){
      // $el.attr("data-stars", val);
      $el.attr("data-stars", val);
      $info.text( msg[val] );
    }
    setStars( old );
    
    $el.on("mousemove", function(e){
      now = (e.pageX-$(this).offset().left)/w*5 +1|0;
      setStars( now );
    }).on("mouseleave", function(){
      setStars( old );
    }).on("click", function(){
      old = now;
      setStars( old );
      // Submit `old` string value ("1-5") to server using AJAX 
    });
    
  });


  addReview();
})
