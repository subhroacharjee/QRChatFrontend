import axios from "axios";
import { ApiErrorDefaultObject, ErrorResponseDefaultObject } from "../Common/Constants/InitialStates";

const RequeutsBaseUri = `${process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api'}/connection`;


export const getListOfConnections = async(accessToken) => {
	try {
		const requestOption = {
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${accessToken}`
			}
		};

		const response = await axios.get(RequeutsBaseUri, requestOption);
		const res = response.data || ApiErrorDefaultObject;

		if (res.status === 'failed') {
			return {
				err: res.error,
				data: null
			}
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

export const removeConnection = async(connectionKey, accessToken) => {
	try {
		const requestOption = {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			data: {
				connectionKey
			}
		};

		const response = await axios.delete(RequeutsBaseUri, requestOption);

		const res = response.data || ApiErrorDefaultObject;

		if (res.status === 'failed') {
			return {
				err: res.error,
				data: null
			}
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