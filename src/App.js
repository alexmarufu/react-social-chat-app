import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { updateUser } from "./actions/auth.action";
import { getAllPosts, getFriends } from "./actions/user.action";
import Login from "./screens/authScreens/login";
import Register from "./screens/authScreens/register";
import Home from "./screens/home/Home";
import Chat from "./screens/home/Chat";

function App(props) {

  const dispatch = useDispatch()

  const loggedInUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if(loggedInUser || token) {
    dispatch(updateUser(loggedInUser, token))
    dispatch(getAllPosts())
    dispatch(getFriends())
  }
  
  return (
     <Router >
       <Switch>
           <Route path="/" exact component={Home}/> 
           <Route path="/chat/:userId" component={Chat}/>   
           <Route path="/login" component={Login}/> 
           <Route path="/register" component={Register}/> 
        </Switch>
     </Router>
    
  );
}

export default App;
