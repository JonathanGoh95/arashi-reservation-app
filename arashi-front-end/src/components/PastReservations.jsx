import { useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../contexts/UserContext";
import * as reservationService from "../services/reservationService"

const PastReservations = () => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
    return (
        <>
        <h1>My Reservations</h1>;
        {user || user._id !== userId ? (
            <>

            </>
        ) : (
            <h2>You are not authorised to view this page</h2>
        )}
        </>
    )
}

export default PastReservations