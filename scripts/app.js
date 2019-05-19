(function() {
  'use strict';

  $(".menu-icon").on('click', function(){
    $(".menu-items").toggleClass('open');
  });

  $(".mouse-down").click(function () {  
      $('html,body').animate({
        scrollTop: $("#products-wrap").offset().top - 10
    }, 800);
  });

  /* Load more for script */
  var loadMoreBtn = $("#load-more"),
  hiddenResult = $(".coupons-catg .hidden");
  hiddenResult.slice(0, 16).removeClass('hidden');
  setTimeout(function(){
    loadMoreBtn.css('visibility','visible');
  },1000);

  if (hiddenResult.length <= 5) {
    loadMoreBtn.hide();
  }
  loadMoreBtn.on('click', function (e) {
    var hiddenResult = $(".coupons-catg .hidden");
    e.preventDefault();
    if (hiddenResult.length < 5) {
        loadMoreBtn.hide();
    }
    hiddenResult.slice(0, 4).removeClass('hidden');
  });   

  var loadMoreBtn2 = $("#load-more2"),
  hiddenResult2 = $(".brands-catg .hidden");
  hiddenResult2.slice(0, 16).removeClass('hidden');
  setTimeout(function(){
    loadMoreBtn2.css('visibility','visible');
  },1000);

  if (hiddenResult2.length <= 5) {
    loadMoreBtn2.hide();
  }
  loadMoreBtn2.on('click', function (e) {
    var hiddenResult2 = $(".brands-catg .hidden");
    e.preventDefault();
    if (hiddenResult2.length < 5) {
        loadMoreBtn2.hide();
    }
    hiddenResult2.slice(0, 4).removeClass('hidden');
  });  

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
})();
