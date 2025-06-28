import { Routes, Route } from "react-router";

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

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<UserDetailForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/find-us" element={<Branches />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/past" element={<PastReservations/>} />
        <Route path="/reservations/upcoming" element={<UpcomingReservations/>} />
        <Route
          path="/reservations/new"
          element={<ReservationForm />}
        />
        <Route
          path="/reservations/:reservationId/edit"
          element={< EditReservation />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
    
        </Routes>
    </>
  );
};

export default App;
