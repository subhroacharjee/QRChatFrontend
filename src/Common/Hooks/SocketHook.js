// import { io } from 'socket.io-client';
// import { useLocalStorage } from './LocalStorage';

// import { createContext, useContext, useMemo, useState } from 'react';
// const SocketContext = createContext();

// const BASE_SOCKET_URL =  `${process.env.REACT_APP_SOCKET_BASE_URL || 'ws://localhost:8080'}`;
// export const SocketProvider = ({ children }) => {
// 	const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');
// 	var socket = null;

// 	if (getAccessToken()) {

// 		try {
// 			socket = io(BASE_SOCKET_URL, {
// 				extraHeaders: {
// 					'Authorization': `Bearer ${getAccessToken()}`
// 				}
// 			})

// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}

// 	const eventEmiter = (event, data) => {
// 		if (socket && socket.connected) {
// 			data = typeof data === 'object' && data !== null ? data : {}; 
// 			socket.emit(event, {...data})
// 		}
// 	}

// 	const eventListener = (event, callback) => {
// 		if (socket && socket.connected) {
			
// 			let _callback = (data) => { console.log(data);}
// 			if (typeof callback === 'function') {
// 				_callback = callback;
// 			}
	
// 			socket.on(event, _callback);
// 		}
// 	}

// 	const value = useMemo(() => ({
// 		socket,
// 		eventEmiter,
// 		eventListener
// 	}), [socket])
	
// 	return <SocketContext.Provider value={value} >{children}</SocketContext.Provider>
	

// } 


// export const useSocket = () => {
// 	return useContext(SocketContext);
// }