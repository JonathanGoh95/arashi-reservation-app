import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import { getUser, updateUser } from "../services/userService";
import { UserContext } from "../contexts/UserContext";
import { deleteUser } from "../services/userService";
import { ToastContainer, toast } from "react-toastify";

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
        toast.success("Account Successfully Updated")
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
    toast.success("Account Successfully Deleted")
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
    <>
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-4">
      <h1 className="m-4 has-text-black is-italic">
        {isEditing ? "Edit your Profile" : "Sign Up as a New User"}
      </h1>
      <p className="is-size-5 has-text-black is-italic">{message}</p>
      <p className="is-size-5 has-text-black is-italic">Fields marked with * are required</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label is-size-5 has-text-black">Display Name*:</label>
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
              <label className="label is-size-5 has-text-black">Email*:</label>
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
              <label className="label is-size-5 has-text-black">Password*:</label>
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
              <label className="label is-size-5 has-text-black">Confirm Password*:</label>
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
          <label className="label is-size-5 has-text-black">Birthday:</label>
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
          <label className="label is-size-5 has-text-black">Contact Number:</label>
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
            <button className="button mx-3 mt-2 is-primary" type="submit">
              Update Profile
            </button>
            <button className="button mx-3 mt-2 is-danger" onClick={handleDelete}>
              Delete Profile
            </button>
          </div>
        ) : (
          <div className="is-flex is-justify-content-center">
            <button
              className="button mx-3 mt-2 is-primary"
              type="submit"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
            <button className="button mx-3 mt-2 is-danger" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        )}
      </form>
      {!isEditing && (
        <Link className="box is-italic p-3 m-4 has-text-white is-size-5" to="/login">
          Already have an account? Login Here
        </Link>
      )}
    </div>
    {/* Toastify Container for Visual Customization and Appearance in Browser */}
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
    </>
  );
};

export default UserDetailForm;
