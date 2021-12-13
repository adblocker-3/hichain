import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>HiChain</h1>
      <div className="links">
        <Link to="/">Login Page</Link>
        <Link to="/Settings">Change Settings</Link>
        <Link to="/Policies">My Policies</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;