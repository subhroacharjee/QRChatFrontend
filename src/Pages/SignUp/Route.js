import SignUp from ".";
import PublicRouter from "../../Components/RouterComponents/PublicRouter";

const SignUpRoute = {
    path: '/signup',
    element: <PublicRouter>
                <SignUp/>
            </PublicRouter>
}
export default SignUpRoute;