let days = [ 'Sunday' , 'Monday' , 'Tuseday' , 'Wednsday' , 'Thursday' ,'Friday' , 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let city = document.getElementById('location');
let today = document.getElementById('thisDay');
let todaysDate = document.getElementById('todaysDate');
let todaysTemp = document.getElementById('mainDegree');
let todaysCondition = document.getElementById('condition');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirection =document.getElementById('windDirection'); 
let tomorrowDay = document.getElementById('tomorrowDay');
let tomorrowConditions = document.getElementById('tomorrowConditions');
let afterTomorrowDay = document.getElementById('afterTomorrowDay');
let afterTomorrowConditions = document.getElementById('afterTomorrowConditions');
let findBox = document.getElementById('findBox');

let date = new Date();
let theDay = date.getDay();
let month = date.getMonth();
let thisDate = date.getDate();
let theDayOfTomorrow = theDay+1;
if (theDayOfTomorrow==days.length){
    theDayOfTomorrow=0;
}
let theDayafterTomorrow = theDayOfTomorrow+1;
if (theDayafterTomorrow==days.length){
    theDayafterTomorrow=0;

}


 async function getWeather(city){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7ae917ae669e4d509cf144406241901&q=`+city+`&days=7`);
    let responseData = await response.json();
    return responseData;
}

 async function startup(cityName='cairo'){
let getWeatherData =await getWeather(cityName);
if(!getWeatherData.error){
    display(getWeatherData);

}
}


function display (weatherData){

    /////////////////////today\\\\\\\\\\\\\\\\\\
    city.innerHTML = weatherData.location.name;
    today.innerHTML = days[theDay];
    todaysDate.innerHTML = thisDate.toString() + months[month];
    todaysTemp.innerHTML =weatherData.current.temp_c + `<sup>o</sup>C <img src="https:`+weatherData.current.condition.icon+`" alt="">`
    todaysCondition.innerHTML = weatherData.current.condition.text;
    humidity.innerHTML = `<i class="fa-solid fa-umbrella"></i> `+weatherData.current.humidity+ `%`;
    wind.innerHTML = `<i class="fa-solid fa-wind"></i> `+weatherData.current.wind_kph+`km/h`;
    windDirection.innerHTML = `<i class="fa-regular fa-compass"></i>`+ weatherData.current.wind_dir;

/////////////////////////////tomorrow///////////////////////

    tomorrowDay.innerHTML = days[theDayOfTomorrow];
    tomorrowConditions.innerHTML = `<img src="https:`+weatherData.forecast.forecastday[1].day.condition.icon+`" class="img-fluid w-15 mt-4" alt="">
                                    <h4 class="text-white fs-4 mt-4" >
                                    `+weatherData.forecast.forecastday[1].day.maxtemp_c+`<sup>o</sup>C 
                                    </h4>
                                    <h4 class="textColor fs-6 mb-4" >
                                    `+weatherData.forecast.forecastday[1].day.mintemp_c+`<sup>o</sup>C 
                                    </h4>
                                    <p class="condition mb-0" >`+weatherData.forecast.forecastday[1].day.condition.text+`</p>`

    //////////////////////////////////after tmorrow///////////////////////////
    afterTomorrowDay.innerHTML = days[theDayafterTomorrow];
    

    afterTomorrowConditions.innerHTML = `<img src="https:`+weatherData.forecast.forecastday[2].day.condition.icon+`" class="img-fluid w-15 mt-4" alt="">
                                        <h4 class="text-white fs-4 mt-4" >
                                        `+weatherData.forecast.forecastday[2].day.maxtemp_c+`<sup>o</sup>C 
                                        </h4>
                                        <h4 class="textColor fs-6 mb-4" >
                                        `+weatherData.forecast.forecastday[2].day.mintemp_c+`<sup>o</sup>C 
                                        </h4>
                                        <p class="condition mb-0" >`+weatherData.forecast.forecastday[2].day.condition.text+`</p>`

}

function search(){
   
        startup(findBox.value);
    
}

