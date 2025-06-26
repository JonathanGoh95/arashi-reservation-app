const ReservationForm = () => {
  return (
  <div>
    <h1>Reservation Form</h1>
    <form>
      <div>
      <label>
        Reservation Name:
        <input type="string"></input>
      </label>
      </div>
      <div>
      <label>
        Contact Number:
        <input type="string"></input>
      </label>      
      </div>
      <div>
      <label>
        Pax:
        <input type="number"></input>
      </label>      
      </div>
      <div>
      <label>
        Branch:
        <input type="string"></input>
      </label>      
      </div>
      <div>
      <label>
        Reservation Date:
        <input type="date"></input>
      </label>      
      </div>
      <div>
      <label>
        Reservation Time:
        <select>
          <option>11.00am</option>
          <option>1.00pm</option>
          <option>5.00pm</option>
          <option>7.00pm</option>
        </select>
      </label>      
      </div>
      <div>
      <label>
        Remarks (optional):
        <input type="string"></input>
      </label>      
      </div>
    </form>
  </div>

  )
};

export default ReservationForm;
