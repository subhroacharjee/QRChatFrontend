import { useRoutes } from "react-router-dom";
import LoginPage from "../Login";
import SignUp from "../SignUp";
import router from '../../Router';

const App = () => {

  return useRoutes(router);
}
export default App;
