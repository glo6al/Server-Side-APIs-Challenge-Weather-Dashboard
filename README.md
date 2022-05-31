Deployed URL: https://glo6al.github.io/weather-dashboard-glo6al/
Repo URL: https://github.com/glo6al/weather-dashboard-glo6al.git



In this weather dashboard app, I used the Open Weather Map API to get the current weather for a city, as well as a 5-day forecast.

To get the current weather, I built a function that makes a request to the Open Weather Map API. This function takes in the city name as a parameter. The API returns a response that includes the current weather conditions for that city.

To get the 5-day forecast, I built a function that also makes a request to the Open Weather Map API. This function takes in the city name as a parameter. The API returns a response that includes the forecast for the next 5 days. The forecast includes temperature and humidity.

I added an event listener that listens for a click on the search button. When the button is clicked, the city name is taken from the input field and passed into the functions that make the API requests. This displays the current weather conditions and the 5-day forecast on the page.

![Screenshot](./assets/images/Screen%20Shot%202022-05-31%20at%202.04.49%20PM.png)
The screenshot above shows the starting place of the app. The user inputs a city name into the input field and clicks the search button. The weather for that city is displayed on the page.

![Screenshot](./assets/images/Screen%20Shot%202022-05-31%20at%202.04.59%20PM.png)
The screenshot above shows an example of the current conditions that are displayed on the page. This includes the temperature, humidity, wind speed, and cloud coverage. Additionally, it shows an example of the 5-day forecast. The forecast includes the date, temperature, and humidity.

![Screenshot](./assets/images/Screen%20Shot%202022-05-31%20at%202.05.13%20PM.png)
The screenshot above draws your attention to the history searches.  When a city is searched, it is added to the history.