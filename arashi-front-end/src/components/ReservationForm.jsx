import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import {
  createReservation,
  editReservation,
  viewOneReservation,
} from "../services/reservationService";
import { indexBranch } from "../services/branchService";

const year = new Date().toISOString().split("T")[0].split("-")[0];
const month = new Date().toISOString().split("T")[0].split("-")[1];
const day = String(
  Number(new Date().toISOString().split("T")[0].split("-")[2]) + 1,
);
const minDate = `${year}-${month}-${day}`;

const ReservationForm = ({ reservationId }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [branches, setBranches] = useState("");
  const timeSlots = ["11.00am", "1.00pm", "5.00pm", "7.00pm"];
  const [message, setMessage] = useState("");
  const isEditing = reservationId ? true : false;

  const [formData, setFormData] = useState({
    reservationName: user.displayName,
    reservationDate: minDate,
    reservationTime: timeSlots[0],
    contactNumber: user.contactNumber,
    branch: branches[0],
    pax: "1",
    remarks: "",
    user: user._id,
  });

  useEffect(() => {
    if (isEditing) {
      const fetchReservation = async () => {
        const reservation = await viewOneReservation(reservationId);
        setFormData({
          reservationName: reservation.reservationName,
          reservationDate: reservation.reservationDate.split("T")[0],
          reservationTime: reservation.reservationTime,
          contactNumber: reservation.contactNumber,
          branch: reservation.branch.location,
          pax: reservation.pax,
          remarks: reservation.remarks,
          user: reservation.user._id,
        });
      };
      fetchReservation();
    }
  }, [isEditing, reservationId]);

  useEffect(() => {
      const fetchBranches = async () => {
        const branchesData = await indexBranch();
        setBranches(branchesData);
      };
      fetchBranches();
  }, []);

  const {
    reservationName,
    reservationDate,
    reservationTime,
    contactNumber,
    branch,
    pax,
    remarks,
  } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await editReservation(reservationId, formData);
      } else {
        await createReservation(formData);
      }
      navigate(`/reservations/upcoming`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-4">
      <h1 className="m-5">{isEditing ? "Edit Reservation" : "Make a Reservation"}</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">
            Reservation Name:
            </label>
            <input className="input"
              required
              type="string"
              name="reservationName"
              value={reservationName}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field">
          <label className="label">
            Contact Number:
            </label>
            <input className="input"
              required
              type="string"
              name="contactNumber"
              value={contactNumber}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field">
          <label className="label">
            Pax:
            </label>
            <input className="input"
              required
              type="number"
              min="1"
              max="8"
              name="pax"
              value={pax}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field">
          <label className="label">
            Branch:
            </label>
            <div className="select is-size-5">
            <select
              required
              type="string"
              name="branch"
              value={branch}
              onChange={handleChange}
            >
              {branches &&
                branches.map((branchName) => (
                  <option key={branchName.location} value={branchName.location}>
                    {branchName.location}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">
            Reservation Date:
            </label>
            <input className="input"
              type="date"
              min={minDate}
              required
              name="reservationDate"
              value={reservationDate}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field">
          <label className="label">
            Reservation Time:
            </label>
            <div className="select is-size-5">
            <select
              required
              name="reservationTime"
              value={reservationTime}
              onChange={handleChange}
            >
              <optgroup label="Lunch Session">
                <option value="11.00am">11.00am</option>
                <option value="1.00pm">1.00pm</option>
              </optgroup>
              <optgroup label="Dinner Session">
                <option value="5.00pm">5.00pm</option>
                <option value="7.00pm">7.00pm</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">
            Remarks (optional):
          </label>
            <textarea className="textarea"
              type="string"
              name="remarks"
              value={remarks}
              onChange={handleChange}
            ></textarea>
          
        </div>
        <div className="is-flex is-justify-content-center">
          <button className="button is-primary m-4" type="submit">
            {isEditing ? "Update Reservation" : "Submit Reservation"}
          </button>
          <button className="button is-danger m-4" onClick={() => navigate(isEditing ? "/reservations/upcoming" : "/reservations")}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
