

// variables
var search = document.getElementById('search')

var formEl = document.getElementById('form')

var weatherBox = document.getElementById('weatherbox')

var currentDay = document.getElementById('current_day')

var weatherList = document.getElementById('weatherlist')

var searchHistory = document.getElementById('searchHistory')

var searchList = document.getElementById('searchList')

var ulEl = document.getElementById('searchList')

var first = document.getElementById('search1')

var second = document.getElementById('search2')

var third = document.getElementById('search3')

var fourth = document.getElementById('search4')

var fifth = document.getElementById('search5')

var sixth = document.getElementById('search6')

var clear = document.getElementById('clear')

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
    searchHistory.style.display = 'block'
    
    
    var getObj = localStorage.getItem('allSearches')
    var loopObj = JSON.parse(getObj)
    loopObj.reverse();
    
    for( i = 0; i < loopObj.length; i++){

       
        
        if (loopObj[0] === undefined){
            first.style.display ='none'
        }else{
            first.style.display = 'block'
            first.textContent = loopObj[0].search.toUpperCase()
        }
        
       
        
        
        if (loopObj[1] === undefined ){
            second.style.display = 'none'
        }else{
            second.style.display ='block'
            second.textContent = loopObj[1].search.toUpperCase()
        }
        
       
       
        if (loopObj[2] === undefined){
            third.style.display = 'none'
        }else{
            third.style.display = 'block'
            third.textContent = loopObj[2].search.toUpperCase()
        }

      
       
        if(loopObj[3] === undefined){
            fourth.style.display = 'none'
        }else{
            fourth.style.display ='block'
            fourth.textContent = loopObj[3].search.toUpperCase()
        }
        
       
        
        if (loopObj[4] === undefined){
            fifth.style.display = 'none'
        }else{
            fifth.style.display ='block'
            fifth.textContent =  loopObj[4].search.toUpperCase()
        }

       
      
        if (loopObj[5] === undefined){
            sixth.style.display = 'none'
        }else{
            sixth.style.display ='block'
            sixth.textContent = loopObj[5].search.toUpperCase()
        }
    
       
        
    }

 
   
}




function weatherGrab(){
    renderSearch();
   
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
        var date = moment().tz(data.timezone).format('MMMM, Do, YYYY')
        currentDay.textContent = date
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
       
        }

       var iconUrl = 'http://openweathermap.org/img/wn/' + icon +'@2x.png'
       var weatherCon = document.getElementById('weathercon')
       weatherCon.src = iconUrl  

    })

    // var forecastUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat+ '&lon=' + lon + '&appid=ac776302cf92a26e15c3c3e4a0381c56'
    // fetch(forecastUrl)
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
        
    // })



    })
    weatherBox.style.display = 'block'
    

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


first.addEventListener('click', function(){
    search.value = first.textContent
    weatherGrab();
})

second.addEventListener('click', function(){
   search.value = second.textContent
    weatherGrab();
})

third.addEventListener('click', function(){
    search.value = third.textContent
    weatherGrab();
})

fourth.addEventListener('click', function(){
    search.value = fourth.textContent
    weatherGrab();
})

fifth.addEventListener('click', function(){
    search.value = fifth.textContent
    weatherGrab();
})

sixth.addEventListener('click', function(){
    search.value = sixth.textContent
    weatherGrab();
})

clear.addEventListener('click', function(){
    searchList.style.display = 'none'
    localStorage.clear();
})











