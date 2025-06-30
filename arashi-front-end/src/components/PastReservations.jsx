import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import * as reservationService from "../services/reservationService";

const PastReservations = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastReservations = async () => {
      const pastReservationData = await reservationService.viewPastReservations(
        user._id,
      );
      setLoading(false);
      setReservations(pastReservationData);
    };
    fetchPastReservations();
  }, [user._id]);

  const handleBack = () => {
    navigate("/reservations");
  };

  return (
    <>
      {!user ? (
        <div className="content is-flex is-justify-content-center has-text-black">
          <h2>You are not authorised to view this page</h2>
        </div>
      ) : (
        <div className="content">
          <h1 className="has-text-centered m-5 is-size-1 m-6 has-text-black">
            {user.displayName}'s Past Reservations
          </h1>

          {loading && (
            <div className="is-flex is-justify-content-center m-6 is-size-2">
              <progress className="is-link"/>
            </div>
          )}

          {!loading && reservations && reservations.length !== 0 && (
            <div className="is-flex is-justify-content-center">
              <table className="table is-bordered has-text-centered is-size-4">
                <thead>
                  <tr>
                    <th>Reservation Name</th>
                    <th>Reservation Date</th>
                    <th>Reservation Time</th>
                    <th>Contact No.</th>
                    <th>Pax</th>
                    <th>Branch</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody className="is-size-5">
                  {reservations.map((reservation) => (
                    <tr key={reservation._id}>
                      <th>{reservation.reservationName}</th>
                      <th>
                        {new Date(
                          reservation.reservationDate,
                        ).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </th>
                      <th>{reservation.reservationTime}</th>
                      <th>{reservation.contactNumber}</th>
                      <th>{reservation.pax}</th>
                      <th>{reservation.branch.location}</th>
                      <th>{reservation.remarks}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && reservations && reservations.length === 0 && (
            <h2 className="has-text-centered has-text-black">
              No Past Reservations Found!
            </h2>
          )}
        </div>
      )}

      <div className="is-flex is-justify-content-center">
        <button className="button is-grey" onClick={handleBack}>
          Back
        </button>
      </div>
    </>
  );
};

export default PastReservations;
