/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Server/AuthRequests";
import { useLocalStorage } from "./LocalStorage";
import { useDispatch } from "react-redux";
import { initialize } from "../../StateManager/socket";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // what do i want this hook to do?
    // just check if the user is validated?
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getUser, setUser] = useLocalStorage('user', null);
    const [getAccessToken, setAccessToken] = useLocalStorage('accessToken', null);
    const checkUserSession = async() => {
        const accessToken = getAccessToken();
        if (accessToken === null) return false;
        // this will shoot an api to check if the access token is valid or not
        // if access token is valid api will send user and we will store user in localstorage
        var data = await getCurrentUser(accessToken);
        if (data.err !== null || !data.data || !data.data._id) {
            setUser(null);
            setAccessToken(null);
            return false;
        }
       
        setUser(data.data);
        return true;
    }

    const addUserSession = (data, access_token) => {
        setAccessToken(access_token);
        setUser(data);
        dispatch(initialize(access_token));
    }

    const removeUserSession = () => {
        setUser(null);
        setAccessToken(null);
        navigate('/login', {
            replace: true
        });
    }

    const value = useMemo(() => ({
        user: getUser,
        checkUserSession,
        addUserSession,
        removeUserSession
    }), []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

};

export const useAuth = () => {
  return useContext(AuthContext);
};