const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/find-us`;

const indexBranch = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to show branch details");
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

export { indexBranch };
