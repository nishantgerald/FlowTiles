function fetchWeatherData() {
    fetch('http://127.0.0.1:5000/current_weather')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const temp = Math.round(data.temp);
            const humidity = data.humidity;
            const weatherIcon = data.icon_name;

            document.getElementById('weather').innerHTML = `
                    <div class="weather-container">
                        <img src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="Weather Icon" />
                        <div class="weather-info">
                            <p class="temperature">${temp}°F</p>
                            <p class="humidity">Humidity ${humidity}%</p>
                        </div>
                    </div>
                `;

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Fetch weather data initially
fetchWeatherData();

// Set interval to refresh weather data every 300 seconds (5 minutes)
const lag = 300 //seconds
setInterval(fetchWeatherData, lag * 1000);

fetch('http://127.0.0.1:5000/calendar')
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        document.getElementById('calendar-iframe').src = data.url;  // Use the URL from the response
    })
    .catch(error => console.error('Error loading calendar URL:', error));
