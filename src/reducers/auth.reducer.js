import { USER_AUTH_ERROR, USER_AUTH_REQUEST, USER_AUTH_SUCCESS } from "../constants"


const initialState = {
    user: {},
    token: null,
    loggedIn : false,
    loading: false,
    error: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTH_REQUEST:          
            return state = {
                ...state,
                loading: true
            }
        case USER_AUTH_SUCCESS:          
            return state = {
                ...state,
                loading: false,
                loggedIn : true,
                user: action.data.user,
                token: action.data.token
            }
         case USER_AUTH_ERROR:          
            return state = {
                ...state,
                loggedIn : false,
                error: action.data
            }
        default: return state;
           
    }
}

export default authReducer;