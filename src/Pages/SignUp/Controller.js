import validateEmail from "../../Common/Validators/EmailValidator";
import validatePassword from "../../Common/Validators/PasswordValidator";
import validateUsername from "../../Common/Validators/UsernameValidator";
import { emailSignup } from "../../Server/AuthRequests";

const signupController = (userData, setErrorArr, callback) => {
    let proceed = true;

    let valUsername = validateUsername(userData.username || null);
    if (valUsername !== null) {
        proceed = false;
        setErrorArr[0]({
            error: true,
            message: valUsername
        });
    }

    if (!userData.email || !validateEmail(userData.email)) {
        proceed = false;
        setErrorArr[1]({
            error: true,
            message: 'Invalid email'
        });
    }

    let valPassword = validatePassword(userData.password || null);
    if (valPassword !== null) {
        proceed = false;
        setErrorArr[2]({
            error: true,
            message: valPassword
        });
    }

    if (!proceed) return false;

    emailSignup(userData)
        .then(res => {
            if (res.err !== null) {
                if (res.err._global) alert(res.err._global[0]);
                if (res.err.username) setErrorArr[0]({
                    error: true,
                    message: res.err.username[0]
                });

                if (res.err.email) setErrorArr[1]({
                    error: true,
                    message: res.err.email[0]
                });
    
                if (res.err.password) setErrorArr[2]({
                    error: true,
                    message: res.err.password
                });
    
                if (res.err.remember) alert('Please check the input again');
    
                return;
            }
            callback(res.data);
        }).catch(err => console.error(err));
    return true;

} 

export default signupController;