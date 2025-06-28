import ReservationForm from "./ReservationForm";
import { useParams } from "react-router";

const EditReservation = () => {
  const { reservationId } = useParams();
  return <ReservationForm reservationId={reservationId} />;
};

export default EditReservation;
