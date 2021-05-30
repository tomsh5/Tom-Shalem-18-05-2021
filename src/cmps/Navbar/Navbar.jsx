import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions/allActions";
import './Navbar.scss'

function _Navbar() {
    const dispatch = useDispatch();
    const isCelciusTemp = useSelector(state => state.weatherReducer.isCelcius);
    const isDark = useSelector(state => state.weatherReducer.isDark);


    useEffect(() => {
        if (!isDark) {
            document.body.className = 'day-img';
        }
        else{
            document.body.className = 'night-img';
        }
    }, [])

    function toggleTemp() {
        if (isCelciusTemp) {
            dispatch(allActions.WeatherActions.setIsCelcius(false))
        }
        else {
            dispatch(allActions.WeatherActions.setIsCelcius(true))
        }
    }

    function toggleIsDark() {
        if (isDark) {
            dispatch(allActions.WeatherActions.setIsDark(false))
            document.body.className = 'day-img';
        }
        else {
            dispatch(allActions.WeatherActions.setIsDark(true))
            document.body.className = 'night-img';
        }
    }


    return (
        <div className='navbar flex space-between align-center'>
            <div className="logo-container flex align-center space-between">
                <i className="fas fa-rainbow logo"><NavLink activeClassName='active-path' to="/" exact ></NavLink> </i>
                <div>
                    <a className={isCelciusTemp ? "active" : ""} onClick={toggleTemp}>C° </a>
            |
            <a className={isCelciusTemp ? "" : "active"} onClick={toggleTemp}> F°</a>
                </div>
                <div>
                    {!isDark && <i onClick={() => toggleIsDark()} className="fas fa-sun"></i>}
                    {isDark && <i onClick={() => toggleIsDark()} className="fas fa-moon"></i>}
                </div>
            </div>
            <ul className="flex">
                <li><NavLink activeClassName="active-path" to="/" exact >Home</NavLink></li>
                <li><NavLink activeClassName="active-path" to="/favorites" exact >Favorites</NavLink></li>
            </ul>

        </div>
    )
}

export const Navbar = withRouter(_Navbar)