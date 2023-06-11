document.addEventListener("DOMContentLoaded", function() {
  const weatherElement = document.getElementById("weather");
  const timeElement = document.getElementById("time");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const searchButton = document.getElementById("searchButton");
  const cityInput = document.getElementById("cityInput");
  const svgIcon = document.querySelector(".dark-mode-toggle img");
  const darkModeElement = document.querySelector(".dark-mode");
  const weatherIcon = document.getElementById("weatherIcon");
  const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');

  // Function to enable dark mode
  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    svgIcon.style.filter = "invert(1)";
    svgIcon.style.fill = "#fff";
  }

  // Function to disable dark mode
  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    svgIcon.style.filter = "none";
    svgIcon.style.fill = ""; // Reset the fill color to default
  }

  // Function to restart the transition on the .dark-mode element
  function restartTransition() {
    darkModeElement.classList.remove("transition");
    void darkModeElement.offsetWidth; // Trigger reflow to restart the transition
    darkModeElement.classList.add("transition");
  }

  // Event listener for dark mode toggle change
  darkModeToggle.addEventListener("change", function() {
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

  // Fetch weather data through API key provided by OpenWeatherMap
  function getWeatherData(city) {
    const apiKey = '6989da1ed995ba985e1168c0743b8014'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        return response.json();
      })
      .then(function(data) {
        const temperature = data.main.temp;
        const temperatureCelsius = temperature - 273.15; // Convert temperature to Celsius
        weatherElement.classList.add('weather-info');
        weatherElement.innerText = `Weather in: ${data.name}\n${data.weather[0].main}\nTemperature: ${temperatureCelsius.toFixed(2)}°C`;

        // Update Twitter Card title dynamically
        twitterTitleTag.setAttribute("content", `Weather in ${data.name}`);
      })
      .catch(function(error) {
        console.log("Error:", error);
        weatherElement.innerText = "Failed to fetch weather data";
      });

    // Change fill color of SVG icon in dark mode
    if (darkModeToggle.checked) {
      svgIcon.style.fill = "#fff";
    } else {
      svgIcon.style.fill = ""; // Reset the fill color to default
    }
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

  searchButton.addEventListener("click", function() {
    const city = cityInput.value.trim();
    if (city      !== "") {
      getWeatherData(city);
    }
  });

  cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });

  getWeatherData("Jalandhar"); // Fetch weather for Chandigarh by default
  getCurrentTime();
});

