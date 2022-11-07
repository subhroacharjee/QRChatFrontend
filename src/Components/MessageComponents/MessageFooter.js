import { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import PropTypes from 'prop-types';

const MessageFooterComponent = (props) => {
	const [message, setMessage] = useState('');
	
	const handleSendMessage = () => {
		const newMessage = message.trim();
		if (newMessage.length > 0) {
			props.newMessageHandler(newMessage);
			setMessage('');
		}

	}

	useEffect(() => {
		const keyDownHandler = event => {
		  if (event.key === 'Enter') {
			event.preventDefault();
	
			// 👇️ your logic here
			handleSendMessage();
		  }
		};
	
		document.addEventListener('keyup', keyDownHandler);
	
		return () => {
		  document.removeEventListener('keyup', keyDownHandler);
		};
	  }, []);
	
	return (
		<Card.Footer className="d-flex justify-content-between align-item-center">
			<Form className="w-80">
				<Form.Group>
					<Form.Control onChange={(event) => setMessage(event.target.value)}
					required
					type="text"
					placeholder=""
					value={message}
					/>
				</Form.Group>
			</Form>
			<Container fluid className="w-20 d-flex justify-content-center align-item-center">
				<Button onClick={handleSendMessage}>Send</Button>
			</Container>
		</Card.Footer>
	)
};

MessageFooterComponent.propTypes = {
	newMessageHandler: PropTypes.func
}

export default MessageFooterComponent;