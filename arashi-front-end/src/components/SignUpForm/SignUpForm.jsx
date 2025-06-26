import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
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
    console.log("signing up");
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate(`/${newUser._id}/reservations`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(displayName && email && password && password === passwordConf);
  };

  const year = String(Number(new Date().toISOString().split('T')[0].split('-')[0]) - 18)
  const month = new Date().toISOString().split('T')[0].split('-')[1]
  const day = new Date().toISOString().split('T')[0].split('-')[2]
  const min18 = `${year}-${month}-${day}`

  return (
    <main>
      <section>
        <h1>Sign Up as a New User</h1>
        <p>{message}</p>
        <p>Fields marked with * are required</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Display Name*:
              <input
                type="text"
                id="displayName"
                value={displayName}
                name="displayName"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email*:
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password*:
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password*:
              <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Birthday:
              <input
                type="date"
                id="birthday"
                value={birthday}
                name="birthday"
                onChange={handleChange}
                max={min18}
              />
            </label>
          </div>
          <br />
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <br />
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
        <Link to="/sign-in">Already have an account? Sign In Here</Link>
      </section>
    </main>
  );
};

export default SignUpForm;
