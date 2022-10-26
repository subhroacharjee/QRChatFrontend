import { useState } from "react";
import { Button,  Container, Form} from "react-bootstrap";
import AuthPageComponent from '../../Components/AuthPageComponent';
import Login from './login';

const LoginPage = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [remember, setRemember] = useState(false);

    const [emailError, setEmailError] = useState({
        error: false,
        message: null
    });

    const [passwordError, setPasswordError] = useState({
        error: false,
        message: null
    });

    const login = () => {
        if (!Login(email, password, remember, setEmailError, setPasswordError)) {
            setTimeout(() => {
                var commonDefault = {
                    error: false,
                    message: null
                };
                setEmailError(commonDefault);
                setPasswordError(commonDefault);
            }, 4000)
        }

    }

    return (
        <AuthPageComponent>
            <>
            <Container fluid className="h-25 text-center d-flex justify-content-center clickable-text">
                        <p className="text-muted pt-2">Don't have an account?</p> <p className="text-dark pt-2">Sign Up</p>
            </Container>
            <Container fluid className="h-50 d-flex align-items-center justify-content-center">
                        <Form className="w-75">
                            <h2 className="mb-4 text-center">Sign In</h2>
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onKeyUp={(event) => setEmail(event.target.value)}/>
                                {emailError.error ? (<Form.Text className="text-danger">{emailError.message}</Form.Text>) : ''}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" onKeyUp={(event) => setPassword(event.target.value)}/>
                                {passwordError.error ? (<Form.Text className="text-danger">{passwordError.message}</Form.Text>) : ''}
                            </Form.Group>

                            <Container className="d-grid p-0 mb-3" fluid>
                                <Button variant="primary" size="lg" onClick={login}>
                                    Login
                                </Button>
                            </Container>
                           <Container fluid className="d-flex justify-content-between p-0">
                           <Form.Group className="mb-3">
                                <Form.Check type="checkbox" label="Remember me" onChange={(event) => setRemember(event.target.value === 'on')}/>
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
            </Container>
            </>
        </AuthPageComponent>
    );
}

export default  LoginPage;