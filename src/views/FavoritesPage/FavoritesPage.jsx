import React from 'react';
import { useSelector } from "react-redux";
import { FavoritePreview } from '../../cmps/FavoritePreview/FavoritePreview'


export function FavoritesPage(props) {
    const favorites = useSelector(state => state.favoritesReducer.favorites);

    return (
        <div className="favorites-page main-layout">
            <h1>My Favorites Locations:</h1>
            <div className="favorites-list flex wrap">
                {favorites.map((favorite, idx) =>
                    <FavoritePreview key={idx} favoriteCity={favorite} />)}
            </div>
        </div>
    )
}