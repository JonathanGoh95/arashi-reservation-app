import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { createReservation } from "../services/reservationService";

const year = new Date().toISOString().split('T')[0].split('-')[0]
const month = new Date().toISOString().split('T')[0].split('-')[1]
const day = String(Number(new Date().toISOString().split('T')[0].split('-')[2]) +1)
const minDate = `${year}-${month}-${day}`

const ReservationForm = () => {
  const navigate = useNavigate();
  const {user }= useContext(UserContext);
  const branches = ["Bugis - Bugis+" ,"Orchard - Orchard 313","Tampines - Tampines 1", "Jurong East - JEM", "Yishun - Northpoint City"]
  const timeSlots = ["11.00am", "1.00pm", "5.00pm", "7.00pm"]
  const [message, setMessage] = useState("");
  const [reservation, setReservation] = useState("");
  const [formData, setFormData] = useState({
    reservationName: user.displayName,
      reservationDate: "",
      reservationTime: timeSlots[0],
      contactNumber: user.contactNumber,
      branch: branches[0],
      pax: "",
      remarks: "",
      user: user._id,
  });

  const { reservationName, reservationDate, reservationTime,contactNumber, branch,pax, remarks } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData)

      const newReservation = await createReservation(user._id, formData);
      setReservation(newReservation);
      console.log(newReservation)

      navigate(`/user/${user._id}/reservations/upcoming`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
  <div>
    <h1>Reservation Form</h1>
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
        {branches.map((branchName)=>(
          <option key={branchName} value={branchName}>{branchName}</option>
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
        <input type="string" name="remarks" value={remarks} onChange={handleChange}></input>
      </label>      
      </div>
      <button type="submit">Submit Reservation</button>
    </form>
  </div>

  )
};

export default ReservationForm;
