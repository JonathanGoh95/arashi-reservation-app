import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { createReservation,editReservation, viewOneReservation } from "../services/reservationService";
import { indexBranch } from "../services/branchService";

const year = new Date().toISOString().split('T')[0].split('-')[0]
const month = new Date().toISOString().split('T')[0].split('-')[1]
const day = String(Number(new Date().toISOString().split('T')[0].split('-')[2]) +1)
const minDate = `${year}-${month}-${day}`


const ReservationForm = ({reservationId}) => {
  const navigate = useNavigate();
  const {user }= useContext(UserContext);
  const [branches,setBranches] = useState("");
  const timeSlots = ["11.00am", "1.00pm", "5.00pm", "7.00pm"]
  const [message, setMessage] = useState("");
  const isEditing = reservationId ? true : false;
  const [formData, setFormData] = useState({
    reservationName: user.displayName,
    reservationDate: "",
    reservationTime: timeSlots[0],
    contactNumber: user.contactNumber,
    branch: branches[0],
    pax: "",
    remarks: "",
    user: user._id
  });
  
  useEffect(()=>{
    if(isEditing){
      const fetchBranches = async () =>{
        const branchesData = await indexBranch()
        console.log(branchesData)
        setBranches(branchesData);
      }
      const fetchReservation = async () =>{
        console.log(reservationId)
        
        const reservation = await viewOneReservation(reservationId)
        console.log(reservation)
        setFormData({
          reservationName: reservation.reservationName,
          reservationDate: (reservation.reservationDate).split("T")[0],
          reservationTime: reservation.reservationTime,
          contactNumber: reservation.contactNumber,
          branch: reservation.branch.location,
          pax: reservation.pax,
          remarks: reservation.remarks,
          user: reservation.user._id,
        });
      }
      fetchBranches()
      fetchReservation()
    }
  },[isEditing, user._id, reservationId])


  const { reservationName, reservationDate, reservationTime,contactNumber, branch,pax, remarks } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(isEditing){
        await editReservation(reservationId, formData);
      }else{
        await createReservation(formData);

      }
      navigate(`/reservations/upcoming`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
  <div>
    <h1>{isEditing ? "Edit Reservation" :"Make a Reservation"}</h1>
    <p>{message}</p>
    <form onSubmit={handleSubmit}>
      <div>
      <label>
        Reservation Name:
        <input required type="string" name="reservationName" value={reservationName} onChange={handleChange}></input>
      </label>
      </div>
      <div>
      <label>
        Contact Number:
        <input required type="string" name="contactNumber" value={contactNumber} onChange={handleChange}></input>
      </label>      
      </div>
      <div>
      <label>
        Pax:
        <input required type="number" max="8" name="pax" value={pax} onChange={handleChange}></input>
      </label>      
      </div>
      <div>
      <label>
        Branch:
        <select required type="string" name="branch" value={branch} onChange={handleChange}>
        {branches && branches.map((branchName)=>(
          <option key={branchName.location} value={branchName.location}>{branchName.location}</option>
        ))}
        </select>
      </label>      
      </div>
      <div>
      <label>
        Reservation Date:
        <input type="date"
        min={minDate} required
        name="reservationDate" value={reservationDate} onChange={handleChange}></input>
      </label>      
      </div>
      <div>
      <label>
        Reservation Time:
        <select required name="reservationTime" value={reservationTime} onChange={handleChange}>
        <optgroup label="Lunch session">
          <option value="11.00am">11.00am</option>
          <option value="1.00pm">1.00pm</option>
        </optgroup>
        <optgroup label="Dinner session">
          <option value="5.00pm">5.00pm</option>
          <option value="7.00pm">7.00pm</option>
        </optgroup>
        </select>
      </label>      
      </div>
      <div>
      <label>
        Remarks (optional):
        <textarea type="string" name="remarks" value={remarks} onChange={handleChange}></textarea>
      </label>      
      </div>
      <button type="submit">{isEditing ? "Update Reservation" :"Submit Reservation"}</button>
    </form>
  </div>

  )
};

export default ReservationForm;
