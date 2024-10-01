import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
  return (
    <>
      <Navbar bg="dark" expand="lg" data-bs-theme="dark" className="flex justify-between items-center py-4 px-6">
        <Container>
          <Navbar.Brand href="#home" className="text-xl font-bold text-black">
            Navbar
          </Navbar.Brand>
        </Container>
        <Nav className="hidden lg:flex items-center space-x-4">  {/* Responsive Nav for larger screens */}
          <Nav.Link href="#home" className="text-black hover:text-gray-200">
            Home
          </Nav.Link>
          <Nav.Link href="#features" className="text-black hover:text-gray-200">
            Features
          </Nav.Link>
          <Nav.Link href="#pricing" className="text-black hover:text-gray-200">
            Pricing
          </Nav.Link>
        </Nav>
      </Navbar>
      <Navbar collapseOnSelect expand="lg" id="basic-navbar-nav" className="lg:hidden">  {/* Responsive Nav for smaller screens */}
        <Container>
          <Nav className="flex flex-col space-y-4 py-4">
            <Nav.Link href="#home" className="text-black hover:text-gray-500">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="text-black hover:text-gray-500">
              Features
            </Nav.Link>
            <Nav.Link href="#pricing" className="text-black hover:text-gray-500">
              Pricing
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;