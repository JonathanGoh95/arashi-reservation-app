import { useContext,useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router";
import Disclaimer from "./Disclaimer";

const Reservations = ({setPast,setUpcoming}) => {
  const navigate = useNavigate();
  const [message,setMessage] = useState('')
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const [newReservation,setNewReservation] = useState(false)

  const handlePast = () => {
    setPast(true)
    user._id !== userId ? setMessage('Not Authorised') : navigate(`/users/${userId}/reservations/past`)
  }
  
  const handleUpcoming = () => {
    setUpcoming(true)
    user._id !== userId ? setMessage('Not Authorised') : navigate(`/users/${userId}/reservations/upcoming`)
  }
 
  const handleNewReservation = () => {
    setNewReservation(true)
    user._id !== userId ? setMessage('Not Authorised') : navigate(`/users/${userId}/reservations/new`)
  }

  return (
  <>
    <h1>My Reservations</h1>
    <p>{message}</p>
    {user ? (
      <>
        <button onClick={handleNewReservation}>Make a Reservations</button>
        <button onClick={handlePast}>Upcoming Reservations</button>
        <button onClick={handleUpcoming}>Past Reservations</button>
      </>
    ) : (
      <h2>Please log in to see your reservations</h2>
    )}
    <Disclaimer />
  </>
)};

export default Reservations;
