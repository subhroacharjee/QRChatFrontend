import validateEmail from "../../Common/Validators/EmailValidator";
import { emailLogin } from '../../Server/AuthRequests';


const LoginController = ({email, password, remember}, [setEmailError, setPasswordError], callback) => {
    
    var proceed = true;
    if (!validateEmail(email)) {
        setEmailError({
            error: true,
            message:"Please check the email"
        });
        proceed = false;
    }
    if (remember !== true) remember = false;

    if (!proceed) return false;

    emailLogin({
        email,
        password,
        remember
    }).then(data => {
        if (data.err !== null) {
            if (data.err._global) alert(data.err._global[0]);
            if (data.err.email) setEmailError({
                error: true,
                message: data.err.email[0]
            });

            if (data.err.password) setPasswordError({
                error: true,
                message: data.err.password
            });

            if (data.err.remember) alert('Please check the input again');

            return;
        }
        callback(data.data);
    }).catch(err => console.error(err));

    return true;
}

export default LoginController;