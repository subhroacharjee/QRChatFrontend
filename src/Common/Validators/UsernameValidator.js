const validateUsername = (username) => {
    if (typeof username !== 'string') return "Invalid username.";
    if (username.trim().length < 1) return "Invalid username size." 
    if (!/^[a-zA-Z0-9_ -]+$/.test(username.trim())) return "Username can contain only alphanumeric characters, space, underscore and hyphen";
    return null;
}

export default validateUsername;