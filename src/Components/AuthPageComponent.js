import { Container, Row, Col } from "react-bootstrap"
import PropTypes from 'prop-types';

const AuthSiteComponent = (props) => {
    const handleClick = () => {
        props.gotoFunc();
    }
   return ( <Container className="" fluid>
            <Row className="">
                {props.left && <Col xs="10" md="6" className="p-0 m-0">
                    <Container fluid className="full-height p-0">
                    <Container fluid className="h-25 text-center d-flex justify-content-center clickable-text" onClick={handleClick}>
                        <p className="text-muted pt-2">{props.message[0]}</p> <p className="text-dark pt-2">{props.message[1]}</p>
            </Container>
            <Container fluid className="h-50 d-flex align-items-center justify-content-center">
                        {props.children}
            </Container>
                    </Container>
                </Col> }
                <Col xs="2" md="6" className="bg-secondary-1"></Col>
                {props.left || <Col xs="10" md="6" className="p-0 m-0">
                    <Container fluid className="full-height p-0">
                    <Container fluid className="h-25 text-center d-flex justify-content-center clickable-text" onClick={handleClick}>
                        <p className="text-muted pt-2">{props.message[0]}</p> <p className="text-dark pt-2">{props.message[1]}</p>
            </Container>
            <Container fluid className="h-50 d-flex align-items-center justify-content-center">
                        {props.children}
            </Container>
                    </Container>
                </Col>}
            </Row>
        </Container>)
}

AuthSiteComponent.propTypes = {
    left: PropTypes.bool,
    message: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.element.isRequired,
    gotoFunc: PropTypes.func.isRequired,
}

export default AuthSiteComponent;