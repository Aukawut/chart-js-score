import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function NavBar() {
  const navigate = useNavigate()
const login  = localStorage.getItem('login')
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("token_user")
    localStorage.removeItem("login")
    navigate('/login')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand ><i className="fa-solid fa-user"></i> ChartJS React</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/showdata">Data</Nav.Link>
            <Nav.Link as={Link} to="/report">Report</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
         
        </Navbar.Collapse>  
        
      </Container >
    {login?<><i className="fa-solid fa-right-from-bracket text-white" style={{cursor:'pointer'}} onClick={logout}></i></>:<></>}
    </Navbar>
  );
}

export default NavBar;