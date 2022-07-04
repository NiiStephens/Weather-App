//selecting html elements for styling.
const citysummary = document.getElementById("city-weather-summary")
const input = document.getElementById("city")



setup()
function setup(){
    //selecting button element and adding eventListerner
    const buttton = document.getElementById("submit")
    buttton.addEventListener("click", display)

    const userInput = document.getElementById("city")
        userInput.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            event.preventDefault()
            document.getElementById("submit").click()
        }
    })
}
    

function display(){
    // fetching from api with "city" as input value
    const city = input.value
    //console.log(city)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
    .then(function(response){
        return response.json()
       
    })
    .then(function(data){
        showWeatherData(data)
        
    })
}

// displaying api data to dom by saving data to variables and assigning them to DOM via innerHTML
function showWeatherData(data){
    console.log(data)
    let hum = data.main.humidity
    let name = data.name
    let weatherStatus = data.weather[0].description
    let country = data.sys.country
    let sunrise = data.sys.sunrise
    let sunset = data.sys.sunset
    let lat = data.coord.lat
    let lon = data.coord.lon

    citysummary.innerHTML =
    `
    <div class="summary">
        <span>City Name: </span>
        <span>${name}</span>
    </div>
    <div class="summary">
        <span>Country code: </span>
        <span>${country}</span>
    </div>
    <div class="summary">
        <span>Weather Status: </span>
        <span>${weatherStatus}</span>
    </div>
    <div class="summary">
        <span>Humidity: </span>
        <span>${hum}</span>
    </div>
    <div class="summary">
        <span>Sunrise: </span>
        <span>${window.moment(sunrise * 1000).format('HH:mm a')}</span>
    </div>
    <div class="summary">
        <span>Sunset: </span>
        <span>${window.moment(sunset * 1000).format('HH:mm a')}</span>
    </div>
    <div class="summary">
        <span>City coordinates: </span>
        <span>${lat}N  ${lon}E</span>
    </div>
    `
}

