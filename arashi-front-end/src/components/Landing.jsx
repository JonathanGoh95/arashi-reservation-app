const stylePicture = {
  height: "400px", 
  width: "auto"
}

const Landing = () => {
  return (
    <>
      <div className="content">
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <h1 className="is-italic m-5 is-underlined">
            WELCOME TO ARASHI RESERVATIONS!
          </h1>
          <img style={stylePicture} src="./images/\restaurant photo 1.jpg" ></img>
          <h1 className="m-5 is-italic">ABOUT US</h1>
          <p className="is-size-5 has-text-centered px-6">
            Arashi Reservation App is a streamlined booking platform that allows users to easily reserve tables at our branches, view upcoming/past reservations, and manage bookings—all in one intuitive interface.
            Designed for speed, simplicity, and convenience.
          </p>
          <p className="has-text-dark-grey is-size-4 has-text-weight-bold is-italic">
            Sign Up/Login and Click on 'Reservations' to start making a
            reservation with us!
          </p>
          <p className="has-text-dark-grey is-size-4 has-text-weight-bold is-italic m-(-2)">
            Click on 'Find Us' to view specific details of our outlets!
          </p>
        </div>
      </div>
      
    </>
  );
};

export default Landing;
