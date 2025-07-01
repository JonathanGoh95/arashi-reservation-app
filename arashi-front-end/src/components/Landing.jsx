import restaurantImage1 from "../../images/restaurant photo 1.jpg"
import restaurantImage2 from "../../images/restaurant photo.jpg"

const stylePicture = {
  height: "400px", 
  width: "auto"
}

const Landing = () => {
  return (
    <>
      <div className="content has-text-black">
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <h1 className="is-italic m-5 is-underlined has-text-black">
            WELCOME TO ARASHI RESERVATIONS!
          </h1>
          <div className="is-flex is-justify-content-center">
            <img className="card mr-3" style={stylePicture} src={restaurantImage1} ></img>
            <img className="card ml-3" style={stylePicture} src={restaurantImage2} ></img>
          </div>
          <h1 className="m-4 is-italic has-text-black is-underlined">ABOUT US</h1>
          <p className="is-size-5 has-text-centered px-6">
            Arashi Reservations is a streamlined booking platform that allows users to easily reserve tables at our branches, view upcoming/past reservations, and manage bookings — all in one intuitive interface.
            Designed for speed, simplicity, and convenience.
          </p>
          <p className="has-text-dark-grey is-size-5 has-text-weight-bold is-italic">
            Sign Up/Login and Click on 'Reservations' to start making a
            reservation with us!
          </p>
          <p className="has-text-dark-grey is-size-5 has-text-weight-bold is-italic mb-4">
            Click on 'Find Us' to view specific details of our outlets!
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
