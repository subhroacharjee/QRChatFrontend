import { Spinner, Container } from "react-bootstrap";

const Loader = (props) => {
    return (
        <Container fluid className="p-0 full-height full-width d-flex align-content-center justify-content-center">
            <Spinner animation="border" size="xl" variant="primary"/>
        </Container>
    );
}

export default Loader;