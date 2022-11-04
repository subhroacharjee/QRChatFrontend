import axios from "axios";
import { ApiErrorDefaultObject, ErrorResponseDefaultObject } from "../Common/Constants/InitialStates";

const RequeutsBaseUri = `${process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api'}/request`;

export const getListOfRequests = async (access_token) => {
	try {
		const requestOption = {
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${access_token}`
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
};

export const sendRequest = async (uniqueId, access_token) => {
	try {
		const requestOption = {
			headers: {
				'Authorization': `Bearer ${access_token}`
			}
		};

		const response = await axios.post(RequeutsBaseUri, {
			uniqueId
		}, requestOption);

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

export const acceptRequest = async(requestId, access_token) => {
	try {
		const requestOption = {
			headers: {
				'Authorization': `Bearer ${access_token}`
			}
		};

		const response = await axios.post(`${RequeutsBaseUri}/accept`, {
			requestId
		}, requestOption);

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

export const denyRequest = async(requestId, access_token) => {
	try {
		const requestOption = {
			headers: {
				'Authorization': `Bearer ${access_token}`
			}
		};

		const response = await axios.post(`${RequeutsBaseUri}/deny`, {
			requestId
		}, requestOption);

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