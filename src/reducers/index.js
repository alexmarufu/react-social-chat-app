import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import messagesReducer from "./messages.reducer";
import postsReducer from "./posts.reducer";
import userReducer from "./user.reducer";


const allReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    posts: postsReducer,
    messages: messagesReducer
});

export default allReducer;