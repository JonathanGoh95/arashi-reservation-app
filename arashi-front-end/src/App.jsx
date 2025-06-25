// import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Branches from "./components/Branches/Branches";
import Reservations from "./Reservations/Reservations";
import ReservationForm from "./components/ReservationForm/ReservationForm";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import Profile from "./components/Profile/Profile";
// import HootForm from "./components/HootForm/HootForm";
// import CommentForm from "./components/CommentForm/CommentForm";


const App = () => {
  // const [hoots, setHoots] = useState([]);
  // const navigate = useNavigate();

  // Create New Hoot at the front of the state, so that the user can see it at the top of the page
  /* const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots/");
  }; */

  /* const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    // Only replace the hoot if the hoot ID matches the one in the database
    setHoots((prevHoots) => prevHoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  }; */

  /* const handleDeleteHoot = async (hootId) => {
    console.log("hootId", hootId);
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate("/hoots/");
  }; */

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
            <Route path="/reservation" element={<Reservations />} />
            <Route path="/reservation/new" element={<ReservationForm />} />
            <Route path="/reservation/:reservationId/edit" element={<ReservationForm />} />
            <Route path="/branch" element={<Branches />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/users/:userId/profile" element={<Profile />} />
            <Route path="/users/:userId/edit" element={<ProfileForm />} />
      </Routes>
    </>
  );
};

export default App;
