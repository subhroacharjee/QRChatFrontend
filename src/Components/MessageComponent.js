import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useAuth } from '../Common/Hooks/AuthProvider';
import { useLocalStorage } from '../Common/Hooks/LocalStorage';

import ScreenSaver from '../Resources/images/pexels-tim-mossholder-3091203.jpg';
import { getMessage } from '../Server/MessageRequests';
import MessageBodyComponent from './MessageComponents/MessageBody';
import MessageFooterComponent from './MessageComponents/MessageFooter';
import MessageHeaderComponent from './MessageComponents/MessageHeader';

const MessageComponent = (props) => {
	const { user } = useAuth();
	const [isEmpty, setIsEmpty] = useState(true);
	const [messages, setMessages] = useState([]);
	const [skip, setSkip] = useState(0);
	const [Reciever, setReciever] = useState({});
	const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');
	useEffect(()=> {
		if (props.connectionKey) {
			setReciever(props.user);
			setIsEmpty(false);
			getMessages();
		}
	}, [props.connectionKey]);

	const handleNewMessage = (msg) => {
		// TODO: send message
		const currentUser = user();
		const newMessage = {
			_id: new Date().getTime(),
			sender: currentUser,
			message: msg,
			created_at: new Date()
		}

		setMessages([...messages, newMessage])
	};

	const getMessages = () => {
		getMessage(props.connectionKey, skip, getAccessToken())
			.then(response => {
				if (response.err) {
					console.log(response.err);
					alert('Something went wrong!');
					return;
				}
				if (response.data[props.connectionKey]) {
					setMessages(response.data[props.connectionKey]);
				}
			}).catch(err=> {
				console.error(err);
				alert('Something went wrong!');
			})
	}


	const renderEmptyScreen = () => <Image src={ScreenSaver} className="w-100 h-100" loading='lazy'/>

	const renderMessageScreen = () => {
		return <>
			<MessageHeaderComponent username={Reciever.username}/>
			<MessageBodyComponent messages={messages} currentSkip={skip} />
			<MessageFooterComponent newMessageHandler={handleNewMessage}/>
		</>
	}

	return (
		<Card className="w-75 height-75">
            {isEmpty ? renderEmptyScreen() : renderMessageScreen()}
        </Card>
	);
}

MessageComponent.propTypes = {
	connectionKey: PropTypes.string,
	user: PropTypes.object
}

export default MessageComponent;