import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
function Header() {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    //console.log(userInfo)
    const history = useHistory();
    function logOut() {
        localStorage.clear()
        history.push("/login")
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto nav_bar_wrapper">
                        {
                            localStorage.getItem("user-info") ?
                                <>
                                    <Link to="/">Product</Link>
                                    <Link to="/add-product">Add Product</Link>
                                    {/* <Link to="/update-product">Update Product</Link> */}
                                    <Link to="/search">Search Product</Link>
                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                        }
                    </Nav>
                    {
                        localStorage.getItem("user-info") ?
                            <Nav>
                                <NavDropdown title={userInfo && userInfo.name}>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logOut}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            : null
                    }

                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
