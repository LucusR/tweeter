/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {

      let $tweet = (`<article>` +
                `<header>` +
          `<img src="/images/profile-hex.png">` +
          `<h2>${tweet.user.name}</h2>` +
          `<span>${tweet.user.handle}</span>` +
        `</header>` +
        `<p>${tweet.content.text}</p>` +
        `<footer>` +
           `<div>${timeago.format(tweet.created_at)}</div>` +
         ` <div>` +
             `<i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i>` +
          `</div>` +
        `</footer>` +
      `</article>` );
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

  $('.new-tweet').on('submit', function(e) {
    e.preventDefault();

    $submittedTweet = $('#tweet-text').serialize();
  
  console.log("test input", $submittedTweet)

    if ($submittedTweet.length > 140) {
      alert("Your tweet has exceeded the maximum character length!")
    } else if ($ubmittedTweet = "") {
      alert("Your tweet contains no message!") 
    } else {

    $('.tweet-text').prop("disabled", true).text("Loading")
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $('#tweet-text').serialize()
      }).then((data) => {
      $('.submit-button').prop("disabled", false).text("Submit")
      getTweets();
      });
    };
  });
});