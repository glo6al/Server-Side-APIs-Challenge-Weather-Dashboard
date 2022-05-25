// get the value of the input field
var city = $("#searchTerm").val();
// set api key
var apiKey = "&appid=914485892723c5602584058c5fb75322";
// get today date without time
var date = new Date();
//store the value of the search history in array
var searchHistory = [];


//add function to list previous search terms
function makeList() {

for (var index = searchHistory.length - 1; index >= 0; index--) {
  //var to create <li> and add class and id to each
  // var listItem = $("<button>").addClass("list-group-item againSearch").text(city).attr("id",'prevCityBtn').attr("type", "button").attr("data-search", searchHistory[index]);
  var listItem = $("<button>").addClass("list-group-item againSearch").attr("id",'prevCityBtn').attr("type", "button").attr("data-search", searchHistory[index]);

  $(listItem).text(searchHistory[index]);

  $(".list").append(listItem);

 }

  var citySearched = $("#prevCityBtn").text();

  $("#prevCityBtn").click(function() {

    // $('#activeCity').empty();
    // $('#forecast').empty();

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + apiKey;
  
    $.ajax({
      url: queryUrl,
      method: "GET"
    })
   .then(function (response){  
    getCurrentConditions(response);
    getCurrentForecast(response);
  })
  });

  // var listItemLength = listItem.length;
  // //alert user they have exceeded the maximum limit of search terms
  // if (listItemLength === 1){
  //   console.log("success");
  // } else {
  //     //append list item to ul element on html
  //   $(".list").append(listItem);
  // }
};

//function to create a div with api data to display as main card and current weather
  function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    //replace the current weather with the most recent city search
    $('#activeCity').empty();

    // get and set the content in activeCity div
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body text-white");
    var city = $("<h4>").addClass("card-title").text(response.name);
    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // append city date and image to city h4
    city.append(cityDate, image)
    //append city, tempurature, humidity, and wind to card body
    cardBody.append(city, temperature, humidity, wind);
    //append card body to the container card
    card.append(cardBody);
    //append container card to active city hard coded html div
    $("#activeCity").append(card)
   
  }

function getCurrentForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    $('#forecast').empty();

    // variable to hold response.list
    var results = response.list;
    console.log(results)
    
    for (var i = 0; i < results.length; i++) {

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
        // convert tempurature into fahrenheit
        var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        var tempF = Math.floor(temp);

        var card = $("<div>").addClass("card col-md-2 ml-4 text-white");
        var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
        var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });

}

//add event listener for button click
$("#searchBtn").on("click", function() {
  //unhide the hidden h5 on index.html
  $('#forecastH5').addClass('show');

  // get the value of the text input
  city = $("#searchTerm").val();
  
  // clear input box after click event
  $("#searchTerm").val("");  

  // guery open weather using full url plus city and api
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){
    //call conditions, forecast, and list functions
    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
  });

 
function setHistory (cityHistory){
  //if there is no search term stop function
 if (searchHistory.indexOf(cityHistory) !== -1) {
   return;
 } 
 //append new search term to the array and returns the new length
 searchHistory.push(cityHistory);
 localStorage.setItem("cityKey", JSON.stringify(searchHistory)) //this refers to the search history array
 makeList();
}

function getHistory() {
  var savedCities = localStorage.getItem("cityKey")

  if (savedCities) {
    searchHistory = JSON.parse(savedCities)
  }
  makeList();
}


  //TODO: update if statement in Function makeList to end function when prevCity list reaches 5 
  //TODO: add function to load corresponding weather when click prev search terms
  //TODO: 
