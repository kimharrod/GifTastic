$(document).ready(function(){

	event.preventDefault();

	// Create a variable for the topics

	var topics = ["penguins", "peregrine falcon", "owls", "swan", "hummingbird", "seagulls", "geese", "finches", "crow", "hawk"]; 


	// Function to make buttons appear on the page

	function makeButtons () {

	// Create a loop to take each topic in the array and make a button for that topic

	for (var i = 0; i < topics.length; i++) {
		var topicButton = $("<button class='btn btn-info btn-med'>");

		// Add an attribute to each button corresponding to the name of that button's topic 

		topicButton.attr("data-topic", topics[i]);

		// Inserting topic names for display on the buttons

		topicButton.html(topics[i]);

		// Adding a class to each button in order to attach an on-click event

		topicButton.addClass("getGiphys");

		$("#buttonArea").append(topicButton);

		} // end topic button loop

	} // end make buttons function


	// Wrapping the functions for button click, ajax call and image click with an initialize function

	function initButtons () {


	// Creating an on click event for the topic buttons and attaching a function to retrieve and insert gifs of that topic

	$(".getGiphys").on("click", function() {

		// assign clicked topic to the topicClicked variable

		var topicClicked = $(this).attr("data-topic");

		// construct the query URL for the Giphy API

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicClicked + "&api_key=dc6zaTOxFJmzC&limit=10";

		console.log(queryURL);

		// Put the query URL into our AJAX call

		$.ajax({
			url: queryURL,
			method: "GET"

		})

		// Get the response data from our AJAX call and execute the function to retrieve GIFs and append to div

		.done(function(response) {
			var results = response.data;


			$("#gifArea").html("");

			// Create a for loop that runs 10 times (query limit) to retrieve GIFs
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='item'>");

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

			// Setting data-animate attribute to point to the animated gif

			topicImage.attr("data-animate", gifURL);

			// Setting data-still attribute to point to the still image
			// Insert _s just before the GIF URL file extension to get the still image 

			topicImage.attr("data-still", gifURL.slice(0, -4) + "_s.gif");

			// Setting the image source attribute to the still image

			topicImage.attr("src", topicImage.attr("data-still"));

			// Setting the data state attribute to still

			topicImage.attr("data-state", "still");

			// Place each image and the associated rating into a container called gifDiv

			gifDiv.prepend(p);
			gifDiv.prepend(topicImage);

			// Place each gifDiv containing an image and rating into the gifArea div for display

			$("#gifArea").append(gifDiv);


			} // end for loop to retrieve gifs and append to gif div 


		// Function to flip data state on click from still to animate and back again

		$(".pic").on("click", function() {

			// Make a variable named state to store the image's data-state

			var state = $(this).attr("data-state");
			console.log("Current data-state is: " + state);
			console.log($(this).attr("data-animate"));

			// Check if the attribute data-state is equal to still

			if (state === "still") {

				// Update the src attribute to reflect the url for the animated gif

				$(this).attr("src", $(this).attr("data-animate"));

				// Update the data-state attribute to animate

				$(this).attr("data-state", "animate");

			} else {

				// Update the src attribute to reflect the url for the still image

				$(this).attr("src", $(this).attr("data-still"));

				// Update the data-state attribute to still

				$(this).attr("data-state", "still");

			} // end the data-state if else


		}); // end function to flip data state

	
		}); // end ajax done function


	}); // end button click function

    } // end init button wrapping function


    // function to add a new topic to the button group

    $("#submitTopic").on("click", function(event) {

    	// create a variable to hold the new topic name

    	var topicName = $("#newTopic").val();
    	console.log(topicName);

    	// pushing the new topic into our topic array

    	topics.push(topicName);

    	// clear the existing button area

    	$("#buttonArea").empty();

    	// clear the form input box and reset the placeholder text

    	$("#newTopic").val("");
    	$("#newTopic").attr("placeholder", "Type of bird");

    	// call function to make buttons

    	makeButtons();

    	// call init buttons function to initialize click event bindings on re-drawn buttons

    	initButtons();

    }); // end add topic button function


    // function to clear the gifs from the page

    $("#clearButton").on("click", function(event) {

    	$("#gifArea").empty();

    }); // end function to clear gifs

makeButtons ();
initButtons ();	

}); // end document.ready function