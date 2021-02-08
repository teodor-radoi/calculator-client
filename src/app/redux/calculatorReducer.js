import {SET_ERROR, SET_NUMBER_1, SET_NUMBER_2, SET_RESULT} from "./dispatchTypes";

const defaultState = {
    number1: null,
    number2: null,
    result: null,
    error: null
}

const calculatorReducer = (state = defaultState, action) => {
    // While redux toolkit offers a newer approach to writing reducers, I prefer the classic way as it offers more clarity
    switch (action.type) {
        case SET_NUMBER_1:
            // using the toolkit would allow for pseudo mutation of data
            // => code written as it would mutate the data, but the toolkit would recreate it internally
            return {
                ...state,
                number1: action.value
            }
        case SET_NUMBER_2:
            return {
                ...state,
                number2: action.value
            }
        case SET_RESULT:
            return {
                ...state,
                result: action.value,
                error: null
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.value,
                result: null
            }
        default:
            return state
    }
}

export default calculatorReducer