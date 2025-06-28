import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import { getUser, updateUser } from "../services/userService";
import { UserContext } from "../contexts/UserContext";
import { deleteUser } from "../services/userService";


const UserDetailForm = ({userId}) => {
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

  const isEditing = userId ? true : false;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await getUser(userId);
      setFormData({
        displayName: userProfile.displayName,
        email: userProfile.email,
        birthday: userProfile.birthday.split("T")[0],
        contactNumber: userProfile.contactNumber,
      });
    };
    fetchUserProfile();
  }, [userId]);

  const {
    displayName,
    email,
    password,
    passwordConf,
    birthday,
    contactNumber,
  } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    console.log("signing up");
    evt.preventDefault();
    try {
      if (isEditing) {
        const updateProfile = await updateUser(userId, formData);
        setUser(updateProfile);
        navigate(`/profile`);
      } else {
        const newUser = await signUp(formData);
        setUser(newUser);
        navigate(`/reservations`);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();
    console.log("deleting account");
     await deleteUser(userId);
    setUser("");
    navigate(`/`);
  }
  const isFormInvalid = () => {
    return !(displayName && email && password && password === passwordConf);
  };

  const year = String(
    Number(new Date().toISOString().split("T")[0].split("-")[0]) - 18,
  );
  const month = new Date().toISOString().split("T")[0].split("-")[1];
  const day = new Date().toISOString().split("T")[0].split("-")[2];
  const min18 = `${year}-${month}-${day}`;

  return (
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-4">
      <h1 className="m-4">
        {isEditing ? "Edit your Profile" : "Sign Up as a New User"}
      </h1>
      <p className="is-size-5">{message}</p>
      <p className="is-size-5">Fields marked with * are required</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label is-size-5">Display Name*:</label>
          <input
            className="input"
            type="text"
            id="displayName"
            value={displayName}
            name="displayName"
            onChange={handleChange}
            required
          />
        </div>
        {!isEditing && (
          <>
            <div className="field">
              <label className="label is-size-5">Email*:</label>
              <input
                className="input"
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label is-size-5">Password*:</label>
              <input
                className="input"
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label is-size-5">Confirm Password*:</label>
              <input
                className="input"
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className="field">
          <label className="label is-size-5">Birthday:</label>
          <input
            className="input"
            type="date"
            id="birthday"
            value={birthday}
            name="birthday"
            onChange={handleChange}
            max={min18}
          />
        </div>
        <div className="field">
          <label className="label is-size-5">Contact Number:</label>
          <input
            className="input"
            type="String"
            id="contactNumber"
            value={contactNumber}
            name="contactNumber"
            onChange={handleChange}
          />
        </div>
        {isEditing ? (
          <div className="is-flex is-justify-content-center">
            <button className="button m-3" type="submit">
              Update profile
            </button>
            <button className="button m-3 is-danger" onClick={handleDelete}>
              Delete Profile
            </button>
          </div>
        ) : (
          <div className="is-flex is-justify-content-center">
            <button
              className="button m-3 is-primary"
              type="submit"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
            <button className="button m-3 is-danger" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        )}
      </form>
      {!isEditing && (
        <Link className="is-italic m-3" to="/login">
          Already have an account? Login Here
        </Link>
      )}
    </div>
  );
};

export default UserDetailForm;
