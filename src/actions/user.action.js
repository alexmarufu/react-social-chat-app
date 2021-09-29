import axios from "../Axios";
import { 
    USER_ACTION_REQUEST,
    ADD_MESSAGE_ERROR,
    ADD_POST_ERROR,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_ERROR,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_ERROR,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_FRIEND_INFO_SUCCESS,
    GET_FRIEND_INFO_ERROR
} from "../constants"


export const addMessage = (message) => async (dispatch) => {
  //dispatch({ type: USER_ACTION_REQUEST })
  try {
   const res = await axios.post("/message", message)
   if(res.status === 201) {
    //dispatch(getMessages())
    dispatch(getAllPosts())
    dispatch(getFriends())
   } else {
    dispatch({ type: ADD_MESSAGE_ERROR, data: res.data.error })
   }
  } catch (error) {
    dispatch({ type: ADD_MESSAGE_ERROR, data: error })
  }
}

export const addPost = (post) => async (dispatch) => {
    //dispatch({ type: USER_ACTION_REQUEST })
    try {
     const res = await axios.post("/addpost", post)
     if(res.status === 201) {
      //dispatch(getMessages())
      dispatch(getAllPosts())
      dispatch(getFriends())
     } else {
      dispatch({ type: ADD_POST_ERROR, data: res.data.error })
     }
    } catch (error) {
      console.log(error);
    }
  }

export const getMessages = (userId) => async (dispatch) => {
    dispatch({ type: USER_ACTION_REQUEST })
    try {
     const res = await axios.get(`/messages/${userId}`)
     console.log(res)     
     if(res.status === 200) {
        dispatch({ type: GET_MESSAGES_SUCCESS, data: res.data })
       //console.log(res)
     } else {
      dispatch({ type: GET_MESSAGES_ERROR, data: res.data.error })
     }
    } catch (error) {
      console.log(error);
    }
  }


  export const getFriends = () => async (dispatch) => {
    dispatch({ type: USER_ACTION_REQUEST })
    try {
     const res = await axios.get("/users")
     console.log(res)
     if(res.status === 200) {
        dispatch({ type: GET_FRIENDS_SUCCESS, data: res.data })
       } else {
      dispatch({ type: GET_FRIENDS_ERROR, data: res.data.error })
     }
    } catch (error) {
      console.log(error);
    }
  }

  export const getAllPosts = () => async (dispatch) => {
    dispatch({ type: USER_ACTION_REQUEST })
    try {
     const res = await axios.get("/posts")
     console.log(res)
     if(res.status === 200) {
        dispatch({ type: GET_POSTS_SUCCESS, data: res.data })
     } else {
      dispatch({ type: GET_POSTS_ERROR, data: res.data.error })
     }
    } catch (error) {
      console.log(error);
    }
  }

  export const getFriendInfo = (userId) => async (dispatch) => {
    dispatch({ type: USER_ACTION_REQUEST })
    try {
     const res = await axios.get(`/user/${userId}`)
     console.log(res)
     if(res.status === 200) {
        dispatch({ type: GET_FRIEND_INFO_SUCCESS, data: res.data })
     } else {
      dispatch({ type: GET_FRIEND_INFO_ERROR, data: res.data.error })
     }
    } catch (error) {
      console.log(error);
    }
  }