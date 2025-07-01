import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import {
  createReservation,
  editReservation,
  viewOneReservation,
} from "../services/reservationService";
import { indexBranch } from "../services/branchService";
import { ToastContainer, toast } from "react-toastify";

const today = new Date();
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1);
let minDate = new Date(tomorrow).toISOString().split("T")[0];

tomorrow.setDate(tomorrow.getDate() + 30);
let maxDate = new Date(tomorrow).toISOString().split("T")[0];

const ReservationForm = ({ reservationId }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [branches, setBranches] = useState("");
  const timeSlots = ["11:00am", "1:00pm", "5:00pm", "7:00pm"];
  const [message, setMessage] = useState("");
  const isEditing = reservationId ? true : false;

  const [formData, setFormData] = useState({
    reservationName: user.displayName,
    reservationDate: minDate,
    reservationTime: timeSlots[0],
    contactNumber: user.contactNumber,
    branch: "",
    pax: "1",
    remarks: "",
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
        });
      };
      fetchReservation();
    }
  }, [isEditing, reservationId]);

  useEffect(() => {
      const fetchBranches = async () => {
        const branchesData = await indexBranch();
        setFormData({...formData, branch: branchesData[0].location})
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
        toast.success("Reservation Successfully Edited")
      } else {
        await createReservation(formData);
        toast.success("Reservation Successfully Created")
      }
      setTimeout(() => {
      navigate(`/reservations/upcoming`);
      }, 3000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(reservationName.length > 2 && reservationDate && reservationTime && contactNumber.length > 7 && branch && pax);
  };

  return (
    <>
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-4">
      <h1 className="m-5 has-text-black">{isEditing ? "Edit Reservation" : "Make a Reservation"}</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}  style={{minWidth: "250px"}}>
        <div className="field">
          <label className="label has-text-black">
            Reservation Name:
            </label>
            <input className="input"
              required
              type="string"
              name="reservationName"
              value={reservationName}
              minLength={3}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field">
          <label className="label has-text-black">
            Contact Number:
            </label>
            <input className="input"
              required
              type="string"
              name="contactNumber"
              value={contactNumber}
              minLength={8}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field">
          <label className="label has-text-black">
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
          <label className="label has-text-black">
            Branch:
            </label>
            <div className="select is-size-6">
            <select  style={{minWidth: "250px"}}
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
          <label className="label has-text-black">
            Reservation Date:
            </label>
            <input className="input"
              type="date"
              min={minDate}
              max={maxDate}
              required
              name="reservationDate"
              value={reservationDate}
              onChange={handleChange}
            ></input>
        </div>
        <div className="field" >
          <label className="label has-text-black">
            Reservation Session:
            </label>
            <div className="select is-size-6">
            <select  style={{minWidth: "250px"}}
              required
              name="reservationTime"
              value={reservationTime}
              onChange={handleChange}
            >
              <optgroup label="Lunch Session">
                <option value="11:00am">11:00am</option>
                <option value="1:00pm">1:00pm</option>
              </optgroup>
              <optgroup label="Dinner Session">
                <option value="5:00pm">5:00pm</option>
                <option value="7:00pm">7:00pm</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label has-text-black">
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
          <button disabled={isFormInvalid()} className="button is-primary mx-4 my-3" type="submit" onClick={handleSubmit}>
            {isEditing ? "Update Reservation" : "Submit Reservation"}
          </button>
        </div>
      </form>
      <button className="button is-grey mx-4 my-3" onClick={() => navigate(isEditing ? "/reservations/upcoming" : "/reservations")}>Back</button>
    </div>
    {/* Toastify Container for Visual Customization and Appearance in Browser */}
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
    </>
  );
};

export default ReservationForm;
