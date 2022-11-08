import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useAuth } from '../Common/Hooks/AuthProvider';
import { useLocalStorage } from '../Common/Hooks/LocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import ScreenSaver from '../Resources/images/pexels-tim-mossholder-3091203.jpg';
import { getMessage } from '../Server/MessageRequests';
import MessageBodyComponent from './MessageComponents/MessageBody';
import MessageFooterComponent from './MessageComponents/MessageFooter';
import MessageHeaderComponent from './MessageComponents/MessageHeader';
import { addMessage, addMessages } from '../StateManager/messages';
import { initialize } from '../StateManager/socket';


const MessageComponent = (props) => {
	const StateMessages = useSelector(state => state.messages.messages)
	const Socket = useSelector(state => state.socket.value);
	const dispatch = useDispatch();


	const { user } = useAuth();
	const [isEmpty, setIsEmpty] = useState(true);
	const [skip, setSkip] = useState(0);
	const [Reciever, setReciever] = useState({});
	const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');
	useEffect(()=> {
		if (props.connectionKey) {
			setReciever(props.user);
			setIsEmpty(false);
			getMessages();


			dispatch(initialize(getAccessToken()));
		}


	}, [props.connectionKey]);


	useEffect(() => {
		if (Socket && Socket.connected)
		Socket.on('message', (data) => {
			console.log(data);
			if (data.sender !== user()._id)
			dispatch(addMessage(data));
		});
	}, [Socket]);
		
	const handleNewMessage = (msg) => {
		// TODO: send message
		const currentUser = user();
		const newMessage = {
			_id: new Date().getTime(),
			sender: currentUser._id,
			message: msg,
			connectionKey: props.connectionKey,
			created_at: new Date().toString()
		}
		if (Socket === null) {
			alert('Something is wrong!');
			return;
		}
		Socket.emit('message', {
			connectionKey: props.connectionKey,
			message: `${msg}`
		})
		dispatch(addMessage(newMessage));
		
		
	};

	const getMessages = () => {
		getMessage(props.connectionKey, skip, getAccessToken())
			.then(response => {
				if (response.err) {
					console.log(response.err);
					alert('Something went wrong!');
					return;
				}
				console.log(response.data)
				if (response.data[props.connectionKey]) {
					dispatch(addMessages(response.data));
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
			<MessageBodyComponent messages={(StateMessages[props.connectionKey] || [])} currentSkip={skip} />
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