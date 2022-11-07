import { Card, Container, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const MessageHeaderComponent = (props) => {
	return (
		<Card.Header className="w-100 d-flex justify-content-between align-item-start bg-primary">
			<Container className="d-flex">
				<Image src="http://picsum.photos/200/200" roundedCircle={true}  className='header-thumbnail'/>
				<div className="text-bold text-uppercase pt-2 mx-3 h5">{props.username}</div>
			</Container>
		</Card.Header>
	);
}

MessageHeaderComponent.propTypes = {
	username: PropTypes.string
}

export default MessageHeaderComponent