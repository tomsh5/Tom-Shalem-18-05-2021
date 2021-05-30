const initialState = {
    currLoaction: {
        name: 'haifa',
        key: '213181'
    },
    isCelcius: true,
    isDark: null
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOCATION": {
            return {
                ...state,
                currLoaction: action.loaction
            }
        }
        case "SET_IS_CELCIUS": {
            return {
                ...state,
                isCelcius: action.isCelcius
            }
        }
        case "SET_IS_DARK": {
            return {
                ...state,
                isDark: action.isDark
            }
        }

        default:
            return state
    }
}

export default weatherReducer