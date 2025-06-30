const saveUser = (req, user) => {
  req.user = user;
};

const loadUser = (req) => req.user;

const createPayload = (user) => {
  return {
    email: user.email,
    _id: user._id,
    displayName: user.displayName,
    birthday: user.birthday,
    contactNumber: user.contactNumber,
  };
};

module.exports = {
  createPayload,
  saveUser,
  loadUser,
};
