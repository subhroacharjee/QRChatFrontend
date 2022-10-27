import { useAuth } from "../../Common/Hooks/AuthProvider";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../LoaderComponent";

const PublicRouter = ({children}) => {
    const [progress, setProgress] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const { checkUserSession } = useAuth();

    useEffect(() => {
        setProgress(true);
        const checkUser = async () => {
            let session = false;
            try {
                session = await checkUserSession();
                console.log(session);
            } catch (error) {
                console.error(error);
            }

            setIsAuth(session);
            setProgress(false);
        } 
        checkUser();
      return () => {};
    }, [])

    if (progress) {
        return <Loader/>
    } else {
        if (!isAuth) return children;
        else return <Navigate to={'/'} replace={true}/>
    }
    
}
export default PublicRouter;