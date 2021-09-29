import { Update } from "@material-ui/icons";
import axios from "../Axios"
import { USER_AUTH_ERROR, USER_AUTH_REQUEST, USER_AUTH_SUCCESS } from "../constants"



export const register = (user) => async (dispatch) => {  
    dispatch({type: USER_AUTH_REQUEST});
    try {
    const res = await axios.post("/register", user)
    if(res.status === 201) {
        dispatch({ type: USER_AUTH_SUCCESS, data: {user: res.data.user, token: res.data.token} })
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", JSON.stringify(res.data.token))
        console.log(res)
    } else {
        dispatch({ type: USER_AUTH_ERROR, data: res.data.error })
    }
    } catch (error) {
        console.log(error);
    } 
 }


 export const login = (user) => async (dispatch) => {  
    dispatch({type: USER_AUTH_REQUEST});
    try {
    const res = await axios.post("/login", user)
    if(res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", JSON.stringify(res.data.token))    
        dispatch({ type: USER_AUTH_SUCCESS,  data: {user: res.data.user, token: res.data.token} })
         console.log(res)
    } else {
        dispatch({ type: USER_AUTH_ERROR, data: res.data.error })
    }
    } catch (error) {
        console.log(error);
    } 
 }


 export const updateUser = (user, token) => async (dispatch) => {
    dispatch({type: USER_AUTH_REQUEST});
    try {
    dispatch({ type: USER_AUTH_SUCCESS, data: { user: JSON.parse(user), token: JSON.parse(token) }})
    } catch (error) {
        console.log(error);
    }
    
 }