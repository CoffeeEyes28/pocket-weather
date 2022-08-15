

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
        var date = moment().tz(data.timezone).format('MMMM Do, YYYY')
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
        currentUv.textContent = 'UV Index: ' 
        mark = document.createElement('MARK')
        mark.textContent = uv
        currentUv.appendChild(mark)
        
        
        if(uv < 3){
            mark.classList.add('bg-success')
            mark.classList.add('rounded')
         }else if (uv < 6){
            mark.classList.add('bg-warning')
            mark.classList.add('rounded')
        }else if (uv < 8){
            mark.style.backgroundColor = 'orange'
            mark.classList.add('rounded')
        }else if (uv < 11){
            mark.classList.add('bg-danger')
            mark.classList.add('rounded')

        }else if (uv > 10.9){
            mark.style.backgroundColor = 'purple'
            mark.classList.add('rounded')
        }


        var weather = data.current.weather
        for(i = 0; i < weather.length; i++){
            var icon = weather[i].icon
       
        }

       var iconUrl = 'http://openweathermap.org/img/wn/' + icon +'@2x.png'
       var weatherCon = document.getElementById('weathercon')
       weatherCon.src = iconUrl  

       

    //    five day forecast
        var fiveDay = document.getElementById('fiveDay')
        fiveDay.style.display = 'block'
        fiveDay.style.listStyle = 'none'


        var day1 = document.getElementById('day1')
        day1.textContent = moment().tz(data.timezone).add(1,'days').format('MM/DD/YY')

        var day1Icon = document.getElementById('day1Icon')
        day1Icon.src = 'http://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon +'@2x.png'

        var oneTemp = document.getElementById('oneTemp')
        oneTemp.textContent = 'Temp: ' + data.daily[0].temp.day + '°F'

        var oneWind = document.getElementById('oneWind')
        oneWind.textContent = 'Wind: ' + data.daily[0].wind_speed + ' ' + 'MPH'

        var oneHumidity = document.getElementById('oneHumidity')
        oneHumidity.textContent = 'Humidity: ' + data.daily[0].humidity + '%'


        var day2Weather = data.daily[1].weather

        for(i=0; i < day2Weather.length; i++){
            var icon2 = day2Weather[i].icon
        }
        
        var day2 = document.getElementById('day2')
        day2.textContent = moment().tz(data.timezone).add(2,'days').format('MM/DD/YY')

        var day2Icon = document.getElementById('day2Icon')
        day2Icon.src = 'http://openweathermap.org/img/wn/' + icon2 +'@2x.png'

        var twoTemp = document.getElementById('twoTemp')
        twoTemp.textContent = 'Temp: ' + data.daily[1].temp.day + '°F'

        var twoWind = document.getElementById('twoWind')
        twoWind.textContent = 'Wind: ' + data.daily[1].wind_speed + ' ' + 'MPH'

        var twoHumidity = document.getElementById('twoHumidity')
        twoHumidity.textContent = 'Humidity: ' + data.daily[1].humidity + '%'

        
        var day3Weather = data.daily[2].weather

        for(i=0; i < day3Weather.length; i++){
            var icon3 = day3Weather[i].icon
        }
        
        var day3 = document.getElementById('day3')
        day3.textContent = moment().tz(data.timezone).add(3,'days').format('MM/DD/YY')

        var day3Icon = document.getElementById('day3Icon')
        day3Icon.src = 'http://openweathermap.org/img/wn/' + icon3 +'@2x.png'

        var threeTemp = document.getElementById('threeTemp')
        threeTemp.textContent = 'Temp: ' + data.daily[2].temp.day + '°F'

        var threeWind = document.getElementById('threeWind')
        threeWind.textContent = 'Wind: ' + data.daily[2].wind_speed + ' ' + 'MPH'

        var threeHumidity = document.getElementById('threeHumidity')
        threeHumidity.textContent = 'Humidity: ' + data.daily[2].humidity + '%'




        var day4Weather = data.daily[3].weather

        for(i=0; i < day4Weather.length; i++){
            var icon4 = day4Weather[i].icon
        }
        
        var day4 = document.getElementById('day4')
        day4.textContent = moment().tz(data.timezone).add(4,'days').format('MM/DD/YY')

        var day4Icon = document.getElementById('day4Icon')
        day4Icon.src = 'http://openweathermap.org/img/wn/' + icon4 +'@2x.png'

        var fourTemp = document.getElementById('fourTemp')
        fourTemp.textContent = 'Temp: ' + data.daily[3].temp.day + '°F'

        var fourWind = document.getElementById('fourWind')
        fourWind.textContent = 'Wind: ' + data.daily[3].wind_speed + ' ' + 'MPH'

        var fourHumidity = document.getElementById('fourHumidity')
        fourHumidity.textContent = 'Humidity: ' + data.daily[3].humidity + '%'


        var day5Weather = data.daily[4].weather

        for(i=0; i < day5Weather.length; i++){
            var icon5 = day5Weather[i].icon
        }
        
        var day5 = document.getElementById('day5')
        day5.textContent = moment().tz(data.timezone).add(5,'days').format('MM/DD/YY')

        var day5Icon = document.getElementById('day5Icon')
        day5Icon.src = 'http://openweathermap.org/img/wn/' + icon5 +'@2x.png'

        var fiveTemp = document.getElementById('fiveTemp')
        fiveTemp.textContent = 'Temp: ' + data.daily[4].temp.day + '°F'

        var fiveWind = document.getElementById('fiveWind')
        fiveWind.textContent = 'Wind: ' + data.daily[4].wind_speed + ' ' + 'MPH'

        var fiveHumidity = document.getElementById('fiveHumidity')
        fiveHumidity.textContent = 'Humidity: ' + data.daily[4].humidity + '%'


    })

    

    

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











