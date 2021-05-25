import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../actions/allActions";
import './Navbar.scss'

function _Navbar() {
    const dispatch = useDispatch();
    const isCelciusTemp = useSelector(state => state.weatherReducer.isCelcius);


    function toggleTemp() {
        if (isCelciusTemp) {
            dispatch(allActions.WeatherActions.setIsCelcius(false))
        }
        else {
            dispatch(allActions.WeatherActions.setIsCelcius(true))
        }
    }


    return (
        <div className='navbar flex space-between align-center'>
            <div className="logo flex align-center space-between">
                <i className="fas fa-rainbow"><NavLink activeClassName='active-path' to="/" exact ></NavLink> </i>
                <div>
                    <a className={isCelciusTemp ? "active" : ""} onClick={ toggleTemp }>C° </a>
            |
            <a className={isCelciusTemp ? "" : "active"} onClick={ toggleTemp }> F°</a>
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