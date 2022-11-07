import { getMessageList } from "../../Server/MessageRequests"


export const GetUserListController = async(accessToken, setUserList) => {
	getMessageList(accessToken)
		.then(response => {
			if (response.err) {
				alert(response.err._global[0]);
			}
			console.log(response.data);
			setUserList(response.data);
		}).catch(err => {
			console.error(err);
			alert('Something went wrong!')
		});
}