import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const handleLogout = () => {
    // Aucune action liée au localStorage ici
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar__logo" aria-current="page">
        <img src="/img/argentBankLogo.webp" alt="Argent Bank logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <Link to="/signIn" className="navbar__link">
          <FontAwesomeIcon icon={faCircleUser} />
          <span>Sign In</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
