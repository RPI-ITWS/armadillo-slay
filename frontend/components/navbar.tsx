import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavBar() {

    type isActive = (path: string) => boolean;

    let isActive: isActive = (path) => {
        return path === location.pathname;
    }

    return (
        <Navbar expand="lg" fixed='top' variant='dark' className='py-3'>
            <Container fluid="lg">
            <Navbar.Brand className=' align-items-center' as={Link} to="/home">NASA Renewable Energy Data</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className='justify-content-end' >
                <Nav className="mr-auto  align-items-center">
                    <Nav.Link as={Link} to="/home" className={`px-lg-3 ${isActive('/home') ? 'active' : ''}`}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/data" className={`px-lg-3 ${isActive('/data') ? 'active' : ''}`}>Data</Nav.Link>
                    <Nav.Link as={Link} to="/visualizations" className={`px-lg-3 ${isActive('/visualizations') ? 'active' : ''}`}>Visualizations</Nav.Link>
                    <Nav.Link as={Link} to="/documents" className={`ps-lg-3 ${isActive('/documents') ? 'active' : ''}`}>API</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


