import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const BASE_SOCKET_URL =  `${process.env.REACT_APP_SOCKET_BASE_URL || 'http://localhost:8080'}`;
export const SocketSlice = createSlice({
	name: 'socket',
	initialState: {
		value: null
	},
	reducers: {
		initialize: (state, action) => {
			if (state.value && state.value.connected) {
				state.value.emit('join');
				return;
			};
			state.value = io(BASE_SOCKET_URL, {
				extraHeaders: {
					'Authorization': `Bearer ${action.payload}`
				}
			});
			state.value.emit('join');
		}
	}
});

export const { initialize } = SocketSlice.actions;

export default SocketSlice.reducer;