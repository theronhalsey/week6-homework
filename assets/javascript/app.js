// make initial buttons

var terms = ["otters", "cats"];
var objects = [];

for (i = 0; i < terms.length; i++) {
    var termButton = $("<button>");
    termButton.text(terms[i]);
    termButton.addClass("btn btn-default searchButton")
    $("#buttonSpace").append(termButton);
};

//search when button clicked

$(document).on("click", ".searchButton", function () {
    event.preventDefault();

    var term = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        term + "&api_key=lp6SoThxvKKZh7VSxR3he5FQbSYIXXnm";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var pausedGif = $("<img>");
                    pausedGif.attr("src", results[i].images.fixed_height_still.url);
                    pausedGif.attr("paused", results[i].images.fixed_height_still.url);
                    pausedGif.attr("play", results[i].images.fixed_height.url);
                    pausedGif.addClass("gif");
                    pausedGif.attr("state", "paused");
                    gifDiv.append(p);
                    gifDiv.append(pausedGif);
                    $("#gifSpace").prepend(gifDiv);                    
                }
            }
        });
});

// make new buttons from input

$("#search").on("click", function () {
    var newTerm = $("#searchTerm").val().trim();
    event.preventDefault();
    terms.push(newTerm);
    var termButton = $("<button>");
    termButton.text(newTerm);
    termButton.addClass("btn btn-default searchButton")
    $("#buttonSpace").append(termButton);
});

// animate and pause gifs

$(document).on("click", ".gif", function() {
    var state = $(this).attr("state");
    if (state === "paused") {
        $(this).attr("src", $(this).attr("play"));
        $(this).attr("state", "play");
      } else {
        $(this).attr("src", $(this).attr("paused"));
        $(this).attr("state", "paused");
      }
    });