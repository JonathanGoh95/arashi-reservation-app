import UserDetailForm from "./UserDetailForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const EditProfile = () =>{
    const { user } = useContext(UserContext);
    const userId = user._id
    return <UserDetailForm userId={userId} />;
  }

  export default EditProfile