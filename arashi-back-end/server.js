// npm
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Import routers from controllers
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const reservationRouter = require("./routers/reservationRouter");
const branchRouter = require("./routers/branchRouter");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes Declaration
app.use("/", authRouter);
app.use("/reservations", reservationRouter);
app.use("/find-us", branchRouter);
app.use("/users", userRouter);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("The express app is ready!");
});
