import { acceptRequest, denyRequest, getListOfRequests, sendRequest } from "../../Server/RequestRequests";

export const handleRequest = (_id, handleType, accessToken) =>{
	let promise;
	if (handleType === 'ACCEPT') {
		promise = acceptRequest(_id, accessToken);
	} else if (handleType === 'REJECT') {
		promise = denyRequest(_id, accessToken);
	} else {
		console.log('Handle type needs to be changed');
		return;
	}

	promise.then(response => {
		if (response.err) {
			if (response.err.requestId) {
				alert(response.err.requestId[0] + " of requestId");
			} else {
				alert(response.err._global[0]);
			}
		}
		else {
			alert(response.data.message) 
		}
	}).catch(err => {
		console.error(err);
		alert('Something went wrong!')
	});
}

export const fetchRequestList = (accessToken, setRequests) => {
	getListOfRequests(accessToken).then(
		response => {
			if (response.err) {
				alert(response.err._global[0]);
			} else {
				setRequests(response.data);
			}
		}
	).catch(err => {
		console.error(err);
		alert('Something went wrong!');
	});
}

export const sendRequestController = (uniqueId, accessToken) => {
	sendRequest(uniqueId, accessToken).then(response => {
		if (response.err) {
			if (response.err.uniqueId) {
				alert(response.err.uniqueId[0] + " of uniqueId");
			} else {
				alert(response.err._global[0]);
			}
		} else {
			alert('Request sent successfully!');
		}
	}).catch(err => {
		console.error(err);
		alert('Something went wrong!');
	 })
}