const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reservations`;

const viewPastReservations = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/past`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error("Failed to retrieve Past Reservations");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const viewUpcomingReservations = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/upcoming`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error("Failed to retrieve Upcoming Reservations");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const viewOneReservation = async (userId, reservationId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${userId}/reservations/${reservationId}/edit`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (!res.ok) throw new Error("Failed to retrieve Reservation");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createReservation = async (reservationFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationFormData),
    });
    if (!res.ok) throw new Error("Failed to create Reservation");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const editReservation = async (reservationId, reservationFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${reservationId}/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationFormData),
    });
    if (!res.ok) throw new Error("Failed to update Reservation");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteReservation = async (reservationId) => {
  try {
    const res = await fetch(`${BASE_URL}/${reservationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete Reservation");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  createReservation,
  viewPastReservations,
  viewUpcomingReservations,
  viewOneReservation,
  editReservation,
  deleteReservation,
};
