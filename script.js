$(document).ready(function(){

  //Get subreddit
  $.get('http://www.reddit.com/r/pho.json').done(function(post){
    console.log(post.data.children);
    for(var i=0; i<post.data.children.length; i++){

      var title = post.data.children[i].data.title;
      var thumbnail = post.data.children[i].data.thumbnail;
      var author = post.data.children[i].data.author;
      var score = post.data.children[i].data.score;
      var permalink = post.data.children[i].data.permalink;

      if(thumbnail !== "self"){
        $('.container').append('<div class="post"><img src=' + thumbnail +
          '><p class="author">' + author + '</p><a href="https://www.reddit.com" + permalink>' + title + 
          '</a><p class="score">' + score + '</p></div>');
      }
    }
  });

  //Scroll hide header
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function(){
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled(){
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If scrolled down past the navbar, add class .nav-up
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('header').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()){
        $('header').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }
//...
});
