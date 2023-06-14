Weather App
This is a simple weather application that allows users to search for the weather conditions of a specific city. The app retrieves weather data from the OpenWeatherMap API and displays it in a user-friendly format.

Features
Dark mode toggle: Users can switch between light and dark modes to customize the app's appearance.
City search: Users can enter the name of a city and retrieve the weather information for that location.
Auto-suggestion: As users type in the city search input, a list of suggested cities will be displayed to assist in selecting the desired location.
Weather information: The app displays the current temperature, weather description, humidity, wind speed, visibility, and pressure for the selected city.
Responsive design: The app is designed to work well on different screen sizes, including desktop and mobile devices.
Technologies Used
HTML: Used for creating the structure and content of the web page.
CSS: Used for styling the app's layout and elements.
JavaScript: Used for handling user interactions, making API requests, and dynamically updating the app's content.
Fetch API: Used for making asynchronous requests to the OpenWeatherMap API to fetch weather data.
OpenWeatherMap API: Used to retrieve weather data based on the user's search query.
How to Use
Clone the repository or download the project files.
Open the index.html file in a web browser.
Type the name of a city in the search input and press Enter or click the search button.
The app will display the weather information for the specified city.
To switch to dark mode, toggle the dark mode switch at the bottom left corner of the page.
As you type in the city search input, a list of suggested cities will appear. Click on a suggestion to select it.
Clicking on a suggestion will populate the search input with the selected city name and trigger the search button click event.
Customization
To change the default city or set a specific city for initial weather data, modify the getWeatherData('Jalandhar') line in the JavaScript code. Replace 'Jalandhar' with the desired city name.
To use your own OpenWeatherMap API key, sign up on the OpenWeatherMap website (https://openweathermap.org/) and replace the apiKey variable in the JavaScript code with your API key.
The styling of the app can be customized by modifying the CSS code. You can change colors, fonts, layout, and other visual aspects according to your preferences.
Limitations
The app currently retrieves weather data only for the current time and does not provide forecasts for future dates.
The app relies on the accuracy and availability of the OpenWeatherMap API. If the API is not accessible or the provided API key is invalid, weather data may not be displayed correctly.
Credits
This app was created by [Your Name].
The weather data is provided by the OpenWeatherMap API.
The app uses the Fetch API for making API requests.
License
This project is licensed under the MIT License.
