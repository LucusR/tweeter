/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function eliminates cross-site scripting from tweet text box
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// generates tweet html to be placed in tweet container
const createTweetElement = tweetData => {
  const { user, content, created_at } = tweetData;

  let singleTweetElement = $(`<article class="tweet-component">
        <!-- image-username-refkey -->
        <div class="image-username-refkey">
          <div class="image-username">
            <img src=${user.avatars} alt="" />
            <span>${user.name}</span>
          </div>
          <div>${user.handle}</div>
          </div>
        <!-- tweet contect -->
        <div class="tweet-content">
          <!-- <p>${content.text}</p> -->
          ${$("<p>")
            .text(content.text)
            .html()}
        </div>
        <!-- time and reactions icons -->
        <div class="time-reactions">
          <p>${timeago.format(created_at)}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </article>`);

  return singleTweetElement;
};

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

  //listener for tweet submissions, including text counter and error-messages
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