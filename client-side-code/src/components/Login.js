import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import {Container} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import { Navigation } from './navigation'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import firebase from 'firebase/app';
import {auth} from '../firebase';
const  Login = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const {logIn} = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passRef.current.value);
            history.push('/videoCall');
        }catch(err){
            setError("Failed to Sign In");
        }

        setLoading(false);
    }

    return(
    <>  
        <Navigation />
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", fontSize: "1.5em"}}>
            <div className="w-100" style={{ maxWidth: "300px"}}>
                <Card>
                    <Card.Body>
                        <h2 className = "text-center mb-4">Log In</h2>
                        {error && <Alert style = {{opacity : "100%"}} variant = "danger">{error}</Alert>}
                        <Form style = {{fontSize : "15px" }} onSubmit = {handleSubmit}>
                            <Form.Group id = "email" className = "input-group">
                                <span className="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                    </svg>
                                </span>
                                <Form.Control style = {{fontSize : "15px" }} type = "email" ref = { emailRef } required placeholder = "Email" /> 
                            </Form.Group>
                            <Form.Group id = "password" className = "input-group">
                                <span class="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock-fill" viewBox="0 0 16 16">
                                        <path d="M7 6a1 1 0 0 1 2 0v1H7V6zM6 8.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3z"/>
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
                                    </svg>
                                </span>
                                <Form.Control style = {{fontSize : "15px" }} type = "password" ref = { passRef } required placeholder = "Password" /> 
                            </Form.Group>
                            <Button style = {{fontSize : "15px" }} className = "w-100 mt-2" disabled = {loading} type = "submit">Log In</Button>
                            <br />
                            <br />
                            <div style = {{display : "flex", justifyContent : "center", alignItems : "center"}}>
                                <span >OR</span>
                            </div>
                            
                        </Form>
                        <div style = {{display : "flex", justifyContent : "space-around"}}>
                                <Button style = {{fontSize : "15px" }} className = "w-25 mt-2" disabled = {loading} onClick = {() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}><GoogleOutlined /></Button>
                                <Button style = {{fontSize : "15px" }} className = "w-25 mt-2" disabled = {loading} onClick = {() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}><FacebookOutlined /></Button>
                            </div>
                        <div className = "w-100 text-center mt-3">
                            <Link to = "/forgotPassword">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Need an account? <Link to = "/signup">Sign up</Link>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Login;