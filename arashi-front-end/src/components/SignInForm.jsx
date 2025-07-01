import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/authService";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

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
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      toast.success("Sign In Successful. Redirecting soon...")
      setTimeout(() => {
        navigate(`/reservations/`);
      }, 1500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const {
    email,
    password
  } = formData;

  const isFormInvalid = () => {
        const result = isEmail(email) && password.length >2 && password
        return !result;
  };
  return (
    <>
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-4">
      <h1 className="has-text-black is-italic">Sign In</h1>
      <p className="is-size-4 has-text-danger-45 is-italic px-3">{message}</p>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label is-size-5 has-text-black">Email:</label>
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
            <label className="label is-size-5 has-text-black">Password:</label>
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
            <button disabled={isFormInvalid()} className="button m-3 is-primary" type="submit">
              Sign In
            </button>
            <button className="button m-3 is-danger" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
    </>
  );
};

export default SignInForm;
