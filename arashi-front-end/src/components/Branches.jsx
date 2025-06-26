import { useContext, useState, useEffect } from "react";
import * as branchService from "../services/branchService";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

const Branches = () => {
  const { user } = useContext(UserContext);
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBranches = async () => {
      const branchData = await branchService.indexBranch();
      setBranches(branchData);
    };
    fetchAllBranches();
  }, []);

  const handleClick = () => {
    if (user) {
      navigate("/users/:userId/reservations/new");
    } else {
      navigate("/login");
    }
  };

  return (
    <main>
      <h1>Find Us</h1>
      {branches && branches.map((branch) => (
        <article key={branch._id}>
          <h2>{branch.location.split(" - ")[1]}</h2>
          <p>Address: {branch.address}</p>
          <p>Tel: {branch.contactNumber}</p>
          <p>Nearest MRT Station: {branch.location.split(" - ")[0]}</p>
          <h2>-Business Hours-</h2>
          <p>Opens from {branch.businessHours} Daily</p>
          <button onClick={handleClick}>Reserve Now</button>
        </article>
      ))}
    </main>
  );
};

export default Branches;
