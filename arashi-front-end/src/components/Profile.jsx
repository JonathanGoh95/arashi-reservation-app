import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  // const { userId } = useParams();
  const { user } = useContext(UserContext);

  console.log(user)
  return (
    <>
      {!user._id ? (
        <h1>Unauthorized User</h1>
      ) : (
        <article>
          <h1>{user.displayName}'s Profile</h1>
          <p>Display Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>Birthday: {user.birthday}</p>
          <p>Contact Number: {user.contactNumber}</p>
        </article>
      )}
      <button onClick={() => navigate(`/profile/edit`)}>Edit Profile</button>
      <button onClick={() => navigate("/")}>Back</button>
    </>
  );
};

export default Profile;
