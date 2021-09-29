import React,{ useState } from 'react';
import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { login } from '../../actions/auth.action';

const Login = () => {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({email, password})) 
 }

 if(auth.loggedIn) return <Redirect to="/"/>

    return (
       <Form onSubmit={onSubmit}>
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

export default Login;