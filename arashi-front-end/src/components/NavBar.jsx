import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("You have signed out successfully")
  };

  return (
    <div>
      <nav className="navbar has-background-inherit is-light is-flex flex-direction-row is-justify-content-space-between px-6">
        <div className="navbar-start">
          <Link
            className="navbar-item has-text-weight-bold is-size-2 px-4 py-4 is-italic"
            to="/"
          >
            ARASHI RESERVATIONS
          </Link>
        </div>
          <div className="navbar-end is-size-3 is-italic is-flex flex-direction-row">
            <Link
              className="navbar-item px-4 py-4"
              to="/reservations"
            >
              Reservations
            </Link>
            <Link className="navbar-item px-4 py-4" to="/find-us">
              Find Us
            </Link>
          </div>
          </nav>
      <nav className="navbar has-background-inherit is-light is-flex is-justify-content-flex-end is-italic px-6">
        {user ? (
          <ul className="is-flex is-size-4 ">
            <li className="navbar-item px-4 has-text-black">Welcome, {user.displayName}</li>
            <li className=" px-4">
              <Link className="navbar-item has-text-black" to={`/profile`}>
                {user.displayName}'s Profile
              </Link>
            </li>
            <li className=" px-4">
              <Link className="navbar-item has-text-black" to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="is-flex is-size-4">
            <li className="px-4">
              <Link className="navbar-item has-text-black" to="/sign-up">
                SIGN UP
              </Link>
            </li>
            <li className="px-4">
              <Link className="navbar-item has-text-black" to="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
