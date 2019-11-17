
var topics = ["Phillip J. Fry", "Bender", "Turanga Leela", "Amy Wong", "Zoidberg", "Professor Farnsworth", "Nibbler", "Hermes Conrad", "Planet Express"];

var button;
var newTopic = "";

// displays buttons from the topics array
var buttonGenerator = function (){
	// the previous div elements are emptied 
	 $("#buttonArea").empty();
	// loops through the array and creates buttons
	for(i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data",topics[i]);
		$("#buttonArea").append(button);
	};
};


// on click function that populates the page with gifs once a topic button is clicked
$("#buttonArea").on("click", ".btn",  function(){
  		var thing = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=0GE2H0LydSsuTarspuq9SXXW3lhJ0q0C&limit=10";



  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		// a div is created to hold a gif of any topic
	          	var topicDiv = $("<div>");
	 			
	          	// display the rating 
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			// adds a border around the gifs for presentation
	 			var topicImage = $("<img>").addClass("border");

	 			//creates the ability to toggle animate and still settings on gifs
	 			topicImage.attr("src", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-animate", results[i].images.fixed_height.url)
	 			topicImage.attr("data-state", "still")
	 			topicImage.addClass("gif");
	 			
	 			// image is appended to the div
	 			topicDiv.append(topicImage);
	 			// rating is appended to the div below the gif
	 			topicDiv.append(p); 			
	 			// new images will be placed at the beginning (top) of the containing gif area
	 			$("#gifArea").prepend(topicDiv);
 			}
  		})
  })


// on click that controls the animate/still attributes
$("#gifArea").on("click", ".gif", function(event){
	event.preventDefault();
	
	// checks the current state of a clicked gif
	var state = $(this).attr("data-state");
	
	//conditional that listens to the state and changes it
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
   
//on click for the submit button- adds a new topic of user's choice 
$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	// sets inputted value to newTopic 
	newTopic = $("#topic-input").val();
	// new topic is added to the topics array 
	topics.push(newTopic);
	console.log(topics);
	// call the function that creates the new button
	buttonGenerator();
});



buttonGenerator();
 
