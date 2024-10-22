const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
      message: "selamat datang di express",
    });
  });

app.listen(PORT, () => {
    console.log("server runnning on port " + PORT);
  });