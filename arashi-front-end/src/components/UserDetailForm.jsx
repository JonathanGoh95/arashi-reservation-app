import { useState, useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import { getUser, updateUser , deleteUser } from "../services/userService";
import { UserContext } from "../contexts/UserContext";


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

  useEffect(()=> {
    const fetchUserProfile = async () =>{
      const userProfile = await getUser(userId)
      setFormData({
        displayName: userProfile.displayName,
        birthday: (userProfile.birthday).split("T")[0],
        contactNumber: userProfile.contactNumber,
      });
    }
    fetchUserProfile()
  },[userId])


  const { displayName, email, password, passwordConf, birthday, contactNumber } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    console.log("signing up");
    evt.preventDefault();
    try {
      if(isEditing){
        const updatedUser = await updateUser(userId, formData);
        setUser(updatedUser);
        navigate(`/profile`);
      }else{
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
    const deleteUser = await deleteUser(userId);
    setUser("");
    navigate(`/`);
  }
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
        
        <h1>{isEditing ? "Edit your profile" : "Sign Up as a New User"}</h1>
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
          {isEditing ? "" : 
          (
          <>
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
          </>
          )}
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
          <div>
            <label>
              Contact Number:
              <input
                type="String"
                id="contactNumber"
                value={contactNumber}
                name="contactNumber"
                onChange={handleChange}
              />
            </label>
          </div>
          <br />
          {isEditing ?             
          ( <>
            <button type="submit">Update profile</button> 
            <br />
            <button onClick={handleDelete}>Delete profile</button>
          </>): 
          (
          <>
            <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
            <br />
            <button onClick={() => navigate("/")}>Cancel</button>
          </>
          )}
          </form>

          {isEditing ? "" : <Link to="/sign-in">Already have an account? Sign In Here</Link>}
        </section>
    </main>
  );
};

export default UserDetailForm;
