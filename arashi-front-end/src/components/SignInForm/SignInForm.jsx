import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    console.log("submitting");

    evt.preventDefault();
    try {
      console.log("signing in");
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate(`/${signedInUser._id}/reservations`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>
              Email:
              <input
                type="email"
                autoComplete="off"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </section>
    </main>
  );
};

export default SignInForm;
