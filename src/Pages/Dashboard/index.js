import { useEffect, useState } from "react";
import { Button, Card, Container, Image, ListGroup, Dropdown } from "react-bootstrap";
import { useLocalStorage } from "../../Common/Hooks/LocalStorage";
import HeaderComponent from "../../Components/HeaderComponent";
import MessageComponent from "../../Components/MessageComponent";
import { fetchConnectionList } from "../Connections/Controller";
import { GetUserListController } from "./Controller";

// TODO: add socket io client and fetch messages and emit join event, with accessToken in header
// TODO: need to add eventListener such that whenever a new requests is connected this user will join that particular connectionRoom
// TODO: need to add eventListener for new messages.

const DashBoard = (props) => {
    const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');
    const [userList, setUserList] = useState([]);
    const [connectionKey, setConnectionKey] = useState(null);
    const [user, setUser] = useState(null);
    const [connectionList, setConnectionList] = useState([])

    useEffect(() => {
        
        GetUserListController(getAccessToken(), setUserList);
        fetchConnectionList(getAccessToken(), setConnectionList)
    }, []);

    const renderEmptyMessages = () => {
        return <ListGroup.Item>No messages found</ListGroup.Item>
    }

    const handleOpenChat = (userObj) => {
        setConnectionKey(userObj.connectionKey);
        setUser(userObj.user);
    }

   

    const renderUserList = (userObj) => {
        return <ListGroup.Item className="d-flex justify-content-between align-items-start" key={userObj.user._id}>
            <Container className="ms-2 me-auto w-50">
                <Image roundedCircle={true} src='http://picsum.photos/200/300' thumbnail={true} className='thumbnail-size'/>
                <p>{userObj.user.username}</p>
            </Container>
            <Button variant="success" onClick={() => handleOpenChat(userObj)}>Open chat</Button>
        </ListGroup.Item>
    }

    const renderListOfConnection = () => {
		return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                New Message
                </Dropdown.Toggle>
        
                <Dropdown.Menu>
                    {
                        connectionList.map(conn => {
                            return (
                                <Dropdown.Item onClick={() => {
                                    setConnectionKey(conn.connectionKey)
                                    setUser ({
                                        _id: conn._id,
                                        username: conn.username
                                    })
                                }} key={conn._id}>
                                    {conn.username}
                                </Dropdown.Item>
                            );
                        })
                    }
                </Dropdown.Menu>
          </Dropdown>
        )
	}

    return (
        <>
            <HeaderComponent/>
            <Container className="d-flex justify-content-center align-item-center mt-2">
                <Card className="w-25 height-75">
                    <Card.Header className="bg-primary h5">
                        <Container className="d-flex justify-content-between align-item-start">
                            <p>Messages</p>
                            {renderListOfConnection()}
                        </Container>
                    </Card.Header>
                    <ListGroup variant="">
                            {userList.length > 0? userList.map(renderUserList) : renderEmptyMessages()}
                    </ListGroup>
                </Card>
                <MessageComponent connectionKey={connectionKey} user={user} socket={props.socket}/>
            </Container>
            
        </>
    )
}
export default DashBoard;