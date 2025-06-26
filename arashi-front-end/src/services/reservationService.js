const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const viewReservations = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/reservations`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error("Failed to retrieve Reservations");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createReservation = async (userId, reservationFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/reservations/new`, {
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

const editReservation = async (userId, reservationId, reservationFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/${reservationId}/edit`, {
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

const deleteReservation = async (userId, reservationId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${userId}/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to delete Reservation");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  createReservation,
  viewReservations,
  editReservation,
  deleteReservation,
};
