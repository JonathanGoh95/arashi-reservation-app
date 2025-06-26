import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Landing from "./components/Landing";
import Branches from "./components/Branches";
import Reservations from "./components/Reservations";
import ReservationForm from "./components/ReservationForm";
import ProfileForm from "./components/ProfileForm";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/find-us" element={<Branches />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/users/:userId/reservations" element={<Reservations />} />
        <Route
          path="/users/:userId/reservations/new"
          element={<ReservationForm />}
        />
        <Route
          path="/users/:userId/reservations/:reservationId/"
          element={<ReservationForm />}
        />
        <Route
          path="/users/:userId/reservations/:reservationId/edit"
          element={<ReservationForm />}
        />
        <Route path="/users/:userId/profile" element={<Profile />} />
        <Route path="/users/:userId/edit" element={<ProfileForm />} />
      </Routes>
    </>
  );
};

export default App;
