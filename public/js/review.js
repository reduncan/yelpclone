$(document).ready(function(){

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

})
