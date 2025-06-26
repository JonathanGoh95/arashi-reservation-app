import { useContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import * as reservationService from "../services/reservationService"
import dayjs from 'dayjs';

const UpcomingReservations = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { user } = useContext(UserContext);
    const [reservations,setReservations] = useState(null)
    
    useEffect(() => {
        const fetchReservations = async () => {
        const reservationData = await reservationService.viewReservations(userId)
        const filteredReservations = reservationData.filter(item => dayjs(item.reservationDate).isAfter(dayjs().startOf('day')))
        setReservations(filteredReservations);
        };
        fetchReservations();
    }, [userId]);
    
    const handleEdit = (reservationId) => {
        navigate(`/users/${user._id}/reservations/${reservationId}/edit`)
    }

    const handleDelete = async (reservationId) => {
        await reservationService.deleteReservation(user._id,reservationId)
        setReservations(reservations.filter((reservation) => reservationId !== reservation._id))
    }

    return (
        <>
        <h1>My Upcoming Reservations</h1>
        {!user || user._id !== userId ? (
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
        </>
    )
}

export default UpcomingReservations