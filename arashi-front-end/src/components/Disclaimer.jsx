const Disclaimer = () => {
  return (
    <div className="content is-flex is-flex-direction-column is-align-items-center is-size-5 has-text-black">
      <h3 className="is-underlined has-text-black">Important Note</h3>
      <p>
        Reservations must be made <strong className="has-text-black">1 day</strong> in advance.
      </p>
      <p>
        Due to seating capacity limits, we strongly urge customers to arrive on
        time for reservations.
      </p>
      <p>
        Please take note that we will only hold your table for{" "}
        <strong className="has-text-black">15 minutes</strong>. We reserve the right to give your table up
        should you exceed the 15 minutes’ grace period.
      </p>
      <p>
        Dining duration will still be enforced from the reserve timing even if
        diners arrived late.
      </p>
      <h3 className="mt-2 is-underlined has-text-black">Dining Duration</h3>
      <p>
        In order to best serve all our diners, our restaurant will adopt a
        dining duration for: 90 mins / 1.5 hours
      </p>
    </div>
  );
};

export default Disclaimer;
