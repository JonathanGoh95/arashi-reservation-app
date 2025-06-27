import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import Disclaimer from "./Disclaimer";

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleUpcoming = () => {
    navigate(`/reservations/upcoming`)
  }
  
  const handlePast = () => {
   navigate(`/reservations/past`)
  }
 
  const handleNewReservation = () => {
    navigate(`/reservations/new`)
  }

  return (
  <>
    {!user ? (
      <h2>Please log in to see your reservations</h2>
    ):(
      <>
      <h1>{user.displayName}'s Reservations</h1>
        <div>
          <button onClick={handlePast}>Past Reservations</button>
          <button onClick={handleUpcoming}>Upcoming Reservations</button>
        </div>
        <div>
          <button onClick={handleNewReservation}>Make a New Reservation</button>
        </div>
      </>
    ) }
    <Disclaimer />
  </>
)};

export default Reservations;
