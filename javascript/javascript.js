//this function automatically starts on page load
$(function(){
    renderButtons();
})

var foods = ["Ice Cream", "Candy", "French Fries"]

//create a button that dynamically 
function renderButtons (){
    $("#buttonview").empty();
    for(var i=0; i<foods.length;i++){
        var a = $("<button>");
        a.addClass("food-btn");
        a.attr("data-food", foods[i]);
        a.text(foods[i]);
        $("#buttonview").append(a);
    }
}

//on click display gif
function display() {
    var food = $(this).attr("data-food");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=6zYtEwbun3aeLcwwXPxXKGX4QS3OCnd3&limit=15";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        console.log(queryURL);
        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing a fooddiv tag
          var foodDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          foodDiv.prepend(p);

          // Creating and storing an image tag
          var foodImage = $("<img>");
          // Setting the src attributes
          foodImage.attr("src", results[i].images.fixed_height_still.url); // still image stored into src of image
          foodImage.attr("data-still",results[i].images.fixed_height_still.url); // still image
          foodImage.attr("data-animate",results[i].images.fixed_height.url); // animated image
          foodImage.attr("data-state", "still"); // set the image state
          foodImage.addClass("image");
          // Appending the paragraph and image tag to the animalDiv
          foodDiv.append(foodImage);
          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifview").prepend(foodDiv);
        }
      });
}

$("#add-food").on('click',function(event){
    event.preventDefault();
    var search = $("#food-input").val().trim();
    foods.push(search);
    renderButtons();
})

$(document).on("click", ".food-btn", display);

$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
