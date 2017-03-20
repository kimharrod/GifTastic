$(document).ready(function(){

	// Create a variable for the topics

	var topics = ["penguins", "falcons", "owls", "swans", "hummingbirds", "seagulls", "geese"]; 

	// Create a loop to take each topic in the array and make a button for that topic

	for (var i = 0; i < topics.length; i++) {
		var topicButton = $("<button>");

		// Add an attribute to each button corresponding to the name of that button's topic 

		topicButton.attr("data-topic", topics[i]);

		// Inserting topic names for display on the buttons

		topicButton.html(topics[i]);

		// Adding a class to each button in order to attach an on-click event

		topicButton.addClass("getGiphys");

		$("#buttonArea").append(topicButton);

		} // end topic button loop


	// Creating an on click event for the topic buttons and attaching a function to retrieve and insert gifs of that topic

	$(#buttonArea).on("click", function() {

		// assign clicked topic to the topicClicked variable

		var = topicClicked = $(this).attr("data-topic");

		// construct the query URL for the Giphy API

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicClicked + "&api_key=dc6zaTOxFJmzC&limit=10";

		console.log(queryURL);

		// Put the query URL into our AJAX call

		$.ajax({
			url: queryURL;
			method: "GET";

		})

		// Get the response data from our AJAX call and execute the function to retrieve GIFs

		.done(function(response) {
			var results = response.data;


			$("#gifArea").html("");

			// Create a for loop that runs 10 times (the query limit)

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("div class='item'>");

			// Create a variable to hold our ratings in the form of an array

			var rating = results[i].rating;

			// Create a variable to hold our rating text for display

			var p = $("<p>").text("Rating: " + rating);

			// Create a variable to hold our topic image tag

			var topicImage = $("<img>");

			// Added a pic class to each image to make it clickable
			topicImage.addClass("pic");

			// assigning URL for the displayed gif 
			var gifURL = results[i].images.fixed_height.url;
			topicImage.attr("src", gifURL);

			// Setting data-animate attribute to point to the animated gif

			topicImage.attr("data-animate", gifURL);

			// Setting data-still attribute to point to the still image
			// Insert _s just before the GIF URL file extension to get the still image 

			topicImage.attr("data-still", gifURL.slice(0, -4) + "_s.gif");

			




			}

		})


	}


	

});