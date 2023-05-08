require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // ODM library
const logger = require("morgan");
const cors = require("cors");

const userRoutes = require("./routes/user");
const booksRoutes = require("./routes/books");

const app = express();

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/books", booksRoutes);

// set up mongo db connection
const mongoDB = process.env.MONGODB_URI;
mongoose
  .connect(mongoDB)
  .then(() => {
    // listen to requests once connected to the database
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(
        `***Connected to Mongo DB***. Server is listening on port ${port}`
      );
    });
  })
  .catch((err) => console.log(err));
