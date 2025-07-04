import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import { getUser, updateUser } from "../services/userService";
import { UserContext } from "../contexts/UserContext";
import { deleteUser } from "../services/userService";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

const UserDetailForm = ({userId}) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        const updateProfile = await updateUser(userId, formData);
        setUser(updateProfile);
        toast.success("Account Successfully Updated. Redirecting soon...")
        setTimeout(() => {
          navigate(`/profile`);
        }, 1500);
      } else {
        const newUser = await signUp(formData);
        setUser(newUser);
        toast.success("Account Successfully Created. Redirecting soon...")
        setTimeout(() => {
          navigate(`/reservations`);
        }, 1500);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async () => {
    await deleteUser(userId);
    setUser("");
    localStorage.removeItem("token")
    navigate(`/`);
  }
  const isFormInvalid = () => {
    if(isEditing){
      if(contactNumber.length === 0 ){
        const result = displayName.length >2 && birthday 
        return !result;
      }else{
        const result = contactNumber.length >7 && displayName.length >2 && birthday
        return !result;
      }
    }else{
      if(contactNumber.length === 0 ){
        const result = displayName.length >2 && birthday && isEmail(email) && password.length >2 && password === passwordConf
        return !result;
      }else{
        const result = contactNumber.length >7 && displayName.length >2 && birthday && isEmail(email) && password.length >2 && password === passwordConf
        return !result;
      }
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
      <p className="is-size-4 has-text-black is-italic">Fields marked with * are required</p>
      <p className="is-size-4 has-text-danger-45 is-italic px-3">{message}</p>
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
                <p className="label is-size-6 has-text-black">Please note that email is not editable after sign up.</p>
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
          <label className="label is-size-4 has-text-black">Birthday *:
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
            <button className="button mx-3 mt-2 is-danger" type="button" onClick={() => setIsModalOpen(true)}>
              Delete Profile
            </button>
            <button className="button mx-3 mt-2 is-grey" type="button" onClick={() => navigate("/")}>
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
            <button className="button mx-3 mt-2 is-grey" type="button" onClick={() => navigate("/")}>
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
    <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirm Profile Deletion</p>
          <button className="delete" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
        </header>

        <section className="modal-card-body">
          <p>This action cannot be undone. Are you sure you want to continue?</p>
        </section>

        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button
            className="button is-danger mr-2"
            onClick={() => {
              handleDelete()
              setIsModalOpen(false);
            }}
          >
            Confirm
          </button>
          <button className="button ml-2" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
    </>
  );
};

export default UserDetailForm;
