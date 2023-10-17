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
    }
});
city = cityTextarea;
console.log(cityTextarea);