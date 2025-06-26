import { useContext,useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router";
import Disclaimer from "./Disclaimer";

const Reservations = () => {
  const navigate = useNavigate();
  const [message,setMessage] = useState('')
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const handleUpcoming = () => {
    user._id !== userId ? setMessage('Not Authorised') : navigate(`/users/${userId}/reservations/upcoming`)
  }
  
  const handlePast = () => {
    user._id !== userId ? setMessage('Not Authorised') : navigate(`/users/${userId}/reservations/past`)
  }
 
  const handleNewReservation = () => {
    user._id !== userId ? setMessage('Not Authorised') : navigate(`/users/${userId}/reservations/new`)
  }

  return (
  <>
    <h1>My Reservations</h1>
    <p>{message}</p>
    {user ? (
      <>
        <div>
          <button onClick={handlePast}>Past Reservations</button>
          <button onClick={handleUpcoming}>Upcoming Reservations</button>
        </div>
        <div>
          <button onClick={handleNewReservation}>Make a New Reservation</button>
        </div>
      </>
    ) : (
      <h2>Please log in to see your reservations</h2>
    )}
    <Disclaimer />
  </>
)};

export default Reservations;
