var topics = ["Schitt's Creek", "Outlander", "Stranger Things", "New Girl"];

      // displayGifInfo function re-renders the HTML to display the appropriate content
      function displayGifInfo() {
        $("#gif-view").empty();

        var gif = $(this).attr("data-name");
        var apiKey = "sZmTHcl0nlShQnrXB4IR0MhHnLYZWOIu"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" +apiKey+ "&limit=10";

        // Creates AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            
            var results = response.data;
            console.log(results);
            
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
          // Creates a img to hold the gif
            var gifDiv = $("<div>").addClass("gifSection").prependTo("#gif-view");

            var gif = results[i].images.fixed_height.url;
            var gifStill = results[i].images.fixed_height_still.url;
            
            // $(gifDiv).html("<br></br>");
            $("<img>").attr({
              "src": gifStill,
              "data-animate": gif,
              "data-still": gifStill,
              "data-state": "still",
            }).addClass("gif").prependTo(gifDiv);
            // var showTitle = $('<h6>').text(results[i].title);
            var showRating = $('<p>').text(results[i].rating)
                .addClass("font-weight-bold text-uppercase");
            $(gifDiv).append(showRating);
          };
          
        });

      }


      // Function for displaying gif data
      function renderButtons() {

        // Deletes the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of gifs
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each gif in the array
          var a = $("<button>");
          
          a.addClass("gifButton btn btn-warning btn-sm");
          // Added a data-attribute
          a.attr({
            "data-name": topics[i],
          });
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        console.log("add gif clicked");
        // This line of code will grab the input from the textbox
        var gif = $("#gif-input").val().trim();
        // The gif from the textbox is then added to our array
        if (topics.indexOf(gif) === -1 && gif!="") {
          $("#gif-input").val("");
          topics.push(gif);
        }

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "gif"
      $(document).on("click", ".gifButton", displayGifInfo);
      // $('#search-now').on("click", searchNow);
      $(document).on("click", ".gif", pauseGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      function pauseGif() {
        var target = event.target;
        var state = $(target).attr("data-state");
        console.log(target)
          if (state === "animate") {
              console.log("state");
            $(target).attr({
                "src": $(target).attr("data-still"),
                "data-state": "still",
            });
        } else {
            $(target).attr({
                "src": $(target).attr("data-animate"),
                "data-state": "animate",
                });
                };
      };