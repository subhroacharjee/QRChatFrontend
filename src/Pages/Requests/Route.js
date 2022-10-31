import PrivateRouter from "../../Components/RouterComponents/PrivateRouter";
import Request from './index';

const RequestsRouter = {
	'path': '/requests',
	element: <PrivateRouter>
		<Request/>
	</PrivateRouter>
}

export default RequestsRouter;