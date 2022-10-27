import validateEmail from "../../Common/Validators/EmailValidator";
import validatePassword from "../../Common/Validators/PasswordValidator";
import validateUsername from "../../Common/Validators/UsernameValidator";

const signupController = (userData, setErrorArr) => {
    let progress = true;

    let valUsername = validateUsername(userData.username || null);
    if (valUsername !== null) {
        progress = false;
        setErrorArr[0]({
            error: true,
            message: valUsername
        });
    }

    if (!userData.email || !validateEmail(userData.email)) {
        progress = false;
        setErrorArr[1]({
            error: true,
            message: 'Invalid email'
        });
    }

    let valPassword = validatePassword(userData.password || null);
    if (valPassword !== null) {
        progress = false;
        setErrorArr[2]({
            error: true,
            message: valPassword
        });
    }

    if (!progress) return false;

    return true;

} 

export default signupController;