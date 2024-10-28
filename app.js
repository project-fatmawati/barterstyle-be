const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');


app.use(cors());

const allRoutes = require("./routes");
const db = require("./db");

db.then(() => {
  console.log("connection database success");
}).catch((err) => {
  console.log("connection database failed", err);
  process.exit(1);
});

app.use(express.json());
app.use(allRoutes);

app.listen(PORT, () => {
    console.log("server runnning on port " + PORT);
  });