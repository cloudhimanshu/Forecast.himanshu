document.addEventListener('DOMContentLoaded', function() {
  const weatherElement = document.getElementById('weather');
  const timeElement = document.getElementById('time');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const searchButton = document.getElementById('searchButton');
  const cityInput = document.getElementById('cityInput');
  const svgIcon = document.querySelector('.dark-mode-toggle img');
  const weatherIcon = document.getElementById('weatherIcon');
  const suggestionList = document.getElementById('suggestionList');
  let cities = []; // Array to store city names

  // Function to enable dark mode
  function enableDarkMode() {
    document.body.classList.add('dark-mode');
    svgIcon.style.filter = 'invert(11)';
    svgIcon.style.fill = '#fff';
    weatherElement.style.color = 'white'; // Change temperature color
    temperatureUnitElements = document.querySelectorAll('.temperature-unit');
    temperatureUnitElements.forEach(function(element) {
      element.style.color = 'red'; // Change temperature unit color
    });
  }

  // Function to disable dark mode
  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    svgIcon.style.filter = 'none';
    svgIcon.style.fill = ''; // Reset the fill color to default
    weatherElement.style.color = 'Blue';
  }

  // Event listener for dark mode toggle change
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  // Check initial state of dark mode toggle
  if (darkModeToggle.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Fetch city names from the "cities.txt" file
  function fetchCityNames() {
    fetch('cities.txt')
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        cities = data.split('\n'); // Split the data by line break to get an array of city names
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }

  // Fetch weather data through API key provided by OpenWeatherMap
  function getWeatherData(city) {
    const apiKey = '6989da1ed995ba985e1168c0743b8014'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        return response.json();
      })
      .then(function(data) {
        const temperature = data.main.temp;
        const temperatureCelsius = temperature - 273.15; // Convert temperature to Celsius

        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const visibility = data.visibility;
        const pressure = data.main.pressure;

        weatherElement.classList.add('weather-info');
        weatherElement.innerHTML = `
          <div class="city-name">${data.name}</div>
          <div class="temperature-container">
            <div class="temperature">${temperatureCelsius.toFixed(2)}</div>
            <div class="temperature-unit">°C</div>
          </div>
          <div class="weather-description">${weatherDescription}</div>
          <div class="extra-info">
            <div class="info-item">Humidity: ${humidity}%</div>
            <div class="info-item">Wind Speed: ${windSpeed} m/s</div>
            <div class="info-item">Visibility: ${visibility} meters</div>
            <div class="info-item">Pressure: ${pressure} hPa</div>
          </div>
        `;

        // Change fill color of SVG icon in dark mode
        if (darkModeToggle.checked) {
          svgIcon.style.fill = '#fff';
        } else {
          svgIcon.style.fill = ''; // Reset the fill color to default
        }
      })
      .catch(function(error) {
        console.log('Error:', error);
        weatherElement.innerText = 'Failed to fetch weather data';
      });
  }

  function getCurrentTime() {
    function updateTime() {
      const currentTime = new Date();
      timeElement.innerText = `Current Time: ${currentTime.toLocaleTimeString()}`;
    }
    // Update the time immediately
    updateTime();

    // Update the time every second (1000 milliseconds)
    setInterval(updateTime, 1000);
  }

  function showSuggestions(input) {
    suggestionList.innerHTML = ''; // Clear previous suggestions

    // Filter cities based on user input
    const filteredCities = cities.filter(city =>
      city.toLowerCase().startsWith(input.toLowerCase())
    );

    // Generate and display suggestion list
    filteredCities.forEach(city => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = city;
      suggestionItem.addEventListener('click', function() {
        cityInput.value = city;
        suggestionList.style.display = 'none'; // Hide the suggestion list after selection
        searchButton.click(); // Trigger the search button click event
      });
      suggestionList.appendChild(suggestionItem);
    });

    // Show or hide the suggestion list based on the number of suggestions
    if (filteredCities.length > 0) {
      suggestionList.style.display = 'block';
    } else {
      suggestionList.style.display = 'none';
    }
  }

  searchButton.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city !== '') {
      getWeatherData(city);
    }
  });

  cityInput.addEventListener('input', function() {
    const inputValue = this.value;
    showSuggestions(inputValue);
  });

  cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchButton.click();
    }
  });

  cityInput.addEventListener('input', function() {
    const inputValue = this.value;
    showSuggestions(inputValue);
  });

  cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchButton.click();
    }
  });

  document.addEventListener('click', function(event) {
    // Check if the click occurred outside the suggestion box
    if (!suggestionList.contains(event.target) && event.target !== cityInput) {
      suggestionList.style.display = 'none'; // Hide the suggestion box
    }
  });

  fetchCityNames(); // Fetch city names from the "cities.txt" file
  getWeatherData('Jalandhar'); // Fetch weather for Jalandhar by default
  getCurrentTime();
});

