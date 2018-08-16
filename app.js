//Url: http://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=XXXXXXXXXXX
/*
Error handling "status":
200 OK
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
*/

var APPID ="APPID=XXXXXXXXXX";
var input;
var button;
var temp;
var humid;
var loc;
var desc;
var country;
var wind;
var cel;
var far;
var value_of_units;
var errorCode;
var icon;

function onThisClick(){
    if (value_of_units == true){
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+
        input.value+"&units=metric&" +APPID;
        value_of_units = true;
        console.log(input.value);
    
        }else{
            var url = "http://api.openweathermap.org/data/2.5/weather?q="+
        input.value+"&units=imperial&" +APPID;
        value_of_units = false;
        console.log(input.value);
        }
        sendRequest(url);
}


function updateByCity(city){
    if (value_of_units == true){
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+
    city+"&units=metric&" +APPID;
    value_of_units = true;

    }else{
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+
    city+"&units=imperial&" +APPID;
    value_of_units = false;
    }
    sendRequest(url);
}

function sendRequest(url){
    var xmlhttp= new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status ==200){
            errorCode.innerHTML =" ";
            var data =JSON.parse(xmlhttp.responseText);
            var weather={};
            weather.temp = data.main.temp;
            weather.location = data.name;
            weather.humid = data.main.humidity;
            weather.desc = data.weather[0].description;
            weather.country = data.sys.country;
            weather.wind = data.wind.speed;
            weather.icon = data.weather[0].id;
            update(weather);
        }else if(xmlhttp.readyState == 4 && xmlhttp.status == 404){
            errorCode.innerHTML = "404 Not Found";
        } else if(xmlhttp.readyState == 4 && xmlhttp.status == 400){
            errorCode.innerHTML = "400 Bad Request";
        }else if(xmlhttp.readyState == 4 && xmlhttp.status == 401){
            errorCode.innerHTML = "401 Unauthorized";
        }else if(xmlhttp.readyState == 4 && xmlhttp.status == 403){
            errorCode.innerHTML = "403 Forbidden"
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather){
    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.location;
    humid.innerHTML = weather.humid;
    desc.innerHTML = weather.desc;
    country.innerHTML = weather.country;
    wind.innerHTML = weather.wind;
    icon.src = "img/codes/" + weather.icon +".png";

}

function buttonClick(){
    city = input.value;
    updateByCity(city);
}

function changetoCel(){
    value_of_units =true;
    far.style.opacity = 0.5;
    cel.style.opacity=1.0;
    city = loc.innerHTML;
    updateByCity(city);
}

function changetoFar(){
    value_of_units =false;
    far.style.opacity = 1.0;
    cel.style.opacity=0.5;
    city = loc.innerHTML;
    updateByCity(city);
}



window.onload = function(){
    input = document.getElementById('input');
    button = document.getElementById('buttonOne');
   temp = document.getElementById('celcius');
   loc = document.getElementById('loc');
    humid = document.getElementById('hum');
    desc = document.getElementById('description');
    country = document.getElementById('country');
    wind = document.getElementById('wind');
    cel = document.getElementById('cel');
    far = document.getElementById('far');
    errorCode = document.getElementById('errorStatus');
    icon = document.getElementById('icon');

    far.style.opacity = 0.5;
    value_of_units = true;

    var city = "Kalmar";
  updateByCity(city);
      
}
