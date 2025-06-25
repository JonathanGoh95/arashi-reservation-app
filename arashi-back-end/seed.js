/*------------------------------ Starter Code ------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user.js");
const Reservation = require("./models/reservation.js");
const Branch = require("./models/branch.js");

// install faker to fake data
// const { faker } = require("@faker-js/faker");
// install lodash libraries
// const _ = require("lodash");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();

/*----------------------------- Query Functions -----------------------------*/
const saltRounds = 12;

const createUsers = async () => {
  const usersData = [
    {
      displayName: "Joanne",
      email: "joannekjy@hotmail.com",
      birthday: "2001-03-04",
      hashedPassword: bcrypt.hashSync("111", saltRounds),
      contactNumber: "88888888",
    },
    {
      displayName: "Kristie",
      email: "kristieabc@gmail.com",
      birthday: "1865-12-26",
      hashedPassword: bcrypt.hashSync("444", saltRounds),
      contactNumber: "66666666",
    },
    {
      displayName: "Simon",
      email: "simon123@gmail.com",
      birthday: "1996-07-16",
      hashedPassword: bcrypt.hashSync("666", saltRounds),
      contactNumber: "44444444",
    },
  ];

  await User.deleteMany({});

  const users = await User.create(usersData);
  console.log(users);
};

const createBranches = async () => {
  const branchesData = [
    {
      location: "Bugis - Bugis+",
      address: "bugis",
      contactNumber: "88888888",
      businessHours: "10am - 8pm",
      totalTables: 4,
      totalCapacity: 8,
    },
    {
      location: "Orchard - Orchard 313",
      address: "orchard",
      contactNumber: "77777777",
      businessHours: "10am - 8pm",
      totalTables: 4,
      totalCapacity: 8,
    },
    {
      location: "Tampines - Tampines 1",
      address: "tampines",
      contactNumber: "66666666",
      businessHours: "10am - 8pm",
      totalTables: 4,
      //what will happen if someone make a reservations? will this reduce?
      totalCapacity: 8,
      //8 seats per slot
    },
    {
      location: "Jurong East - Jem",
      address: "jurong",
      contactNumber: "55555555",
      businessHours: "10am - 8pm",
      totalTables: 4,
      totalCapacity: 8,
    },
    {
      location: "Yishun - Northpoint",
      address: "yishun",
      contactNumber: "44444444",
      businessHours: "10am - 8pm",
      totalTables: 4,
      totalCapacity: 8,
    },
  ];

  await Branch.deleteMany({});

  const branches = await Branch.create(branchesData);
  console.log(branches);
};

const createReservations = async () => {
  const users = await User.find({});
  const branches = await Branch.find({});

  const reservationsData = [
    {
      reservationName: users[1].displayName,
      reservationDate: "2025-06-29",
      reservationTime: "11:00am",
      contactNumber: users[1].contactNumber,
      branch: branches[1]._id,
      pax: 2,
      remarks: "",
      user: users[1]._id,
    },
    {
      reservationName: users[2].displayName,
      reservationDate: "2025-06-29",
      reservationTime: "8:00pm",
      contactNumber: users[2].contactNumber,
      branch: branches[2]._id,
      pax: 2,
      remarks: "",
      user: users[2]._id,
    },
    {
      reservationName: users[0].displayName,
      reservationDate: "2025-06-29",
      reservationTime: "1:00pm",
      contactNumber: users[0].contactNumber,
      branch: branches[0]._id,
      pax: 2,
      remarks: "",
      user: users[0]._id,
    },
    {
      reservationName: users[0].displayName,
      reservationDate: "2025-06-29",
      reservationTime: "6:00pm",
      contactNumber: users[0].contactNumber,
      branch: branches[3]._id,
      pax: 2,
      remarks: "",
      user: users[0]._id,
    },
  ];

  await Reservation.deleteMany({});

  const reservation = await Reservation.create(reservationsData);
  console.log(reservation);
};

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  await createUsers();
  await createBranches();
  await createReservations();
};
