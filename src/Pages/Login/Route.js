import LoginPage from ".";
import PublicRouter from "../../Components/RouterComponents/PublicRouter";

const LoginRoute = {
    path: '/login',
    element: <PublicRouter>
                <LoginPage/>
            </PublicRouter>
}

export default LoginRoute;