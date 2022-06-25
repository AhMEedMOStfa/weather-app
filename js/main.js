







//common variable for project

var apiResponse;
var apiData;

var month = [ 'jan' , 'February' , 'March' , 'April', 'May' , 'june' , 'july' , 'August' , 'Sept' , 'Oct' , 'Nov' , 'Dec' ];


// The getDay() method returns the weekday as a number.
// You can use an array to display the name of the weekday:
// must start with sunday
var day = [ 'sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' ,'saturday' ];


//tomorrow must start with monday
var tomorrow = ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' ,'saturday','sunday'];


//last day must start with tuesday

var b3dBokraDay = ['Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' ,'saturday','sunday','Monday'];



async function getApiData(city)
{
    
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key= 01f668047b624f9290a201806220102&q=${city}&days=3`);
    apiData = await apiResponse.json();
    console.log(apiData);
    getWeatherTodayData();
    getWeatherNextDayData();
    getWeatherLastDayData();
}

//call async fn by alexandria as default value
getApiData('Alexandria');


var searchBox = document.getElementById("searchBox");
var searchBtn = document.getElementById("searchBtn");


//call async fn by any city in search box as value
searchBtn.addEventListener("click" , function(){
   
    getApiData(searchBox.value);

})



//today card Elements
var today = document.getElementById("today");
var todayDate = document.getElementById("todayDate");
var todayLocation = document.getElementById("todayLocation");
var todayTemp = document.getElementById("todayTemp");
var todayCondition = document.getElementById("todayCondition");
var humidityValue = document.getElementById("humidityValue");
var windVelocity = document.getElementById("windVelocity");
var windDirection = document.getElementById("windDirection");
var cloud = document.getElementById("cloud");


function getWeatherTodayData()
{
    var date = new Date();

    //today card values
    today.innerHTML = `${day[date.getDay()]}`;
    todayDate.innerHTML = `${date.getDate()} ${month[date.getMonth()]}`;
    todayLocation.innerHTML = apiData.location.name;
    todayTemp.innerHTML = apiData.current.temp_c +`<span><sup>o</sup>C</span>`;
    todayCondition.setAttribute('src', `https:${apiData.current.condition.icon}`) ;
    cloud.innerHTML = apiData.current.condition.text;
    humidityValue.innerHTML = apiData.current.humidity +`<span>%</span>`;
    windVelocity.innerHTML = apiData.current.wind_kph + `<span>Km/h</span>`;
    windDirection.innerHTML = apiData.current.wind_dir;
 
}


//next day card Elements

var tomorrowDay = document.getElementById("tomorrowDay");
var tomorrowIcon = document.getElementById("tomorrowIcon");
var tomorrowLargeTemp = document.getElementById("tomorrowLargeTemp");
var tomorrowSmallTemp = document.getElementById("tomorrowSmallTemp");
var tomorrowCondition = document.getElementById("tomorrowCondition");

function getWeatherNextDayData()
{
    var date1 = new Date();

    //next day card values
    tomorrowDay.innerHTML = `${tomorrow[date1.getDay()]}`;
    tomorrowIcon.setAttribute('src' , `https:${apiData.forecast.forecastday[1].day.condition.icon}`);
    tomorrowLargeTemp.innerHTML = apiData.forecast.forecastday[1].day.maxtemp_c + `<span><sup>o</sup>C</span>`;
    tomorrowSmallTemp.innerHTML = apiData.forecast.forecastday[1].day.mintemp_c + `<span><sup>o</sup>C</span>`;
    tomorrowCondition.innerHTML = apiData.forecast.forecastday[1].day.condition.text;
}


//last day card Elements

var lastDay = document.getElementById("lastDay");
var lastDayIcon = document.getElementById("lastDayIcon");
var lastDayLargeTemp = document.getElementById("lastDayLargeTemp");
var lastDaySmallTemp = document.getElementById("lastDaySmallTemp");
var lastDayCondition = document.getElementById("lastDayCondition");

function getWeatherLastDayData()
{
    var date2 = new Date();
    //last day card values
    lastDay.innerHTML = `${b3dBokraDay[date2.getDay()]}`; 
    lastDayIcon.setAttribute('src' , `https:${apiData.forecast.forecastday[2].day.condition.icon}`);
    lastDayLargeTemp.innerHTML = apiData.forecast.forecastday[2].day.maxtemp_c + `<span><sup>o</sup>C</span>`;
    lastDaySmallTemp.innerHTML = apiData.forecast.forecastday[2].day.mintemp_c + `<span><sup>o</sup>C</span>`;
    lastDayCondition.innerHTML = apiData.forecast.forecastday[2].day.condition.text;
}
