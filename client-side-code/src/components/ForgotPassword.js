import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import {Container} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import { Navigation } from './navigation'

const  ForgotPassword = () => {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your email for further instructions');
        }catch(err){
            setError("Failed to Sign In");
        }

        setLoading(false);
    }

    return(
    <>  
        <Navigation />
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "300px"}}>
                <Card>
                    <Card.Body>
                        <h2 className = "text-center mb-4">Password Reset</h2>
                        {error && <Alert style = {{opacity : "100%"}} variant = "danger">{error}</Alert>}
                        {message && <Alert style = {{opacity : "100%"}} variant = "success">{message}</Alert>}
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group id = "email" className = "input-group">
                                <span class="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                    </svg>
                                </span>
                                <Form.Control type = "email" ref = { emailRef } required placeholder = "Email" /> 
                            </Form.Group>
                            
                            <Button className = "w-100 mt-2" disabled = {loading} type = "submit">Reset Password</Button>
                        </Form>
                        <div className = "w-100 text-center mt-3">
                            <Link to = "/login">Log In</Link>
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

export default ForgotPassword;