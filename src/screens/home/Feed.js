import React,{useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Paper } from '@material-ui/core';
import PostUpload from './UploadForm';



const Feed = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      marginBottom: 10,
      alignItems:"center"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();

  //const

  return (

<Paper style={{ display: "block", width: "100%", overflow: "auto", height: 700,   padding: 20, margin: 10, alignItems: "center",justifyContent:"center"}}>  
<Card className={classes.root}>
 <CardHeader
   avatar={
     <Avatar aria-label="recipe" className={classes.avatar}>
       R
     </Avatar>
   }
   action={
     <IconButton aria-label="settings">
       <MoreVertIcon />
     </IconButton>
   }
   title="Shrimp and Chorizo Paella"
   subheader="September 14, 2016"
 />
 <CardMedia
   className={classes.media}
   image="https://cdn.shopify.com/s/files/1/0255/3587/articles/the-weeknd-blinding-lights-banner_3231x.jpg?v=1575071010"
   title="The Weeknd"
 />
 <CardContent>
   <Typography variant="body2" color="textSecondary" component="p">
     This impressive paella is a perfect party dish and a fun meal to cook together with your
     guests. Add 1 cup of frozen peas along with the mussels, if you like.
   </Typography>
 </CardContent>
 <CardActions disableSpacing>
   <IconButton onClick={"()"} aria-label="add to favorites">
     <FavoriteIcon />
   </IconButton>
   <IconButton aria-label="share">
     <ShareIcon />
   </IconButton>    
 </CardActions>
</Card>
</Paper>
  )
}

export default Feed;


