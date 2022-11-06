import { useEffect, useState } from "react";
import { Button, Card, Container, Image, ListGroup } from "react-bootstrap";
import { useLocalStorage } from "../../Common/Hooks/LocalStorage";
import HeaderComponent from "../../Components/HeaderComponent";
import { GetUserListController } from "./Controller";

// TODO: add socket io client and fetch messages and emit join event, with accessToken in header
// TODO: need to add eventListener such that whenever a new requests is connected this user will join that particular connectionRoom
// TODO: need to add eventListener for new messages.

const DashBoard = () => {
    const [getAccessToken, setAccessToken] = useLocalStorage('accessToken');
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        GetUserListController(getAccessToken(), setUserList);
    }, []);

    const renderEmptyMessages = () => {
        return <ListGroup.Item>No messages found</ListGroup.Item>
    }

    const handleOpenChat = () => {

    }

    const renderUserList = (userObj) => {
        return <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <Container className="ms-2 me-auto w-50">
                <Image roundedCircle={true} src='http://picsum.photos/200/300' thumbnail={true} className='thumbnail-size'/>
                <p>{userObj.username}</p>
            </Container>
            <Button variant="primary" onClick={handleOpenChat}>Open chat</Button>
        </ListGroup.Item>
    }

    return (
        <>
            <HeaderComponent/>
            <Container className="d-flex justify-content-center align-item-center mt-2">
                <Card className="w-25 height-75">
                    <Card.Header>Messages</Card.Header>
                    <ListGroup variant="">
                            {userList.length > 0? userList.map(renderUserList) : renderEmptyMessages()}
                    </ListGroup>
                </Card>
                {
                    // a whole component to render messages and fetch messages
                }
                <Card className="w-75 height-75">
                    <Card.Header>Message</Card.Header>
                    <Card.Body> message Body</Card.Body>
                    <Card.Footer> Text area</Card.Footer>
                </Card>
            </Container>
            
        </>
    )
}
export default DashBoard;