import { Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

export default function TopBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand to="/" as={Link}>
                Kopa Mediasoup
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link
                        to="/"
                        activeClassName="active"
                        exact
                        as={NavLink}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link
                        to="/producer"
                        activeClassName="active"
                        as={NavLink}
                    >
                        Produtor
                    </Nav.Link>
                    <Nav.Link
                        to="/consumer"
                        activeClassName="active"
                        as={NavLink}
                    >
                        Consumidor
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
