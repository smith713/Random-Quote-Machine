function fetchQuote() {
    "use strict";
    var forismatic = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
    $.ajax({
        url: forismatic,
        dataType: "jsonp",
        success: function (response) {
            $("#quote").text(response.quoteText);
            if (response.quoteAuthor) {
                $("#author").text(response.quoteAuthor);
            } else {
                $("#author").text("Unknown");
            }
            var tweetButton = $('#twitter');
            tweetButton.prop('disabled', false);
            tweetButton.unbind('click');
            tweetButton.click(function () {
                window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(response.quoteText + " — " + response.quoteAuthor));
            });
        },
        error: function (xhr, status, error) {
            $("#quote").text("Problem encountered please try reloading the quote!");
            $("#author").text("Life");
            $('#twitter').prop('disabled', true);
        }
    });
}

$(document).ready(function () {
    "use strict";
    $("#new-quote").click(fetchQuote);
    fetchQuote();
});