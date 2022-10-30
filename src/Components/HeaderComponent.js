import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Common/Hooks/AuthProvider';

function HeaderComponent() {
	const navigate = useNavigate();
	const { removeUserSession } = useAuth();

	const logoutHandler = () => {
		removeUserSession();
	}

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>QR-chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
			<Nav.Link onClick={() => navigate('/requests')}>Requests</Nav.Link>
			<Nav.Link onClick={() => navigate('/search')}>Search</Nav.Link>
			<Nav.Link onClick={() => navigate('/connections')}>Connections</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate('/settings')}>
				Settings
            </Nav.Link>
            <Nav.Link onClick={logoutHandler}>
				Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;