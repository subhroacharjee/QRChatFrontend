import ConnectionPage from ".";
import PrivateRouter from "../../Components/RouterComponents/PrivateRouter";

const ConnectionPageRoute = {
	path: '/connections',
	element: <PrivateRouter>
		<ConnectionPage/>
	</PrivateRouter>
}

export default ConnectionPageRoute;