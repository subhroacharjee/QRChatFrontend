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

export default validatePassword;