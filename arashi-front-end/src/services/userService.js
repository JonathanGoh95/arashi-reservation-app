import { getUserFromToken } from "../contexts/UserContext";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getUser = async (userId) => {
  // userId is from userContext where we setUser during signin.
  // currentUser is get from token when we save suring signin.
  try {
    const currentUser = getUserFromToken();
    if (currentUser._id !== userId) {
      throw new Error("Unauthorized");
    } else {
      const res = await fetch(`${BASE_URL}/${userId}/edit`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // if (!res.ok) throw new Error("Failed to show user details");
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

const updateUser = async (userId, userFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split(".")[1])).payload;
      console.log(payload);
      return data;
    }

    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete user");
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { getUser, updateUser, deleteUser };
