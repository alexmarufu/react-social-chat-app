import React,{useState} from 'react';
import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../actions/auth.action';


const Register = () => {

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [profilePhoto, setProfilePhoto] = useState("")
  const [password, setPassword] = useState("")

    const user ={
      name,
      email,
      profilePhoto,
      password,
    }

  const onSubmit = (e) => {
     e.preventDefault();
     dispatch(register(user))
  }

  if(auth.loggedIn) return <Redirect to="/"/>

   return (
   <Form onSubmit={onSubmit}>
     <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>profilePhoto</Form.Label>
      <Form.Control value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} type="text" placeholder="Enter photo url" />
     </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
     </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default Register;