API_KEY_1 = "413f0845fdf146a4213f677c57cd3d50"
API_URL = "API_URL = https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric"

const weatherDataEl = document.getElementById("weather-data")
// console.log(weatherDataEl)
const weatherInput = document.getElementById("weather-input")

const formEl = document.querySelector("form")
// console.log(formEl)

formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    const inputValue = weatherInput.value
    // console.log(inputValue)
    getWeatherData(inputValue)
})

async function getWeatherData(inputValue){
    
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY_1}&units=metric`)
    
        if(!response.ok){
            throw new Error("Network Issues has Arised")
        }
        const data = await response.json()
        //  console.log(data)
    
        const icon = data.weather[0].icon
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}℃`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${Math.round(data.wind.speed)}m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" />`

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`
        weatherDataEl.querySelector(".description").textContent = `${description}`

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) =>(
            `<div class="detailItems">${detail}</div>`
        )).join("")

    }
    catch(err){
        console.log(err)
        weatherDataEl.querySelector(".icon").innerHTML = ``
        weatherDataEl.querySelector(".temperature").textContent = ``
        weatherDataEl.querySelector(".description").textContent = `Something bad occured, check it out`
        weatherDataEl.querySelector(".details").innerHTML = ''
    }
}