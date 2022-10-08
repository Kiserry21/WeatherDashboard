// Page is ready to run after html is loaded
$(document).ready(function(){

    // ******************************************* City Input and Search History ******************************************* //              
    
    // Display last search history using a for loop, if else statements and localStorage
    var searchedCitiesArray = [];
    
    // On click function for stored cities
    $("#searchBtn").on("click", getSearchInput);
    $(document).on("click", ".selected", storedCities);
    
    // Call searchHistory function when the dashboard page loads
    searchHistory();
    
    // Display recently searched cities stored in search history
    function storedCities() {
        // Store cities' name value
        var city = $(this)[0].innerHTML;
        // Transfer city name when user selects a stored city in the search history
        getWeather(city);
        }

        // Listen to the search button click and create function to get user input/city
    function getSearchInput(event) {
        event.preventDefault();
        $("#previousSearches").empty();
        // Declare variable for city input
        var city = $(".form-control").val(); 
        // Create array of searched cities
        searchedCitiesArray.push(city);
        // Create string from searched cities in the searched cities array
        localStorage.setItem("cities", JSON.stringify(searchedCitiesArray));
        // Display new searched cities
        var searchHistoryList = $("<div>").text(city).addClass("selected");
        $("#searchHistory").append(searchHistoryList);
        // Clear out search bar when user searches for city
        $("#searchInput").val("");
        // Event for ajax calls to to getWeather api function
        getWeather(city);
    }

    //Create function to display cities search History stored in localStorage
    function searchHistory() {
        //Convert string into object using JSON.parse
        searchedCitiesArray = JSON.parse(localStorage.getItem("cities"));
        // Use if else statements and for loop to initialise searchedCitiesArray based on search history
        if (searchedCitiesArray == null) {
        searchedCitiesArray = [];
         }
        //Loop through searched citiies array 
        for (var i = 0; i < searchedCitiesArray.length; i++) {
            var displaySearchedCities = searchedCitiesArray[i];
            // Display searched history and store in local storage
            var searchHistoryList = $("<div>").text(displaySearchedCities).addClass("selected"); 
            $("#searchHistory").append(searchHistoryList);
        }
    }

     // ******************************************* GET WEATHER API CALL ******************************************* //              
    
    // Created apiKey to call the OpenWeatherMap API
    var apiKey = "a255e2e186c01d1d2696e157bd1540bf";
    
    // Current weather function
    function getWeather (city) {

        // Build the URL needed to query the database of the OpenWeatherMap API
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    
        // Run AJAX GET call to request the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "jsonp",
         // Store all of the retrieved data inside of a response object 
            success: function(response){
                // Log the queryURL and resulting object
                console.log(queryURL);
                console.log(response);
    
                    // Retrieve dates
                    function date_format(dt_string){
                        var date = new Date(dt_string.dt*1000);
                        return date.toDateString();
                    }
    
                    // Convert the temperature to fahrenheit
                    function temp_trans(input){
                        var temp =  "Temperature: " + ((input.main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F ";
                        return temp;
                    }
            
               // Empties the divs to get rid of previous searches
               $("#previousSearches").empty();
    
                var holder= response.list[0];
