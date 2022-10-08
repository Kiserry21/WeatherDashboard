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