import SignUpForm from "./SignUpForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  const userId = user._id;
  return <SignUpForm userId={userId} />;
};

export default EditProfile;
