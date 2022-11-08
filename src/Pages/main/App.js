import { useRoutes } from "react-router-dom";
import { useAuth } from "../../Common/Hooks/AuthProvider";
import { addMessage } from "../../StateManager/messages";
import { useDispatch, useSelector } from "react-redux";
import router from '../../Router';
import { useEffect } from "react";

import { useLocalStorage } from "../../Common/Hooks/LocalStorage";



const App = () => {
  const socket = useSelector(state => state.socket.value);
  const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');
  const { user,removeUserSession } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket !== null) {
      socket.emit('join');

      socket.on('joinError', (data) => {
        console.log(data);
        alert('Something went wrong!');
        removeUserSession();
      });

      socket.on('message', (data) => {
        console.log(data);
        if (data.sender !== user()._id)
        dispatch(addMessage(data))
    });
    }
    
}, [socket]);



 
  return useRoutes(router);
}
export default App;
