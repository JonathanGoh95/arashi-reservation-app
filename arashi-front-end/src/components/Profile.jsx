import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="is-flex is-justify-content-center is-size-5 p-5">
      {!user ? (
        <div className="content">
          <h1>Unauthorized User</h1>
        </div>
      ) : (
        <div
          className="card content is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-size-5 m-4 p-4"
          style={{ width:"600px" , height: "500px"}}
        >
          <h1 className="mt-4">{user.displayName}'s Profile</h1>
          <p className="p-2">Display Name: {user.displayName}</p>
          <p className="p-2">Email: {user.email}</p>
          <p className="p-2">
            Birthday:{" "}
            {new Date(user.birthday).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="p-2">Contact Number: {user.contactNumber}</p>
          <div className="p-2">
            <button
              className="button mx-4 is-warning"
              onClick={() => navigate(`/profile/edit`)}
            >
              Edit Profile
            </button>
            <button className="button mx-4 is-grey" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
