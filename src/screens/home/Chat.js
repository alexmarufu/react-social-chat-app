import React, { useState, useEffect, useRef } from 'react';
import Fab from '@material-ui/core/Fab';
import { Send, VideocamOff, Videocam, PhoneEnabled, Email, CallEnd, MicOff } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, getFriendInfo, getFriends, getMessages } from '../../actions/user.action';
import { format } from 'timeago.js';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import store from '../../store';
import { io } from "socket.io-client";
import "./index.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Peer from 'simple-peer';

const Chat = (props) => {

    const socket = useRef();
    const [open, setOpen] = useState(false);
    const [callStream, setCallStream] = useState(true);
    const [stream, setStream] = useState(null);
    const [answerCall, setAnswerCall] = useState(null);
    const [callButton, setCallButton] = useState(false)
    const myVideo = useRef();
    const friendVideo = useRef();
    const messageAutoScroll = useRef(null);

     const dispatch = useDispatch();
   
    useEffect(() => {
      socket.current = io("ws://localhost:4001");
      socket.current.emit("users",  auth.user.userId)

      socket.current.on("users", users => {
        console.log(users);
        //alert("user")
      }) 

      socket.current.on("ReceiveMessage", (msg) => {
         //msg.fromUserId === auth.user.userId && msg.toUserId === props.match.params.userId && dispatch(getMessages(props.match.params.userId))
         console.log(msg);
         dispatch(getMessages(props.match.params.userId))
       })

       socket.current.on('callFriendRequest', (signal) => {
        setCallStream(signal);
        setCallButton(true)
      });
     }, [])
     
      
    

    


    useEffect(() => {     
      dispatch(getMessages(props.match.params.userId))
      dispatch(getFriendInfo(props.match.params.userId))
      //dispatch(getFriends())
      //scrollToBottom()     
      }, []) 

     
       

    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const messages = useSelector(state => state.messages);

    const [message, setMessage] = useState("");
   
    
    useEffect(() => {
      
      if (messageAutoScroll) {
        messageAutoScroll.current.addEventListener('DOMNodeInserted', event => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: 'instant', });
        });
      }
      //messageAutoScroll.current.scrollIntoView({ behavior: "smooth" instant })
    
      
    }, [])

     console.log(props)

   useEffect(() => {
      dispatch(getMessages(props.match.params.userId))
      dispatch(getFriendInfo(props.match.params.userId))
      //dispatch(getFriends())
      }, [props.match.url]) 

     
  //const renderMessages = dispatch(getMessages(props.match.params.userId))
  
  if(!auth.loggedIn) return <Redirect to="/login"/>
  
  //window.location.hre
 
  if(user.error) return <p>error</p>
 
 
    const sendMessage = {   
       fromUserId: auth.user.userId,
       toUserId: props.match.params.userId,
       message: message,
       time:  Date.now()
    }

    
  const onSubmit = (e) => {
      e.preventDefault()
      if(message === "") return alert("please type something");
      socket.current.emit('sendMessage', sendMessage);
      dispatch(addMessage(sendMessage));       
      //dispatch(getMessages(props.match.params.userId))
      store.getState().messages.messages = [...messages.messages, sendMessage]
      setMessage("")
      console.log(messages.messages)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    height: "80%",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  if(open) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((myStream) => {
      setStream(myStream);
      myVideo.current.srcObject = myStream;
    }).catch(error => console.log(error));
    //call user
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.current.emit('callFriend', { to: props.match.params.userId, signal: data, from: auth.user.userId, });
    });
    peer.on('stream', (currentStream) => {
      friendVideo.current.srcObject = currentStream;
    });
    socket.current.on('callAccepted', (signal) => {
      setAnswerCall(true);
      peer.signal(signal);
    });
  }


  const answerFriendCall =() => {
    setOpen(true)
    setAnswerCall(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.current.emit('answerCall', data);
    });
    peer.on('stream', (friendStream) => {
      friendVideo.current.srcObject = friendStream;
    });  
    peer.signal(callStream);
    setCallButton(false)
  }



 
   return (
     <Header addPost  Home1 name={auth.user.name} profilePhoto={auth.user.profilePhoto}> 
       {callButton && <Button onClick={answerFriendCall} variant="outlined">answer call</Button>}
       <div style={{ backgroundColor: "#eeeeee" , display: "flex", justifyContent: "space-around", margin: 30 }}>
        <Paper style={{  width: 500, overflow: "auto", height: "auto",  margin: 10, padding: 10, display: "block",}}>
          <h3 style={{marginLeft: 10}}>Chats</h3>
          <hr/>
          <br/> 
       {user.friends.map((friend, index) => (
        <Link key={index} style={{ textDecoration: "none" }} to={`/chat/${friend.userId}`}>
          <div key={index}  style={{ alignItems: "center", display: "flex", marginBottom: 10}} >       
           <img style={{marginLeft: 10, width: 50, height: 50, borderRadius: "50%"}} src={friend.profilePhoto}  alt="profile"/>
           <p style={{marginLeft: 8, fontFamily: "sans-serif", fontWeight: "bold", color: "#373737"}}>{friend.name}</p>
          </div>
       </Link>
       ))}
       </Paper>  
        <Paper style={{  width: "100%", height: "auto", padding: 20, margin: 10, display: "block",}}>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between"}} >      
          <div style={{ alignItems: "center", display: "flex"}}> 
           <img style={{marginLeft: 10, width: 50, height: 50, borderRadius: "50%"}} src={user.userInfo.profilePhoto ? user.userInfo.profilePhoto : null}  alt="profile"/>
           <p style={{marginLeft: 8, fontFamily: "sans-serif", fontWeight: "bold", color: "#373737"}}>{user.userInfo.name ? user.userInfo.name : null}</p>
         </div>

         <div style={{ alignItems: "center", display: "flex"}}> 
           <a href={`mailto:${user.userInfo.email}`}><IconButton  style={{ marginRight: 1, color: "#373737",}}><Email className="border"/></IconButton></a>
           <a href="tel:000000000"><IconButton  style={{ marginRight: 1, color: "#373737",}}><PhoneEnabled className="border"/></IconButton></a>
           <IconButton onClick={handleOpen} style={{ marginRight: 30, color: "#373737", display: "block" }}><Videocam className="border"/></IconButton>
         </div>
          </div>
       
        <br/>
        <hr/>
        <br/>
        <div ref={messageAutoScroll} style={{  width: "100%", height: 500, overflow: "auto", }}>
         {messages.messages.length <= 0 ? <h2>no messages send</h2> : messages.error ? <h2>loading</h2> : messages.messages.length >= 1 ? (messages.messages.map((message) => (
          <>
         <div style={message.fromUserId === props.match.params.userId ? {textAlign: "start", margin: 0, borderRadius: 40,  paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 5, } : { textAlign: "end", margin: 0, borderRadius: 40,  paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 5, }}>
          <p style={{marginTop: 10, margin: 2,   padding: 10, }}>
            <span className={message.fromUserId === props.match.params.userId ? "friend" : message.fromUserId === auth.user.userId ?  "me" : null} style={{margin: 0, borderRadius: 40,  paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 5, }}>
              {message.fromUserId === props.match.params.userId ? message.message : message.fromUserId === auth.user.userId ? message.message : null}
            </span>
          </p>
        <span style={{marginRight: 20,fontSize: 13, marginLeft: 20 }}>{format(message.fromUserId === props.match.params.userId ? message.time : message.fromUserId === auth.user.userId ? message.time : null)}</span>
          </div>
          </>))) : null}
        </div>
          <form className="form" style={{  bottom: 20,  }} onSubmit={onSubmit}>
             <Grid container style={{padding: '20px', }}>
                    <Grid item xs={11}>
                        <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab style={{ backgroundColor: "#1877F2" }} color="" aria-label="add"><button style={{ background: "none", color: "white", margin: 0, border: "none" }} type= "submit"><Send /></button></Fab>
                    </Grid>
                </Grid>
          </form>
          </Paper>
         </div>


         <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
         >
          <Paper variant="outlined" square style={style}>
           
             {stream ? <video style={{ width: "100%", height: "100%" }} playsInline muted ref={friendVideo}  autoPlay/> :  <Typography id="modal-modal-title" variant="h6" component="h2">
              waiting for friend to connect
            </Typography>}

            <Paper style={{ backgroundColor: "#353343", width: 300, height: 200, bottom: 0, position: "absolute", right: 0 }} variant="outlined" square>
            {answerCall  && <video playsInline muted ref={myVideo} autoPlay/>}
            </Paper>
            <hr/>
            <div className="parent-border" style={{ alignItems: "center", display: "flex", borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#ffff",  bottom: 0, position: "absolute", display: "flex", left: "10%" }}> 
                <IconButton style={{ marginRight: 30, color: "#373737", display: "block" }}><MicOff className="border"/></IconButton>
                <IconButton style={{ marginRight: 30, color: "#373737", display: "block" }}><VideocamOff className="border"/></IconButton>          
                <IconButton style={{ marginRight: 30, color: "#fff", display: "block" }}><CallEnd style={{ backgroundColor: "red",}} className="border"/></IconButton>         
             
            </div>
           
          </Paper>
        </Modal>
       </div>

       </Header>
    )
 }

export default Chat;