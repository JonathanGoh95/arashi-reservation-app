import { useState, useContext } from "react";
import { Link , useNavigate} from "react-router";
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
    console.log("signing up")
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      // setUser(newUser); //do we log the user in after they sign up?
      navigate("/login");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    setMessage("Please check your input details again.")
    !(displayName && email && password && password === passwordConf);
    //this line has error
  };

  return (
    <main>
      <section>
        <h1>Sign Up as a New User</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Display Name:
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
            <label>Email:
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
            <label>Password:
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
            <label>Confirm Password:
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
            <label>Birthday:
            <input
              type="date"
              id="birthday"
              value={birthday}
              name="birthday"
              onChange={handleChange}
            />
            </label>
          </div><br/>
          <div>
            <button>Sign Up</button><br/>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
        <Link to="/sign-in">Already have an account? Sign In Here</Link>
      </section>
    </main>
  );
};

export default SignUpForm;
