import ReservationForm from "./ReservationForm";
import { useParams } from "react-router";

const EditProfile = () =>{
    const { userId } = useParams();
    return <ReservationForm userId={userId} />;
  }

  export default EditProfile