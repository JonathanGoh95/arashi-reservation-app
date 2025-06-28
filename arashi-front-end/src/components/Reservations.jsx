import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import Disclaimer from "./Disclaimer";

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleUpcoming = () => {
    navigate(`/reservations/upcoming`);
  };

  const handlePast = () => {
    navigate(`/reservations/past`);
  };

  const handleNewReservation = () => {
    navigate(`/reservations/new`);
  };

  return (
    <>
      {!user ? (
        <div className="is-flex is-justify-content-center">
          <div
            className="content card has-text-centered mb-6"
            style={{ width: "650px" }}
          >
            <h2 className="pt-4">
              Please login to view/edit your reservations
            </h2>
          </div>
        </div>
      ) : (
        <div className="content">
          <h1 className="has-text-centered m-5">
            {user.displayName}'s Reservations
          </h1>
          <div className="is-flex is-justify-content-space-evenly my-6">
            <button className="button is-size-4 is-link" onClick={handlePast}>
              Past Reservations
            </button>
            <button className="button is-size-4 is-link" onClick={handleUpcoming}>
              Upcoming Reservations
            </button>
            <button className="button is-size-4 is-link" onClick={handleNewReservation}>
              Make a New Reservation
            </button>
          </div>
        </div>
      )}
      <Disclaimer />
    </>
  );
};

export default Reservations;
