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
      email: "joanne123@hotmail.com",
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
      email: "simon666@gmail.com",
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
      address: "201 Victoria Street #01-09 Singapore 188067",
      contactNumber: "6601 6601",
      businessHours: "Lunch: 11:00 AM to 3:00 PM & Dinner: 5:00 pm to 7:00 PM",
      totalCapacity: 8,
    },
    {
      location: "Orchard - Orchard 313",
      address: "111 Somerset Rd #02-03 Singapore 238164",
      contactNumber: "6601 6603",
      businessHours: "Lunch: 11:00 AM to 3:00 PM & Dinner: 5:00 pm to 7:00 PM",
      totalCapacity: 8,
    },
    {
      location: "Tampines - Tampines 1",
      address: "10 Tampines Central 1 #03-11 Singapore 529536",
      contactNumber: "6601 6604",
      businessHours: "Lunch: 11:00 AM to 3:00 PM & Dinner: 5:00 pm to 7:00 PM",
      totalCapacity: 8,
      //8 seats per slot
    },
    {
      location: "Jurong East - JEM",
      address: "50 Jurong Gateway Rd #03-25 Singapore 608549",
      contactNumber: "6601 6605",
      businessHours: "Lunch: 11:00 AM to 3:00 PM & Dinner: 5:00 pm to 7:00 PM",
      totalCapacity: 8,
    },
    {
      location: "Yishun - Northpoint City",
      address: "930 Yishun Avenue 2 #04-03 Singapore 769098",
      contactNumber: "6601 6602",
      businessHours: "Lunch: 11:00 AM to 3:00 PM & Dinner: 5:00 pm to 7:00 PM",
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
  const reservationTime = ["11:00am", "1:00pm", "5:00pm", "7:00pm"];

  const reservationsData = [
    {
      reservationName: users[1].displayName,
      reservationDate: "2025-07-29",
      reservationTime: reservationTime[1],
      contactNumber: users[1].contactNumber,
      branch: branches[1]._id,
      pax: 2,
      remarks: "",
      user: users[1]._id,
    },
    {
      reservationName: users[2].displayName,
      reservationDate: "2025-07-23",
      reservationTime: reservationTime[2],
      contactNumber: users[2].contactNumber,
      branch: branches[2]._id,
      pax: 2,
      remarks: "",
      user: users[2]._id,
    },
    {
      reservationName: users[0].displayName,
      reservationDate: "2025-07-12",
      reservationTime: reservationTime[0],
      contactNumber: users[0].contactNumber,
      branch: branches[0]._id,
      pax: 2,
      remarks: "",
      user: users[0]._id,
    },
    {
      reservationName: users[0].displayName,
      reservationDate: "2025-08-11",
      reservationTime: reservationTime[3],
      contactNumber: users[0].contactNumber,
      branch: branches[3]._id,
      pax: 2,
      remarks: "",
      user: users[0]._id,
    },
    {
      reservationName: users[0].displayName,
      reservationDate: "2025-07-29",
      reservationTime: reservationTime[0],
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
