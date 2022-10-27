import validateEmail from "../../Common/Validators/EmailValidator";
import validatePassword from "../../Common/Validators/PasswordValidator";


const LoginController = (email, password, remember, setEmailError, setPasswordError) => {
    
    var proced = true;
    if (!validateEmail(email)) {
        setEmailError({
            error: true,
            message:"Please check the email"
        });
        proced = false;
    }
    var valPass= validatePassword(password);
    if (valPass !== null) {
        proced = true;
        setPasswordError({
            error: true,
            message: valPass
        });
    }

    if (remember !== true) remember = false;

    if (!proced) return false;

    return true;
}

export default LoginController;