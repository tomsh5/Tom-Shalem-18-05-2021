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
const setIsDark = (isDark) => {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_DARK', isDark })
    }
}


export default {
    setLocation,
    setIsCelcius,
    setIsDark
}