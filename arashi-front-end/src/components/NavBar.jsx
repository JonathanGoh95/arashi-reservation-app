import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-start">
          <Link
            className="navbar-item is-size-3 px-4 py-4 is-italic has-text-link"
            to="/"
          >
            ARASHI RESERVATIONS
          </Link>
        </div>
        <div>
          <div className="navbar-end is-size-3 is-italic">
            <Link
              className="navbar-item px-4 py-4 has-text-link"
              to="/reservations"
            >
              Reservations
            </Link>
            <Link className="navbar-item px-4 py-4 has-text-link" to="/find-us">
              Find Us
            </Link>
          </div>
        </div>
      </nav>
      <div className="is-flex is-justify-content-flex-end is-italic">
        {user ? (
          <ul className="is-flex is-size-4 ">
            <li className="px-4">Welcome, {user.displayName}</li>
            <li className="px-4">
              <Link className="has-text-link" to={`/profile`}>
                {user.displayName}'s Profile
              </Link>
            </li>
            <li className="px-4">
              <Link className="has-text-link" to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="is-flex is-size-4">
            <li className="px-4">
              <Link className="has-text-link" to="/sign-up">
                SIGN UP
              </Link>
            </li>
            <li className="px-4">
              <Link className="has-text-link" to="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default NavBar;
