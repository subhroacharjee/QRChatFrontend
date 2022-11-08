import { configureStore } from '@reduxjs/toolkit';
import MessageReducer from './messages';
import SocketReducer from './socket';
export default configureStore({
    reducer: {
        messages: MessageReducer,
        socket: SocketReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});