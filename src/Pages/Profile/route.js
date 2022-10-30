import Profile from ".";
import PrivateRouter from "../../Components/RouterComponents/PrivateRouter";

const ProfileRoute = {
	path: '/profile',
	element: <PrivateRouter>
		<Profile />
	</PrivateRouter>
}

export default ProfileRoute;