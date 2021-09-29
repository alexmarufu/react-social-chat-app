import React, { useState } from 'react';
import {AddCircleOutline, Home, Favorite, Message} from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton'

const Header = ({ Home1, addPost, likeHomeIcon, children, like, name, profilePhoto }) => {

    const [home, setHome] = useState(false);
  
   if(home) {
        return <Redirect to="/"/>
    }
        
        
   
    return (
        <>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: 80, width: "100%", backgroundColor: "#1877F2" ,color: "white"}}>
        <div style={{}}>
       <h2 style={{ fontFamily: "Tangerine, cursive", fontSize: 50, fontWeight: "bold" }}>Social App</h2>
        </div>
       
         <div style={{ display: "flex", alignItems: "center", backgroundColor: "#1877F2" , }}>
          {likeHomeIcon}
          {Home1 && <IconButton style={{ marginRight: 15, color: "#fff" }} onClick={() => setHome(true)}><Home/></IconButton>}         
          <IconButton style={{ marginRight: 15, color: "#fff"  }} onClick={like}><Favorite/></IconButton>                   
          {addPost && <IconButton style={{ marginRight: 15, color: "#fff"  }} onClick={() => setHome(true)}><AddCircleOutline/></IconButton>}          
          <IconButton style={{ marginRight: 15, color: "#fff"  }}><Message/></IconButton>         
        
         {name && profilePhoto && 
         <div style={{ alignItems: "center", display: "flex", marginLeft: 15, marginBottom: 0, marginTop: 0}} >       
          <div style={{ height: 40, marginLeft: 25, width: 2, backgroundColor: "#fff" }}></div>
           <img style={{ marginLeft: 25, width: 50, height: 50, borderRadius: "50%"}} src={profilePhoto}  alt="profile"/>
           <p style={{ marginLeft: 8, fontFamily: "sans-serif", fontWeight: "bold", color: "#ffff"}}>{name}</p>
          </div>}
          </div>
       </div>
       {children}
       </>
    )
}

export default Header;