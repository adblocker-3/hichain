import { Link } from "react-router-dom";
import HiChainLogo from './assets/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 style={ LogoStyle }> </h1>
      <div className="links">
        <Link to="/policies">
          Insurance
        </Link>
        <Link to="/health">
          Health
        </Link>
        <Link to="/wallet">
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

const LogoStyle = {
  width: "100px",
  height: "100px",
  background: `url(${HiChainLogo})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

export default Navbar;