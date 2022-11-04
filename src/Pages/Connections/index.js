import { useEffect, useState } from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useLocalStorage } from "../../Common/Hooks/LocalStorage";
import HeaderComponent from "../../Components/HeaderComponent";
import { deleteConnectionController, fetchConnectionList } from "./Controller";

const ConnectionPage = (props) => {
	const [connections, setConnections] = useState([]);
	const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');

	useEffect(() => {
		fetchConnectionList(getAccessToken(), setConnections);
	},[]);



	const renderConnectionListItem = (connection) => {
		return (
			<ListGroup.Item className='d-flex justify-content-between align-items-start' key={connection._id}>
				<div className='ms-2 me-auto'>
					<div className='fw-bold'>{connection.username}</div>
					id: {connection.uniqueId}
				</div>
				<Button variant='danger' className='mr-2' onClick={() => removeConnectionHandler(connection._id, connection.connectionKey)}>Remove</Button>
		</ListGroup.Item>
		);
	}

	const removeConnectionHandler = (_id, connectionKey) => {
		if (window.confirm('Do you want remove connection? (all chats will be deleted)')) {
			setConnections(connections.filter(conn => conn._id !== _id));
			// call server;
			deleteConnectionController(connectionKey, getAccessToken());
		}
	}

	return (
		<>
		<HeaderComponent/>
		<Container className="d-flex justify-content-center align-item-center mt-2">
			<Card className="w-75">
				<Card.Header>Connections</Card.Header>
				<ListGroup>
					{
						connections.length > 0 ? connections.map(renderConnectionListItem) : <ListGroup.Item>No connections yet</ListGroup.Item>
					}
				</ListGroup>
			</Card>
		</Container>
		</>
	)
}

export default ConnectionPage;