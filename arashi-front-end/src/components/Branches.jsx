import { useContext, useState, useEffect } from "react";
import * as branchService from "../services/branchService";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

const Branches = () => {
  const { user } = useContext(UserContext);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBranches = async () => {
      const branchData = await branchService.indexBranch();
      setLoading(false);
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
    <div className="content">
      <h1 className="is-flex is-justify-content-center m-4 is-size-2">
        Find Us
      </h1>
      {loading && (
        <div className="is-flex is-justify-content-center m-6 is-size-2">
          <progress className="progress is-link"/>
        </div>
      )}
      <div className="is-flex">
        {branches &&
          branches.map((branch) => (
            <div className="card columns m-2" key={branch._id}>
              <div className="card-content is-flex is-flex-direction-column is-align-items-center">
                <p className="is-size-4 has-text-weight-bold has-text-white">
                  {branch.location.split(" - ")[1]}
                </p>
                <p>Address: {branch.address}</p>
                <p>Tel: {branch.contactNumber}</p>
                <p>Nearest MRT Station: {branch.location.split(" - ")[0]}</p>
                <p className="is-size-4 has-text-weight-bold has-text-white">
                  -Business Hours-
                </p>
                <p>Opens from {branch.businessHours} Daily</p>
                <div className="is-flex is-justify-content-center">
                  <button className="button is-primary" onClick={handleClick}>
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="is-flex is-justify-content-center m-5">
        <button className="button is-danger" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Branches;
