var APIKey = "d8388590bf9844ca9867ebab3db4127f";
var city = ''; // Replace with the city you want to get weather data for
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

const cityTextarea = document.getElementById('cityTextarea');

cityTextarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
    }
});
cityTextarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && cityTextarea.value.trim() !== '') {
        localStorage.setItem('cityValue', cityTextarea.value);

        city = cityTextarea.value;

        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const temperatureKelvin = data.main.temp;
                const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9 / 5 + 32;
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;
                console.log(
                    `Current temperature in ${city}: ${temperatureFahrenheit.toFixed(2)}°F`
                );

                var currentCity = document.getElementById('currentCity'); // Get currentCity element
                var currentDate = new Date();
                currentCity.innerHTML = city + ": " + "(" +currentDate.toDateString() + ")";

                var currentTemp = document.getElementById('currentTemp');
                currentTemp.innerHTML = "Temp: " + temperatureFahrenheit.toFixed(1) + "°F";
                var currentWind = document.getElementById('currentWind');
                currentWind.innerHTML = "Wind: " + windSpeed.toFixed(1) + "MPH"
                var currentHumidity = document.getElementById('currentHumidity');
                currentHumidity.innerHTML = "Humidity: " + humidity.toFixed(1) + "%";
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
});
