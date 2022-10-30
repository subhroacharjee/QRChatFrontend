import { useEffect, useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import AuthSiteComponent from "../../Components/AuthPageComponent";
import signupController from './Controller';
import { ErrorDefaultObject } from '../../Common/Constants/InitialStates';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Common/Hooks/AuthProvider';

const SignUp = (props) => {
    const navigate = useNavigate();
    const { addUserSession } = useAuth();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [usernameErr, setUsernameError] = useState(ErrorDefaultObject);
    const [emailError, setEmailError] = useState(ErrorDefaultObject);
    const [passwordError, setPasswordError] = useState(ErrorDefaultObject);

    useEffect(() => {
        setTimeout(() => {
            setUsernameError(ErrorDefaultObject);
            setEmailError(ErrorDefaultObject);
            setPasswordError(ErrorDefaultObject);
        }, 8000)
    }, [usernameErr, emailError, passwordError]);

    const signUpCallback = (data) => {
        const accessToken = data.access_token;
        const userData = data;
        delete userData.access_token;
        addUserSession(userData, accessToken);
        navigate('/profile', { // TODO to change to profile than /
            replace: true
        });
    }

    const signup = () => {
        signupController({
            username,
            email,
            password
        }, [
            setUsernameError,
            setEmailError,
            setPasswordError
        ], signUpCallback);
    }

    const gotoLogin = () => {
        navigate('/login', {
            replace: true
        });
    }
    return (
        <AuthSiteComponent left={true} message={['Already have an account?', 'Login']} gotoFunc={gotoLogin}>
            <Form className="w-75">
                <h2 className="mb-4 text-center">Sign Up</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onKeyUp={(event) => setUsername(event.target.value)} />
                    {
                        usernameErr.error && <Form.Text className='text-danger'> {usernameErr.message}</Form.Text>
                    }
                    
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  onKeyUp={(event) => setEmail(event.target.value)}/>
                    {
                        emailError.error && <Form.Text className='text-danger'> {emailError.message}</Form.Text>
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onKeyUp={(event) => setPassword(event.target.value)}  />
                    {
                        passwordError.error && <Form.Text className='text-danger'> {passwordError.message}</Form.Text>
                    }
                </Form.Group>

                <Container className="d-grid p-0 mb-3" fluid>
                    <Button variant="primary" size="lg" onClick={signup}>
                        Sign Up
                    </Button>
                </Container>
            </Form>
        </AuthSiteComponent>
    );
}

export default SignUp;