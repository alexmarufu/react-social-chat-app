import React,{useState, useEffect} from 'react';
import { Paper } from '@material-ui/core';
import { useSelector, useDispatch} from 'react-redux';
import Feed from './Feed';
import { Link } from 'react-router-dom';
import Header from "../../components/Header";
import PostUpload from "../home/UploadForm"
import { getAllPosts, getFriends, addMessage, getMessages } from '../../actions/user.action';
import { Redirect } from 'react-router-dom';
import { MultilineChart, Groups } from '@material-ui/icons';
import { updateUser } from '../../actions/auth.action';
import { format } from 'timeago.js';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {AddCircleOutline, Favorite} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import GroupsIcon from '@mui/icons-material/GroupWork';;
//import Chat from './Chat';
const Home = (props) => {

  const dispatch = useDispatch();

 useEffect(() => {
   dispatch(getFriends())
  }, [])

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [upload, setUpload] = useState(false)
  const [message, setMessage] = useState("");
  const [data, setData] = useState();

    console.log(user)
  
  if(!auth.loggedIn){
    return <Redirect to="/login"/>
  }
  
 
    return (
      <Header likeHomeIcon={upload ? <IconButton style={{ marginRight: 15, color: "#fff"  }} onClick={() => setUpload(false)}><HomeIcon/></IconButton> : <IconButton style={{ marginRight: 15, color: "#fff"  }} onClick={() => setUpload(true)}><AddCircleOutline/></IconButton>} name={auth.user.name} profilePhoto={auth.user.profilePhoto}>
      <div style={{ backgroundColor: "#eeeeee" , height: "100%", display: "block",}}>  
      <div style={{ backgroundColor: "#eeeeee" , display: "flex", justifyContent: "space-around", margin: 30 }}>
        <Paper style={{  width: 800, overflow: "auto", height: 720,  margin: 10, padding: 10}}>
          <h3 style={{marginLeft: 10}}>Chats</h3> 
          <hr/>
          <br/>
       {user.friends.map((friend, index) => (
        <Link key={index} style={{ textDecoration: "none" }} to={`/chat/${friend.userId}`}>
          <div key={index} onClick={""} style={{ alignItems: "center", display: "flex", marginBottom: 10}} >       
           <img style={{marginLeft: 10, width: 50, height: 50, borderRadius: "50%"}} src={friend.profilePhoto}  alt="profile"/>
           <p style={{marginLeft: 7, fontFamily: "sans-serif", fontWeight: "bold", color: "#373737"}}>{friend.name}</p>
          </div>
       </Link>
       ))}
       </Paper>      
       {upload ?  <PostUpload/> :  <Feed/>}

        <Paper style={{  width: 800, overflow: "auto", height: 720,   padding: 10, margin: 10, alignItems: "center", justifyContent: "center"}}>
        <Card style={{alignItems: "center", justifyContent: "center"}} sx={{ maxWidth: 345 }}>
        <div style={{ alignItems: "center", display: "flex", }}> 
                 <IconButton style={{ marginRight: 0, color: "#fff",  }}><MultilineChart style={{ backgroundColor: "#1877F2",}} className="border"/></IconButton>         
                 <Typography gutterBottom variant="h6" component="div">
      Groups  </Typography>
                 <Typography style={{ marginLeft: 35, }} variant="body2" color="text.secondary">
                   ·Suggested for you
                 </Typography>
            </div>
      <CardMedia
        component="img"
        height="140"
        image="https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2021/01/931/524/243c7ae2-The-Weeknd-1.jpg?ve=1&tl=1"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" disableElevation>
         Join Group
      </Button>
      </CardActions>
    </Card>
         </Paper>
      </div>    
      </div>
      </Header>
    );
  }


  export default Home;

