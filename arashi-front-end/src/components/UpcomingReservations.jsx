import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import * as reservationService from "../services/reservationService"

const UpcomingReservations = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [reservations,setReservations] = useState(null)
    
    useEffect(() => {
        const fetchUpcomingReservations = async () => {
        const upcomingReservationData = await reservationService.viewUpcomingReservations(user._id)
        setReservations(upcomingReservationData);
        };
        fetchUpcomingReservations();
    }, [user._id]);
    
    const handleEdit = (reservationId) => {
        navigate(`/reservations/${reservationId}/edit`)
    }

    const handleDelete = async (reservationId) => {
        await reservationService.deleteReservation(user._id,reservationId)
        setReservations(reservations.filter((reservation) => reservationId !== reservation._id))
    }

    const handleBack = () => {
        navigate('/reservations')
    }

    return (
        <>
        <h1>My Upcoming Reservations</h1>
        {!user ? (
            <h2>You are not authorised to view this page</h2>
        ) : 
        (
            reservations ? (<table>
                <thead>  
            <tr>
                <th>Reservation Name</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
                <th>Contact No.</th>
                <th>Pax</th>
                <th>Branch</th>
                <th>Remarks</th>
                <th>Actions</th>
            </tr>
                </thead>
                <tbody>

            {reservations.map((reservation)=>(
                <tr key={reservation._id}>
                    <th>{reservation.reservationName}</th>
                    <th>{new Date(reservation.reservationDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</th>
                    <th>{reservation.reservationTime}</th>
                    <th>{reservation.contactNumber}</th>
                    <th>{reservation.pax}</th>
                    <th>{reservation.branch.location}</th>
                    <th>{reservation.remarks}</th>
                    <th><button onClick={() => handleEdit(reservation._id)}>Edit</button><button onClick={() => handleDelete(reservation._id)}>Delete</button></th>
                </tr>
            ))}
            </tbody>
            </table>) : (<h2>You do not have any <strong>past</strong> reservations</h2>)
        )}
        <button onClick={handleBack}>Back</button>
        </>
    )
}

export default UpcomingReservations