import { 
    USER_ACTION_REQUEST,
    GET_MESSAGES_ERROR,
    GET_MESSAGES_SUCCESS,
  
} from "../constants"

const initialState = {
    messages: [],
    loading: false,
    error: null
}


const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTION_REQUEST:          
            return state = {
                ...state,
                loading: true
            }
        case GET_MESSAGES_SUCCESS:          
            return state = {
                ...state,
                loading: false,
                messages: action.data.messages
            }      
        case GET_MESSAGES_ERROR:          
            return state = {
                ...state,
                error: action.data.error
            }
       
    
        default: return state;
           
    }
}

export default messagesReducer;