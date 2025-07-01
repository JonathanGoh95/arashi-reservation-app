const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reservations`;
import { getUserFromToken } from "../contexts/UserContext";

const viewPastReservations = async (userId) => {
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/past`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to retrieve Past Reservations");
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const viewUpcomingReservations = async (userId) => {
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/upcoming`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to retrieve Upcoming Reservations");
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const viewOneReservation = async (userId, reservationId) => {
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/${reservationId}/edit`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to retrieve Reservation");
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const createReservation = async (userId, reservationFormData) => {
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationFormData),
      });

      const data = await res.json();

      if (data.err) {
        throw new Error(data.err);
      }

      return data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const editReservation = async (userId, reservationId, reservationFormData) => {
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/${reservationId}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationFormData),
      });

      const data = await res.json();

      if (data.err) {
        throw new Error(data.err);
      }

      return data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteReservation = async (userId, reservationId) => {
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/${reservationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete Reservation");
      return res.json();
    }
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
