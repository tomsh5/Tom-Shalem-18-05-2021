const addToFavorites = (city) => {
    return (dispatch) =>{
        dispatch({ type: 'ADD_TO_FAVORITES', city })
    }
}
const RemoveFromFavorites = (city) => {
    return (dispatch) =>{
        dispatch({ type: 'REMOVE_FROM_FAVORITES', city })
    }
}


export default {
    addToFavorites,
    RemoveFromFavorites
}