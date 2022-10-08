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
