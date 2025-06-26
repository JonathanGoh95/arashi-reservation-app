import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Disclaimer from "./Disclaimer";

const Reservations = () => {
  const { user } = useContext(UserContext);
  
  return (
  <>
    <h1>My Reservations</h1>;
    {user ? (
      <h2>Please log in to see your reservations</h2>
    ) : (
      <>
        <h2>Upcoming Reservations</h2>
        <h2>Past Reservations</h2>
      </>
    )}
    <Disclaimer />
  </>
)};

export default Reservations;
