const APIKey = "d8388590bf9844ca9867ebab3db4127f";
const cityTextarea = document.getElementById('cityTextarea');
const forecastDivs = ['00', '01', '02', '03', '04'];
const searchHistoryList = document.getElementById('searchHistoryList')
const conditionToImageMap = {
    Clear: './assets/images/01d.png',
    Clouds: './assets/images/02d.png',
    Scattered: './assets/images/03d.png',
    Broken: './assets/images/04d.png',
    Shower: './assets/images/09d.png',
    Rain: './assets/images/10d.png',
    Thunderstorm: './assets/images/11d.png',
    Snow: './assets/images/13d.png',
    Mist: './assets/images/50d.png',
};

cityTextarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
    }
});
cityTextarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && cityTextarea.value.trim() !== '') {
        localStorage.setItem('cityValue', cityTextarea.value);

        var city = cityTextarea.value;
        saveSearchToLocalStorage(city);

        updateSearchHistoryList();

        cityTextarea.value = '';
        currentWeather(city);
    }}
)
        function currentWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                const mainCondition = data.weather[0].main;
                var currentimg = document.getElementById('currentimg');
                currentimg.src = conditionToImageMap[mainCondition] || './assets/images/01d.png';

                const temperatureKelvin = data.main.temp;
                const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9 / 5 + 32;
                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;

                var currentCity = document.getElementById('currentCity');
                var currentDate = new Date();
                currentCity.innerHTML = city + ": " + "(" +currentDate.toDateString() + ")";
                
                var currentimg = document.getElementById('currentimg')
                
                var currentTemp = document.getElementById('currentTemp');
                currentTemp.innerHTML = "Temp: " + temperatureFahrenheit.toFixed(1) + "°F";
                var currentWind = document.getElementById('currentWind');
                currentWind.innerHTML = "Wind: " + windSpeed.toFixed(1) + "MPH";
                var currentHumidity = document.getElementById('currentHumidity');
                currentHumidity.innerHTML = "Humidity: " + humidity.toFixed(1) + "%";
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
            const ForecastapiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
            fetch(ForecastapiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                const currentCity = document.getElementById('currentCity');
                currentCity.textContent = `${city} (${new Date().toDateString()})`;

                for (let i = 0; i < forecastDivs.length; i++) {
                    const forecastDiv = document.getElementById(forecastDivs[i]);
                    const forecastData = data.list[i * 8]; 

                    const temperatureKelvin = forecastData.main.temp;
                    const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9 / 5 + 32;
                    const windSpeed = forecastData.wind.speed;
                    const humidity = forecastData.main.humidity;

                    forecastDiv.innerHTML = `
                        <h4>${new Date(forecastData.dt_txt).toDateString()}</h4>
                        <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
                        <p>Wind: ${windSpeed} m/s</p>
                        <p>Humidity: ${humidity}%</p>
                    `;
                
                        // Extract the main weather condition from the forecast data
                        const mainCondition = data.list[i * 8].weather[0].main;
                
                        // Create an image element
                        const imageElement = document.createElement('img');
                        imageElement.src = conditionToImageMap[mainCondition] || './assets/images/01d.png'; // Use a default image if the condition is not in the map
                
                        // Append the image element to the forecastDiv
                        forecastDiv.appendChild(imageElement);
                    }
                    
    
                })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

function saveSearchToLocalStorage(city) {
    const searchHistory = new Set(JSON.parse(localStorage.getItem('searchHistory')) || []);

    // Add the new search to the Set
    searchHistory.add(city);

    // Convert the Set back to an array and save it to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(Array.from(searchHistory)));
}

function updateSearchHistoryList() {
    // Clear the existing search history list
    searchHistoryList.innerHTML = '';

    // Retrieve the search history from localStorage
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Populate the search history list
    searchHistory.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        searchHistoryList.appendChild(listItem);
    });
}

searchHistoryList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        const clickedCity = event.target.textContent;
        cityTextarea.value = clickedCity; // Set the search input to the clicked city
        currentWeather(clickedCity);
    }
});
