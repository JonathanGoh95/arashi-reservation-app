import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
// import HootList from "./components/HootList/HootList";
// import HootDetails from "./components/HootDetails/HootDetails";
// import HootForm from "./components/HootForm/HootForm";
// import CommentForm from "./components/CommentForm/CommentForm";


import { UserContext } from "./contexts/UserContext";
import UserProfile from "./components/userProfile";

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  // Fetch all hoots upon user login
  // useEffect(() => {
  //   const fetchAllHoots = async () => {
  //     const hootsData = await hootService.index();
  //     setHoots(hootsData);
  //   };
  //   // Can only be fetched if user is logged in
  //   if (user) fetchAllHoots();
  // }, [user]);

  // // Create New Hoot at the front of the state, so that the user can see it at the top of the page
  // const handleAddHoot = async (hootFormData) => {
  //   const newHoot = await hootService.create(hootFormData);
  //   setHoots([newHoot, ...hoots]);
  //   navigate("/hoots/");
  // };

  // const handleUpdateHoot = async (hootId, hootFormData) => {
  //   const updatedHoot = await hootService.update(hootId, hootFormData);
  //   // Only replace the hoot if the hoot ID matches the one in the database
  //   setHoots((prevHoots) => prevHoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
  //   navigate(`/hoots/${hootId}`);
  // };

  // const handleDeleteHoot = async (hootId) => {
  //   console.log("hootId", hootId);
  //   const deletedHoot = await hootService.deleteHoot(hootId);
  //   setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
  //   navigate("/hoots/");
  // };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
    
        {user ? (
          // <>
          //   {/* Protected routes (available only to signed-in users) */}
          //   <Route path="/hoots/" element={<HootList hoots={hoots} />} />
          //   <Route
          //     path="/hoots/:hootId"
          //     element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
          //   />
          //   <Route
          //     path="/hoots/new"
          //     element={<HootForm handleAddHoot={handleAddHoot} />}
          //   />
          //   <Route
          //     path="/hoots/:hootId/edit"
          //     element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
          //   />
          //   <Route
          //     path="/hoots/:hootId/comments/:commentId/edit"
          //     element={<CommentForm />}
          //   />
          // </>
          <Route path="/reservations" element={<h1>Reservations</h1>} />

        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<SignInForm />} />
         
          </>
        )}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/reservations" element={<h1>Reservations</h1>} />
            <Route path="/find-us" element={<h1>Find Us</h1>} />
            <Route path="/users/:userId/profile" element={<UserProfile />} />
            <Route path="/users/:userId/profile/edit" element={<h1>Edit User's Profile</h1>} />
      </Routes>
    </>
  );
};

export default App;
