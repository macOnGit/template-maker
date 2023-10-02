import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function SiteNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Template Maker
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" data-cy="home" to="/">
              Home
            </Link>
            <Link className="nav-link" data-cy="templates" to="/templates">
              Use
            </Link>
            <Link className="nav-link" data-cy="compose" to="/compose">
              Compose
            </Link>
            <Link className="nav-link" data-cy="edit" to="/edit">
              Edit
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNav;
