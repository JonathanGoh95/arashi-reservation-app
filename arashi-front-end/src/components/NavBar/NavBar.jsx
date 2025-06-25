import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      <div>
        <Link to="/">ARASHI OMAKASE</Link>
      </div>
      <li>
        <Link to="/reservations">Reservations</Link>
      </li>
      <li>
        <Link to="/find-us">Find Us</Link>
      </li>
      
      {user ? (
        <ul>  
          <li>Welcome, {user.displayName}</li>
          <li>
            <Link to="/users/:userId/profile">{user.displayName}'s Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
          <ul>
            <li>
              <Link to="/sign-up">SIGN UP</Link>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
          </ul>
      )}
    </nav>
  );
};

export default NavBar;
