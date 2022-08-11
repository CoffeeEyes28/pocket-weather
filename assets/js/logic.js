
var search = document.getElementById('search')

var formEl = document.getElementById('form')

var searchHistory = document.getElementById('searchHistory')

var ulEl = document.getElementById('searchList')

var weatherBox = document.getElementById('weatherbox')

var weatherList = document.getElementById('weatherlist')

function storeSearch(){
    var allSearches = JSON.parse(localStorage.getItem('allSearches'));

    if (allSearches === null) allSearches = [];
    previousSearch = localStorage.getItem('search')
    var stored = {
        search: previousSearch
    }
    localStorage.setItem('stored', JSON.stringify(stored))
    allSearches.push(stored)
    localStorage.setItem('allSearches', JSON.stringify(allSearches))
}


function renderSearch(){

    var getObj = localStorage.getItem('allSearches')
    var loopObj = JSON.parse(getObj)

    for( i = 0; i < loopObj.length; i++){
        var stored = loopObj[i].search
        var liEl = document.createElement('li')
        ulEl.appendChild(liEl)
        var btn = document.createElement('button')
        btn.textContent = stored
        liEl.appendChild(btn)
        var brEl = document.createElement('br')
        ulEl.appendChild(brEl)
        
    }

}




function weatherGrab(){
    
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.value.trim() + '&limit=1&appid=ac776302cf92a26e15c3c3e4a0381c56'
    fetch(geoUrl)
    .then (function(response){
        return response.json()
    })
    .then(function(data){
   
        for(i=0; i < data.length; i++){
     var lat = data[i].lat
     var lon = data[i].lon
     var location = document.getElementById('location')
     location.textContent = data[i].name
        }
     var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=ac776302cf92a26e15c3c3e4a0381c56'
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
       
        
       weatherList.style.display = 'block'

        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var uv = data.current.uvi


        currentTemp = document.getElementById('current_temp')
        currentTemp.textContent = 'Temp: ' + temp + '°F'
        currentWind = document.getElementById('current_wind')
        currentWind.textContent = 'Wind: ' + wind + ' MPH'
        currentHumidity = document.getElementById('current_humidity')
        currentHumidity.textContent = 'Humidity: ' +  humidity + '%'
        currentUv = document.getElementById('current_uv')
        currentUv.textContent = 'UV Index: ' + uv
        
        if(uv < 3){
            currentUv.style.backgroundColor = 'green'
        }else if (uv < 6){
            currentUv.style.backgroundColor = 'yellow'
        }else if (uv < 8){
            currentUv.style.backgroundColor = 'orange'
        }else if (uv < 11){
            currentUv.style.backgroundColor = 'red'

        }else if (uv > 10.9){
            currentUv.style.backgroundColor = 'purple'
        }


        var weather = data.current.weather
        for(i = 0; i < weather.length; i++){
            var icon = weather[i].icon
            console.log(icon)
        }

       var iconUrl = 'http://openweathermap.org/img/wn/' + icon +'@2x.png'
       var weatherCon = document.getElementById('weathercon')
       weatherCon.src = iconUrl  

    })

    var forecastUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat+ '&lon=' + lon + '&appid=ac776302cf92a26e15c3c3e4a0381c56'
    fetch(forecastUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })



    })

}




formEl.addEventListener('submit', function(event){
    var searchValue = search.value.trim();
if (searchValue.length == 0){
    alert('Please enter a city!')
    event.preventDefault();
}else{
    localStorage.setItem('search', searchValue)
    event.preventDefault();
    storeSearch();
    weatherGrab();
}
})

// renderSearch();



