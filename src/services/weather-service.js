import Axios from "axios";

var axios = Axios.create({
    withCredentials: false
});

export default  {
    getLocationByName,
    getCurrentWeather,
    getFiveDaysWeather,
    getLocationByGeoCoords
};

const API_KEY = 'ku3TWkIGVJl9x7GY6N3Ro5AYjEJcRYiA' 
const BASE_URL = `https://dataservice.accuweather.com/`

function getLocationByName(cityName){
    const url = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityName}&language=en-us`
    return axios.get(url).then(res => res.data[0]);
}


function getCurrentWeather(locationKey){;
    const url = `${BASE_URL}currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en-us&details=false`
    return axios.get(url).then(res => res.data[0])
}


function getFiveDaysWeather(locationKey, isCelciusTemp){
    const url = `${BASE_URL}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&language=en-us&details=false&metric=${isCelciusTemp}`
    return axios.get(url).then(res => res.data.DailyForecasts);
}

function getLocationByGeoCoords(pos){
    console.log(pos);
    if (pos){
    const url = `${BASE_URL}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${pos.lat}%2C${pos.long}&language=en-us&details=false&toplevel=true`
    return axios.get(url).then(res => res.data)
    }
}