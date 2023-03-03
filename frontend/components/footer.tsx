import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

export default function Footer() {
    return (
        <footer className="footer mt-auto bg-black py-3">
            <Container fluid="lg">
                <ul className="nav justify-content-center border-bottom py-2">
                    <li className="nav-item">
                        <Nav.Link as={Link} to="/home" className="nav-link footer-link">Home</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link as={Link} to="/data" className="nav-link footer-link">Data</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link as={Link} to="/visualizations" className="nav-link footer-link">Visualizations</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link as={Link} to="/documents" className="nav-link footer-link">API</Nav.Link>
                    </li>
                </ul>
                <Row className="justify-content-between pt-2">
                    <Col className="col-auto">
                        <p className="text-muted p-1 bottom-footer-txt">Created by Armadillo Slay</p>
                    </Col>
                    <Col className="col-auto">
                        <a href="https://github.com/RPI-ITWS/armadillo-slay" className="p-1 bottom-footer-txt"><i
                            className="bi bi-github"></i> Project</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}