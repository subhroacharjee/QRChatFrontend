import { Button, Card, Container } from "react-bootstrap";
import { useAuth } from "../../Common/Hooks/AuthProvider";
import _ from "lodash";
import HeaderComponent from "../../Components/HeaderComponent";

const Profile = (props) => {
	const { user } = useAuth();
	const copyUserId = () => {
		const username = user().username;
		const id = '#' + username;

		navigator.clipboard.writeText(id);
		alert('Copied!');
	}
	return (
		<>
			<HeaderComponent />
			<Container fluid className="d-flex align-item-center justify-content-center w-75 h-100 p-2 ">
				<Card>
					<Card.Img variant="top" src="https://picsum.photos/700/300" />
					<Card.Body>
						<Card.Title className=""> Username: {_.capitalize(user().username)}</Card.Title>
						<Card.Title className="">Email: {user().email}</Card.Title>
						<div className="d-grid gap-2">
							<Button variant="primary" size="lg" onClick={copyUserId}>
								Copy profile id
							</Button>
							<Button variant="secondary" size="lg">
								Edit Profile
							</Button>
						</div>
					</Card.Body>

				</Card>
			</Container>
		</>
	)
}
export default Profile;