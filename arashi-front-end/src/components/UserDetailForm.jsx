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
    contactNumber: "",
  });

  const isEditing = userId ? true : false;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await getUser(userId);
      console.log("getProfile", userProfile)
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
    evt.preventDefault();
    try {
      if (isEditing) {
        console.log("editing");
        const updateProfile = await updateUser(userId, formData);
        setUser(updateProfile);
        navigate(`/profile`);
        toast.success("Account Successfully Updated")
      } else {
        console.log("signing up");
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
    if(contactNumber.length === 0){
      return !(displayName.length >2 && typeof email === email && password && password === passwordConf);
    }
    if(contactNumber.length > 0){
      return !(displayName.length >2 && contactNumber.length > 7 );
    }
  };

  const year = String(
    Number(new Date().toISOString().split("T")[0].split("-")[0]) - 18,
  );
  const month = new Date().toISOString().split("T")[0].split("-")[1];
  const day = new Date().toISOString().split("T")[0].split("-")[2];
  const min18 = `${year}-${month}-${day}`;

  return (
    <>
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-3">
      <h1 className="m-4 has-text-black is-italic">
        {isEditing ? "Edit your Profile" : "Sign Up as a New User"}
      </h1>
      <p className="is-size-4 has-text-black is-italic">{message}</p>
      <p className="is-size-4 has-text-black is-italic">Fields marked with * are required</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label is-size-4 has-text-black">Display Name *:
          <input
            className="input is-size-5"
            type="text"
            id="displayName"
            value={displayName}
            name="displayName"
            onChange={handleChange}
            required
          />
          </label>
        </div>
        {!isEditing && (
          <>
            <div className="field">
              <label className="label is-size-4 has-text-black">Email *: 
                <p className="label is-size-6 has-text-dark-grey">Please note that email is not editable after sign up.</p>
              <input
                className="input is-size-5"
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
              </label>
            </div>
            <div className="field">
              <label className="label is-size-4 has-text-black">Password *:
              <input
                className="input is-size-5"
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
              />
            </label>
            </div>              
            <div className="field">
              <label className="label is-size-4 has-text-black">Confirm Password *:
              <input
                className="input is-size-5"
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                required
              />
              </label>
            </div>
          </>
        )}
        <div className="field">
          <label className="label is-size-4 has-text-black">Birthday:
          <input
            className="input is-size-5"
            type="date"
            id="birthday"
            value={birthday}
            name="birthday"
            onChange={handleChange}
            max={min18}
          />
          </label>
        </div>
        <div className="field">
          <label className="label is-size-4 has-text-black">Contact Number:
          <input
            className="input is-size-5"
            type="String"
            id="contactNumber"
            value={contactNumber}
            name="contactNumber"
            onChange={handleChange}
          />
          </label>
        </div>
        {isEditing ? (
          <div className="is-flex is-justify-content-center">
            <button className="button mx-3 mt-2 is-primary" type="submit" disabled={isFormInvalid()}>
              Update Profile
            </button>
            <button className="button mx-3 mt-2 is-danger" onClick={handleDelete}>
              Delete Profile
            </button>
            <button className="button mx-3 mt-2 is-grey" onClick={() => navigate("/profile")}>
              Cancel
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
            <button className="button mx-3 mt-2 is-grey" onClick={() => navigate("/profile")}>
              Cancel
            </button>
          </div>
        )}
      </form>
      {!isEditing && (
        <Link className="has-text-dark is-light is-italic p-3 m-4 is-size-4" to="/login">
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
