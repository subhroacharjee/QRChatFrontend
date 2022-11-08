import axios from "axios";
import { ApiErrorDefaultObject, ErrorResponseDefaultObject } from "../Common/Constants/InitialStates";

const RequeutsBaseUri = `${process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api'}/message`;


export const getMessage = async(roomKey, skip, accessToken) => {
	const roomKeys = roomKey && typeof roomKey === 'string'? [roomKey] : [];

	const requestOption = {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	};
	skip = skip | 0;

	const queryString = '?roomKeys=' + encodeURIComponent(JSON.stringify(roomKeys));

	const uri = `${RequeutsBaseUri}${queryString}`;
	console.log(uri);

	try {
		const response = await axios.get(uri, requestOption);

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
};

export const getMessageList = async(accessToken) => {

	const requestOption = {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	};
	const uri = `${RequeutsBaseUri}/userList`;

	try {
		const response = await axios.get(uri, requestOption);

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