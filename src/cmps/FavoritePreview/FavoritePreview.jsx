import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import weatherService from "../../services/weather-service";
import allActions from "../../actions/allActions";

export function FavoritePreview(props) {
    const { favoriteCity } = props;
    const dispatch = useDispatch();
    const [currWeather, setCurrWeather] = useState(null)
    const isCelciusTemp = useSelector(state => state.weatherReducer.isCelcius);


    useEffect(() => {
        getCurrWeather(favoriteCity.key)
    }, []);

    async function getCurrWeather(key) {
        const currDayWeather = await weatherService.getCurrentWeather(key)
        setCurrWeather(currDayWeather)
    }

    function setCurrLocation() {
        dispatch(allActions.WeatherActions.setLocation({ name: favoriteCity.name, key: favoriteCity.key }))
    }

    return (
        <div onClick={setCurrLocation} className="favorite-preview">
            <NavLink to="/" exact >
                {favoriteCity && currWeather && <div className="flex column align-center">
                    <h2>{favoriteCity.name}</h2>
                    <img src={`images/weather${currWeather.WeatherIcon}.png`} />
                    {currWeather && <div>
                        {isCelciusTemp ? <span>{currWeather.Temperature.Metric.Value}°</span> : <span>{currWeather.Temperature.Imperial.Value}°</span>}
                        {isCelciusTemp ? <span>{currWeather.Temperature.Metric.Unit}</span> : <span>{currWeather.Temperature.Imperial.Unit}</span>}
                    </div>}
                </div>}
            </NavLink>
        </div>
    )
}