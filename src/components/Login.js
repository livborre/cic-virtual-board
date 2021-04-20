import React, { useRef, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { useAuth } from "../context/Auth.js";
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Login.css'

const Login = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()

    async function handleLogin (event) {
        event.preventDefault();
        setError(error);

        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (error) {
            console.log(error)
            setError(error.message);
        } finally {
            setLoading(false)
        }

    }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="login__container">
        <Card className="login__card">
            <Card.Body>
                <h2> Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                        Log In
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="login__footer">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </Container>
  );
};

export default withRouter(Login);