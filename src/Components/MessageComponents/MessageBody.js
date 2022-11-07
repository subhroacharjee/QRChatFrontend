import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../Common/Hooks/AuthProvider';

const MessageBodyComponent = (props) => {
	const bottomRef = useRef();
	const { user } = useAuth();
	const [currentUser, setUser] = useState();

	useEffect(() => {
		setUser(user());
		bottomRef.current?.scrollIntoView(true);
	}, [props.messages])


	const renderMessage = (msg) => {
	
		const isMyMessage = currentUser._id === msg.sender._id;
		return (
			<>
			{isMyMessage&& <Col sm='4'></Col>}
			<Col className='mb-3' key={msg._id} sm='8'>
				<Container className={'d-flex justify-content-between ' + (isMyMessage ? 'flex-row-reverse' : 'align-content-start')} fluid>
				<div className={(isMyMessage ? 'bg-success' : 'bg-primary') + ' p-3 rounded d-flex flex-column message-box'}>
					<div className='user-font'>{isMyMessage ? 'You': null}</div>
					<div className='message-font'>
						{`${msg.message}`}
					</div>
					<div className='date-font'>
						{new Date(msg.created_at).toLocaleDateString()}
					</div>
				</div>
				</Container>
			</Col>
			{isMyMessage || <Col sm='4'></Col>}
			</>
		); 
	}

	return (
		<Card.Body className='message-body w-100'>
			<Row className='justify-md-center'>
				{props.messages.map(renderMessage)}
			</Row>
			<div ref={bottomRef}/>
		</Card.Body>
	);
}

MessageBodyComponent.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.object),
	currentSkip: PropTypes.number,
	reciever: PropTypes.object
};

export default MessageBodyComponent;