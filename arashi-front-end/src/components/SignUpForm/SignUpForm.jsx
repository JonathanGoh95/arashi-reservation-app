import { useState, useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConf: "",
    birthday: "",
  });

  const { displayName, email, password, passwordConf, birthday } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(displayName && email && password && password === passwordConf);
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up as a New User</h1>
          <p>{message}</p>
          <div>
            <label htmlFor="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              name="displayName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="birthday">Birthday:</label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              name="birthday"
              onChange={handleChange}
            />
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <button onClick={() => navigate("/")}>Cancel</button>
            <Link to="/sign-in">Already have an account? Sign In Here</Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
