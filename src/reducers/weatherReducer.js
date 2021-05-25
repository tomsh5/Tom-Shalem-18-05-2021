const initialState = {
    currLoaction: {
        name: 'Tel-Aviv',
        key: '215854'
    },
    isCelcius: true
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

        default:
            return state
    }
}

export default weatherReducer