import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer l'état utilisateur depuis Redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userName = useSelector((state) => state.user.userName || "User");

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/"); 
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar__logo" aria-current="page">
          <img src="/img/argentBankLogo.webp  " alt="Argent Bank logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {!isAuthenticated ? (
          <Link to="/signIn" className="navbar__link">
            <FontAwesomeIcon icon={faCircleUser} />
            <span>Sign In</span>
          </Link>
        ) : (
          <div className="navbar__user">
            <Link to="/user" className="navbar__link">
              <FontAwesomeIcon icon={faCircleUser} />
              <span className="navbar__username">{userName}</span> {/* Affichage du userName */}
            </Link>
            <button onClick={handleLogout} className="navbar__link">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;