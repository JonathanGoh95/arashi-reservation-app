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
  }, [branches]);

  const handleClick = () => {
    if (user) {
      navigate("/reservations/new");
    } else {
      navigate("/login");
    }
  };

  const checkAvailability = (branch) =>{
    if(branch.totalCapacity === 0){
      return "No slots available!"
    } else if (branch.totalCapacity <3){
      return "Limited availability!"
    } else {
      return "Open for bookings!"
    }
  }
  return (
    <div className="content">
      <h1 className="is-flex is-justify-content-center m-4 is-size-2 has-text-black">
        Find Us
      </h1>
      <p className="has-text-centered has-text-black is-italic">{user ? "" : "Login to make a reservation!"}</p>
      {loading && (
        <div className="is-flex is-justify-content-center m-6 is-size-2">
          <progress className="is-link"/>
        </div>
      )}
      <div className=" container is-flex ">
        {branches &&
          branches.map((branch) => (
            <div className="card columns m-2" key={branch._id}>
              <div className="card-content is-flex is-flex-direction-column is-justify-content-space-between has-text-centered">
                <p className="is-size-4 has-text-weight-bold has-text-grey">
                  {branch.location.split(" - ")[1]} @ {branch.location.split(" - ")[0]}
                </p>
                <p><span className="is-size-6 has-text-weight-semibold has-text-grey">-Address-</span><br/>{branch.address}</p>
                <p><span className="is-size-6 has-text-weight-semibold has-text-grey">-Tel-</span><br/>{branch.contactNumber}</p>
                <p><span className="is-size-6 has-text-weight-semibold has-text-grey">-Nearest MRT Station-</span><br/>{branch.location.split(" - ")[0]}</p>
                <p><span className="is-size-6 has-text-weight-semibold has-text-grey">-Business Hours-</span><br/>Opens Daily <br/> {branch.businessHours}</p>
                <br/>
                <p><span className="is-size-6 has-text-weight-semibold has-text-primary">-Booking Availability-</span><br/>{checkAvailability(branch)}</p>
                <br/>
               
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
