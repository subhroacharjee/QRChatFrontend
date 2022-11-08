import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

export const MessageSlice = createSlice({
	name: 'message',
	initialState: {
		messages: {

		}
	},
	reducers: {
		addMessage : (state, data) => {
			const messageData = data.payload;
			const connectionKey = messageData.connectionKey;
			if (!state.messages[connectionKey]) state.messages[connectionKey] = [];
			state.messages[connectionKey].push({
				_id: messageData._id,
				sender: {
					_id: messageData.sender
				},
				message: messageData.message,
				created_at: messageData.created_at
			});
			state.messages[connectionKey] = _.uniqBy(state.messages[connectionKey], (obj) => obj._id)
		},
		addMessages: (state, data) => {
			const messages = data.payload;
			state.messages ={
				...state.messages,
				...data.payload
			};
		}
	}
})

export const { addMessage, addMessages } = MessageSlice.actions;

export default MessageSlice.reducer;