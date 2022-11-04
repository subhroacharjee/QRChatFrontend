import { getListOfConnections, removeConnection } from "../../Server/ConnectionsRequests"

export const fetchConnectionList = (accessToken, setConnections) => {
	getListOfConnections(accessToken)
		.then(response => {
			if (response.err) {
				alert(response.err._global[0]);
			}

			setConnections(response.data);

		}).catch(err => {
			console.error(err);
			alert('Something went wrong!')
		});
};

export const deleteConnectionController = (connectionKey, accessToken) => {
	removeConnection(connectionKey, accessToken)
		.then(response => {
			if (response.err) {
				if (response.err.connectionKey) {
					alert(response.err.connectionKey[0]);
				} else {
					alert(response.err._global[0]);
				}
			}
			alert(response.data);
		}).catch(err => {
			console.error(err);
			alert('Something went wrong!');
		});
}