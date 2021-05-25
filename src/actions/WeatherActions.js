const setLocation = (loaction) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCATION', loaction })
    }
}
const setIsCelcius = (isCelcius) => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_CELCIUS', isCelcius })
    }
}


export default {
    setLocation,
    setIsCelcius
}