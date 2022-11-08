import PrivateRouter from "../../Components/RouterComponents/PrivateRouter";
import DashBoard from '.';

const DashBoardRoute = {
    path: '/',
    element: <PrivateRouter>
                <DashBoard />
            </PrivateRouter>
};

export default DashBoardRoute;