$(document).ready(function() {
  

$("#tweet-form").on("keyup", "textarea", function() {
  $input = $(this).val()
  $charactersRemaining = 140 - $input.length
  
  $counter = $(".counter")
  $counter.text($charactersRemaining)

  if ($charactersRemaining < 0) {
    $counter.addClass("redFont")
  } else {
    $counter.removeClass("redFont")
    } 
});
});

