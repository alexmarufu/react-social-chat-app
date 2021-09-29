import { 
    USER_ACTION_REQUEST,  
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    
} from "../constants"

const initialState = {
    allPosts: [],
    loading: false,
    error: null
}


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTION_REQUEST:          
            return state = {
                ...state,
                loading: true
            }      
      
        case GET_POSTS_SUCCESS:          
            return state = {
                ...state,
                loading: false, 
                allPosts: action.data.allPosts
            }    
        case GET_POSTS_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
      
            default: return state;
           
    }
}

export default postsReducer;