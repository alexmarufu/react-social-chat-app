import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/user.action';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PostUpload() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(""); 
  const [posterImage, setPosterImage] = useState("");
  const [description, setDescription] = useState("");

  const post = {
    posterImage,
    title,
    description,
  }

  const onSubmit = () => {
    dispatch(addPost(post));
    setPosterImage("");
    setDescription("");
    setTitle("");
    return <Redirect to="/"/>
  }

  return (
    <Paper style={{ overflow: "auto", width: "100%", height: 720,  padding: 20, margin: 10, alignItems: "center",justifyContent:"center"}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Upload Post
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="Poster Url"
                name="Poster Url"
                variant="outlined"
                required
                fullWidth
                id="Poster Url"
                label="Poster Url"
                value={posterImage}
                onChange={(e) => setPosterImage(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Description"
                label="Description"
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="Description"
              />
            </Grid>
         
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Upload
          </Button>
         
        </form>
      </div>
      
    </Paper>
  );
}

export default PostUpload