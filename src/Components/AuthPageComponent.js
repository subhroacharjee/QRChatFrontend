import { Container, Row, Col } from "react-bootstrap"

const AuthSiteComponent = (props) => {
    
   return ( <Container className="" fluid>
            <Row className="">
                {props.left && <Col xs="6" md="3" className="p-0 m-0">
                    <Container fluid className="full-height p-0">
                        {props.children}
                    </Container>
                </Col> }
                <Col xs="6" md="9" className="bg-secondary-1"></Col>
                {props.left || <Col xs="6" md="3" className="p-0 m-0">
                    <Container fluid className="full-height p-0">
                        {props.children}
                    </Container>
                </Col>}
            </Row>
        </Container>)
}

export default AuthSiteComponent;