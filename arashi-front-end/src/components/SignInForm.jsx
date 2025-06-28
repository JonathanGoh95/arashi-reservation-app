import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/authService";

import { UserContext } from "../contexts/UserContext";

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
      navigate(`/reservations`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-4">
      <h1>Sign In</h1>
      <p>{message}</p>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label is-size-5">Email:</label>
            <input
              className="input"
              type="email"
              autoComplete="off"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label className="label is-size-5">Password:</label>
            <input
              className="input"
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="is-flex is-justify-content-center">
            <button className="button m-3 is-primary" type="submit">
              Sign In
            </button>
            <button className="button m-3 is-danger" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignInForm;
