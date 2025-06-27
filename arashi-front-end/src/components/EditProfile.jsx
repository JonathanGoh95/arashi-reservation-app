import SignUpForm from "./SignUpForm";
import { useParams } from "react-router";

const EditProfile = () =>{
    const { userId } = useParams();
    return <SignUpForm userId={userId} />;
  }

  export default EditProfile