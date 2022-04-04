/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {

      let $tweet = (`<article>` +
                `<header>` +
          `<img src="/images/profile-hex.png">` +
          `<h2>${tweet.user.name}</h2>` +
          `<h3>${tweet.user.handle}</h3>` +
        `</header>` + 
        `<p>${escape(tweet.content.text)}</p>` +
        `<footer>` +
           `<div>${timeago.format(tweet.created_at)}` +
           `<div> <i class="fa-solid fa-flag"> </i>` +
           `<i class="fa-solid fa-retweet"> </i>` +
           `<i class="fa-solid fa-heart"> </i> </div>` +
           `</div>` +
        `</footer>` +
      `</article>`);
      

      return $tweet;
    }

    const renderTweets = (tweets) => {
      $('#tweets-container').empty();
      for(let t in tweets) {
        $tweet = createTweetElement(tweets[t]);
        $('#tweets-container').prepend($tweet)
      }
     }

     const getTweets = () => {
      $.ajax({
        url: "/tweets",
        type: "GET",
      }).then(function(data) {
        renderTweets(data);
      })
    }

$(() => {

  getTweets();


  $('#newTweet').on('click', function(event) {
    $('#tweet-form').find("#tweet-text").focus();
  })


  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    
    $tweetString = $('#tweet-text').val();
    $errorMessage = "";

    if ($tweetString.length > 140) {
      $errorMessage = "Your tweet has exceeded the maximum character length"
      $('#error-message').text($errorMessage).css('display', 'block');
    } else if ($tweetString === "" || $tweetString === null) {
      $errorMessage = "Your tweet contains no message"
      $('#error-message').text($errorMessage + " ! ").css('display', 'block');
    } else {
      
      $('#error-message').css('display', 'none');
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $('#tweet-text').serialize()
      }).then((data) => {
        getTweets();
      });
    };
    $('#tweet-text').val('')
    $('.counter').val(140)
  });
});