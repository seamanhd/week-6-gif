


//-----------------------------------------------------------------------------
// GLOBAL VARIABLES
//-----------------------------------------------------------------------------

var topics = ["giraffe", "lion", "dog", "cat", "horse", "bear"]


//-----------------------------------------------------------------------------
//FUNCTIONS
//-----------------------------------------------------------------------------

var makeButtons = function() {

	$("#buttons").empty();

	for (var i=0;i<topics.length;i++) {
		var currentAnimal = topics[i]
		$("#buttons").append("<button class='getGif' data-animal=" + topics[i] + ">" + topics[i] + "</button>");
	
	}


};


//calling the make buttons function
makeButtons();



$(document).on("click", ".getGif", function() {

	$("#display").empty();
	var searchTerm = $(this).data("animal");

	console.log(searchTerm);
	var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
    
    .done(function(response) {
    	var results = response.data;
    	console.log(results);

    	for (var i = 0; i < results.length; i++) {
    		var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img class='pic'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.original_still.url);
              animalImage.attr("data-still", results[i].images.original_still.url);
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-state", "still");


              // Appending the paragraph and animalImage to the "gifDiv" div 
              
              gifDiv.append(animalImage);
              gifDiv.append(p);

              
              $("#display").prepend(gifDiv);
    	}
    });

    

    //fixed_height.url



	});


$(document).on("click", ".pic", function() {
    	
    		var state = $(this).attr("data-state");
    		console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      } else {
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }

    });

$(document).on("click", "#animalButton", function() {
	event.preventDefault();
	var newAnimal = $("input:text").val()
	console.log(newAnimal);
	topics.push(newAnimal);
	console.log(topics);
	
	makeButtons();
	

});



