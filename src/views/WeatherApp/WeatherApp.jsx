import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions/allActions";
import weatherService from "../../services/weather-service";
import geoLocationService from "../../services/geoLocation-service.js";
import { DayPreview } from '../../cmps/DayPreview/DayPreview'
import { useSnackbar } from 'notistack';



const _WeatherApp = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoritesReducer.favorites);
    const locationCity = useSelector(state => state.weatherReducer.currLoaction);
    const isCelciusTemp = useSelector(state => state.weatherReducer.isCelcius);
    const isGeoLocation = useSelector(state => state.weatherReducer.isGeoLocation);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [currWeather, setCurrWeather] = useState(null)
    const [curr5DaysWeather, setCurr5DaysWeather] = useState(null)
    const [search, setSearch] = useState(null)
    const [isCityFavorite, setIsCityFavorite] = useState(false);
    const [geoLocation, setGeoLocation] = useState(false);

    useEffect(() => {

        if (locationCity && !currWeather && !geoLocation) {
            getCurrWeather(locationCity.key)
        }
    });

    useEffect(() => {
        if (!isGeoLocation) {
            getGeoLocation()
        }
    }, [])

    useEffect(() => {
        if (geoLocation) {
            getLocationByGeoCoords(geoLocation)
        }
    }, [geoLocation])


    useEffect(() => {
        getCurrWeather(locationCity.key)
    }, [isCelciusTemp])

    useEffect(() => {
        checkIsFavorite()
    }, [locationCity])


    async function getGeoLocation() {
        const currGeoLocation = await geoLocationService.getGeoLocaion();
        try {
            if (currGeoLocation) {
                setGeoLocation(currGeoLocation)
                dispatch(allActions.WeatherActions.setIsGeoLocation(true))
            }
        }
        catch {
            showModal('server couldn\'t get your current location, try again', 'error', 3000)
        }
    }

    async function getLocationByGeoCoords(geo) {
        const loc = await weatherService.getLocationByGeoCoords(geo)
        try {
            console.log(loc);
            dispatch(allActions.WeatherActions.setLocation({ name: loc.LocalizedName, key: loc.Key }))
        }
        catch {
            showModal('server couldn\'t get your current location wather, try again', 'error', 3000)
        }

    }

    async function getLocationKey(city) {
        const currLoactionKey = await weatherService.getLocationByName(city)
        try {
            return currLoactionKey.Key
        }
        catch {
            showModal('Location name is not valid', 'error', 3000)
        }
    }

    async function getCurrWeather(key) {
        const currDayWeather = await weatherService.getCurrentWeather(key)
        const curr5DaysWeather = await weatherService.getFiveDaysWeather(key, isCelciusTemp)
        try {
            setCurrWeather(currDayWeather)
            setCurr5DaysWeather(curr5DaysWeather)
        }
        catch {
            showModal('server couldn\'t get the wather, try again', 'error', 3000)
        }
    }

    async function onSearch() {
        const key = await getLocationKey(search)
        try {
            await getCurrWeather(key)

            try {
                const name = search
                dispatch(allActions.WeatherActions.setLocation({ name: name, key: key }))
                document.querySelector('.search-input').value = ''
            }

            catch {
                showModal('server couldn\'t get the wather, try again', 'error', 3000)
            }
        }
        catch {
            showModal('server couldn\'t get the wather, try again', 'error', 3000)
        }
    }


    function handleChange({ target }) {
        if (target.value.match("^[a-zA-Z ]*$") != null) {
            const value = target.type === 'number' ? +target.value : target.value
            setSearch(value)
        }
        else {
            document.querySelector('.search-input').value = ''
            showModal('Please enter only english letters', 'error', 2000)
        }
    }

    function addToFavorites() {

        if (!isCityFavorite) {
            dispatch(allActions.FavoritesActions.addToFavorites(locationCity))
            showModal(locationCity.name + ' was added to your favorites', 'success', 2000)
        }
        else {
            dispatch(allActions.FavoritesActions.RemoveFromFavorites(locationCity))
            showModal(locationCity.name + ' was removed from your favorites', 'success', 2000)
        }
        isCityFavorite ? setIsCityFavorite(false) : setIsCityFavorite(true)
    }

    function checkIsFavorite() {
        let isLocationFavorite = false;
        if (favorites.length && locationCity) {
            favorites.map(favorite => {
                if (favorite.key === locationCity.key) {
                    isLocationFavorite = true
                }
            })
        }
        setIsCityFavorite(isLocationFavorite)
    }

    function showModal(txt, type, duration) {
        enqueueSnackbar(txt, {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            autoHideDuration: duration,
            variant: type,
            preventDuplicate: true,
        });
    }

    return (
        <div className="weather-app main-layout">
            <div className="search-conatiner flex justify-center">
                <input className="search-input" onChange={handleChange} type="text" />
                <button className="search-btn" onClick={onSearch}>Go</button>
            </div>
            <div className="curr-weather flex space-between align-center">
                <div className="city-conatiner flex space-between align-center">
                    {currWeather && <div className="flex column">
                        <div className="city-name flex align-center">
                            <h1>{locationCity.name}</h1>
                            <i onClick={addToFavorites} className={isCityFavorite ? "fas fa-star" : "far fa-star"}></i>
                        </div>
                        <div className="weather-temp flex align-center">
                            <div>
                                {currWeather && <img src={`images/weather${currWeather.WeatherIcon}.png`} />}
                            </div>
                            {isCelciusTemp ? <span>{Math.floor(currWeather.Temperature.Metric.Value)}°</span> : <span>{Math.floor(currWeather.Temperature.Imperial.Value)}°</span>}
                            {isCelciusTemp ? <span>{currWeather.Temperature.Metric.Unit}</span> : <span>{currWeather.Temperature.Imperial.Unit}</span>}
                        </div>
                    </div>}
                </div>
            </div>
            <div className="flex column align-center">
                {currWeather && <div>
                    <h1 className="weather-txt">{currWeather.WeatherText}</h1>
                </div>}
                {curr5DaysWeather && <div className="days-list">
                    {curr5DaysWeather.map((dayForcast, idx) =>
                        <DayPreview key={idx} dayForcast={dayForcast} />)}
                </div>}
            </div>
        </div>
    )
}

export const WeatherApp = React.memo(_WeatherApp)