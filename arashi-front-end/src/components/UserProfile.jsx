import {  useContext } from "react";
import {  useNavigate} from "react-router";

import { UserContext } from "../contexts/UserContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { displayName, email,birthday } = user;

  console.log(user)
  return (
    <main>
      <section>
        <h1>{displayName}'s Profile</h1>
          <div>
            <label>Display Name:{displayName}
              </label>
          </div>
          <div>
            <label>Email:{email}
            </label>
          </div>
          <div>
            <label>Birthday:{birthday}
       
            </label>
          </div>
          <div>
            <button onClick={() => navigate("/users/:userId/profile/edit")}>Edit</button><br/>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
      </section>
    </main>
  );
};

export default UserProfile;
