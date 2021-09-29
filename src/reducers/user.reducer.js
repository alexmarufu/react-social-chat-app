import { 
    USER_ACTION_REQUEST,
    ADD_MESSAGE_ERROR,
    ADD_POST_ERROR,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_ERROR,
    GET_POSTS_ERROR,
    GET_FRIEND_INFO_SUCCESS,
    GET_FRIEND_INFO_ERROR
} from "../constants"

const initialState = {
    posts: [],
    friends: [],
    userInfo: {},
    loading: false,
    error: null
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTION_REQUEST:          
            return state = {
                ...state,
                loading: true
            }
        case GET_FRIENDS_SUCCESS:          
            return state = {
                ...state,
                loading: false,
                friends: action.data.friends
            }
        case GET_FRIEND_INFO_SUCCESS:          
            return state = {
                ...state,
                loading: false,
                userInfo: action.data.userInfo
            }
   
         case ADD_MESSAGE_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
         case GET_FRIENDS_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
         case GET_FRIEND_INFO_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
         case GET_POSTS_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
         case ADD_POST_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
        default: return state;
           
    }
}

export default userReducer;