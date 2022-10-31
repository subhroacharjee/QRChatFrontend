import {useState} from 'react';
import { Button, Card, Container, Form, ListGroup, Modal } from 'react-bootstrap';
import HeaderComponent from '../../Components/HeaderComponent';

const RequestPage = (props) => {
	const [requests, setRequests] = useState([{
		_id: 'someid',
		username: 'username',
		uniqueId: '#username'
	}]);
	const [show, setShow] = useState(false);
	const [requestId, setRequestId] = useState();
	const modalShow = () => setShow(true);
	const modalHide = () => setShow(false);

	const renderRequest = (req) => {
		return (<ListGroup.Item className='d-flex justify-content-between align-items-start' key={req._id}>
			<div className='ms-2 me-auto'>
				<div className='fw-bold'>{req.username}</div>
				id: {req.uniqueId}
			</div>
			<Button variant='success' className='mr-2' onClick={() => requestHandler(req._id, 'ACCEPT')}>Accept</Button>
			<Button variant='danger' className='ml-2' onClick={() => requestHandler(req._id, 'REJECT')}>Reject</Button>
		</ListGroup.Item>)
	}

	const requestHandler = (_id, handleType) => {
		setRequests(requests.filter((req) => req._id !== _id));
		// send the server the request to accept requests
	}

	const sendRequest = () => {
		alert('Sent!');
		// make server call
		modalHide();
	}

	const renderModal = (props) => {
		return (
			<Modal show={show} onHide={modalHide}>
				<Modal.Header closeButton>
					<Modal.Title>Send request</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Unique Id</Form.Label>
							<Form.Control onKeyUp={(event) => setShow(event.target.value)}/>
						</Form.Group>
						<Button variant='primary' onClick={sendRequest}>Send Request</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}

	return (<>
	<HeaderComponent/>
	<Container className='d-flex justify-content-center align-content-center'>
		<Card className='w-75 mt-1'>
			<Card.Header className='d-flex justify-content-between align-items-start'>Request List <Button variant='primary' onClick={modalShow}>Send Request</Button></Card.Header>
			<ListGroup variant='flush'>
				{
					requests.length > 0 ? requests.map(renderRequest) : <ListGroup.Item>No Requests</ListGroup.Item>
				}
			</ListGroup>
		</Card>
	</Container>
	{renderModal()}
	</>)

}

export default RequestPage;