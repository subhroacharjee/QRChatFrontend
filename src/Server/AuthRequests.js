import axios from "axios";
import { ApiErrorDefaultObject, ErrorResponseDefaultObject } from "../Common/Constants/InitialStates";

const AuthBaseUrl = `${process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api'}/auth`;

export const getCurrentUser = async (access_token) => {
	try {
		var requestObject = {
			headers: {
				"Authorization": `Bearer ${access_token}`
			}
		};
	
		var response = await axios.get(`${AuthBaseUrl}/user`, requestObject);
		const res = response.data  || ApiErrorDefaultObject;

		if (res.status === 'failed') {
			return {
				err: res.error ,
				data: null
			};
		}
		return {
			err: null,
			data: res.data
		};
	} catch (error) {
		console.error(error);
		if (error.response && error.response.data && error.response.data.error) {
			return {
				err: error.response.data.error,
				data: null
			};
		}
		return ErrorResponseDefaultObject;
		
	}
};

export const emailLogin = async (data) => {
	try {
		var response = await axios.post(`${AuthBaseUrl}/login`, data);
		const res = response.data  || ApiErrorDefaultObject;
		if (res.status === 'failed') {
			return {
				err: res.error ,
				data: null
			};
		}
		return {
			err: null,
			data: res.data
		};

	} catch (error) {
		if (error.response && error.response.data && error.response.data.error) {
			return {
				err: error.response.data.error,
				data: null
			};
		}
		return ErrorResponseDefaultObject;
	}
};

export const emailSignup = async (data) => {
	try {
		var response = await axios.post(`${AuthBaseUrl}/signup`, data);
		const res = response.data;
		if (res.status === 'failed') {
			return {
				err: res.error,
				data: null
			};
		}
		return {
			err: null,
			data: res.data
		};

	} catch (error) {
		console.error(error);
		if (error.response && error.response.data && error.response.data.error) {
			return {
				err: error.response.data.error,
				data: null
			};
		}
		return ErrorResponseDefaultObject;
	}
}


