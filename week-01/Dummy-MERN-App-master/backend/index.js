const express = require("express");

const dbConnect = require("./config/database");
const userRoutes = require("./routes/user");
const app = express();
var cors = require("cors");
require("dotenv").config();
console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);
// Middleware
app.use(express.json());

app.use("/api/v1", userRoutes);

// CORS Configuration
app.listen(4000, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnect();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
