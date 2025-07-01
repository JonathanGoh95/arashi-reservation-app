import { Routes, Route } from "react-router";
import "bulma/css/bulma.min.css";
import NavBar from "./components/NavBar";
import SignInForm from "./components/SignInForm";
import Landing from "./components/Landing";
import Branches from "./components/Branches";
import Reservations from "./components/Reservations";
import ReservationForm from "./components/ReservationForm";
import PastReservations from "./components/PastReservations";
import UpcomingReservations from "./components/UpcomingReservations";
import Profile from "./components/Profile";
import EditReservation from "./components/EditReservation";
import EditProfile from "./components/EditProfile";
import UserDetailForm from "./components/UserDetailForm";
import background from "../images/background.jpg"
import { ToastContainer } from "react-toastify";

const styleBackground = {
  position : "absolute",
  width:  "100vw",
  height: "100vh",
  overflow: "auto",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundRepeat: "repeat",
}
const styleMain = {
  position : "absolute",
  width:  "100vw",
  height: "100vh",
}

const styleFooter={
  position : "fixed",
  bottom: "0",
  display: "center",
  textAlign: "center",
  width: "100%",
  padding: "10px"
}
const App = () => {
  return (
    <>
    <div style={styleMain}>
    <div style={styleBackground}>

      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<UserDetailForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/find-us" element={<Branches />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/past" element={<PastReservations />} />
        <Route
          path="/reservations/upcoming"
          element={<UpcomingReservations />}
          />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route
          path="/reservations/:reservationId/edit"
          element={<EditReservation />}
          />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
      <footer style={styleFooter} className="is-flex is-justify-content-center is-align-item-flex-end has-text-black p-2">
        © 2025 ARASHI RESERVATIONS, ALL RIGHTS RESERVED
      </footer>
    </div>
    </div>
    {/* Toastify Container for Visual Customization and Appearance in Browser */}
      <ToastContainer
          position="top-right"
          autoClose={1500}
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

export default App;
