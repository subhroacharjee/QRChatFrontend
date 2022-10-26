const validateEmail = (email) => {
   return /[a-zA-z0-9\-.]+@[a-z]+.[a-z]+/.test(email);
}

const validatePassword = (_password) => {
    if (typeof _password !== 'string') return "Invalid password";
    var password = _password.trim();
    if (password.length < 8) return "Password length less than 8 characters";
    if (!password.match(/[a-z]/)) return "Needs atleast one smallcase character";
    if (!password.match(/[A-Z]/)) return "Needs atleast one uppercase character";
    if (!password.match(/[0-9]/)) return "Needs atleast one number";
    if (!password.match(/[.\\/\-#!@$^&*()+|'":;<>,?~]/)) return "Needs atleast one special character";
    return null;
}

const Login = (email, password, remember, setEmailError, setPasswordError) => {
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
}

export default Login;