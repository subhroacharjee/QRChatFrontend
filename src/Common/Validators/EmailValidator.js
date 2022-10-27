const validateEmail = (email) => {
    return /[a-zA-z0-9\-.]+@[a-z]+.[a-z]+/.test(email);
}

export default validateEmail;