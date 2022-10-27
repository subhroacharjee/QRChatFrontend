import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import AuthSiteComponent from "../../Components/AuthPageComponent";
import signupController from './Controller';
import { ErrorDefaultStructure } from '../../Common/Constants/InitialStates';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [usernameErr, setUsernameError] = useState(ErrorDefaultStructure);
    const [emailError, setEmailError] = useState(ErrorDefaultStructure);
    const [passwordError, setPasswordError] = useState(ErrorDefaultStructure);

    const signup = () => {
        if (!signupController({
            username,
            email,
            password
        }, [
            setUsernameError,
            setEmailError,
            setPasswordError
        ])) {
            setTimeout(() => {
                setUsernameError(ErrorDefaultStructure);
                setEmailError(ErrorDefaultStructure);
                setPasswordError(ErrorDefaultStructure);
            }, 4000)
        }
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
                
                <Container fluid className="d-flex justify-content-around p-0">
                    <Button variant="danger">
                        Sign Up With Google
                    </Button>
                    <Button variant="secondary">
                        Sign Up With Github
                    </Button>
                </Container>
            </Form>
        </AuthSiteComponent>
    );
}

export default SignUp;