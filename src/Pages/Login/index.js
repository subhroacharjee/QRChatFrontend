import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import AuthPageComponent from '../../Components/AuthPageComponent';
import loginController from './Controller';
import { ErrorDefaultStructure } from "../../Common/Constants/InitialStates";

const LoginPage = (props) => {
    const navigate = useNavigate();
   
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [remember, setRemember] = useState(false);

    const [emailError, setEmailError] = useState(ErrorDefaultStructure);

    const [passwordError, setPasswordError] = useState(ErrorDefaultStructure);

    const login = () => {
        if (!loginController(email, password, remember, setEmailError, setPasswordError)) {
            setTimeout(() => {
                setEmailError(ErrorDefaultStructure);
                setPasswordError(ErrorDefaultStructure);
            }, 4000)
        }

    }

    const gotoSignUp = () => {
        navigate('/signup', {
            replace: true
        })
    }
    

    return (
        <AuthPageComponent message={['Don\'t have an account?', 'Sign Up']} gotoFunc={gotoSignUp}>
            
            <Form className="w-75">
                <h2 className="mb-4 text-center">Sign In</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onKeyUp={(event) => setEmail(event.target.value)} />
                    {emailError.error && (<Form.Text className="text-danger">{emailError.message}</Form.Text>) }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onKeyUp={(event) => setPassword(event.target.value)} />
                    {passwordError.error && (<Form.Text className="text-danger">{passwordError.message}</Form.Text>) }
                </Form.Group>

                <Container className="d-grid p-0 mb-3" fluid>
                    <Button variant="primary" size="lg" onClick={login}>
                        Login
                    </Button>
                </Container>
                <Container fluid className="d-flex justify-content-between p-0">
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Remember me" onChange={(event) => setRemember(event.target.value === 'on')} />
                    </Form.Group>
                    <div className="text-muted clickable-text">
                        Forget Password?
                    </div>
                </Container>
                <Container fluid className="d-flex justify-content-around p-0">
                    <Button variant="danger">
                        Sign In With Google
                    </Button>
                    <Button variant="secondary">
                        Sign In With Github
                    </Button>
                </Container>
            </Form>
        </AuthPageComponent>
    );
}

export default LoginPage;