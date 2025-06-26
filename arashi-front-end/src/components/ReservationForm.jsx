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
        <input type="date"
        min={minDate}></input>
      </label>      
      </div>
      <div>
      <label>
        Reservation Time:
        <select>
        <optgroup label="Lunch session">
          <option value="11.00am">11.00am</option>
          <option value="1.00pm">1.00pm</option>
        </optgroup>
        <optgroup label="Dinner session">
          <option value="5.00pm">5.00pm</option>
          <option value="7.00pm">7.00pm</option>
        </optgroup>
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
