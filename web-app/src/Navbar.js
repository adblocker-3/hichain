import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>HiChain</h1>
      <div className="links">
        <Link to="/policies">
          Insurance
        </Link>
        <Link to="/policies">
          Health
        </Link>
        <Link to="/policies">
          Wallet
        </Link>
        <Link to="/settings">
          Settings
        </Link>
        <Link to="/">
          <button className="primary-button">Log out</button>
        </Link>
      </div>
    </nav>
  );
}
 
export default Navbar;