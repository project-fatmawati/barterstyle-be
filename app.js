const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./db");

db.then(() => {
  console.log("berhasil connect ke db");
}).catch(() => {
  console.log("gagal konek ke db");
});

app.listen(PORT, () => {
    console.log("server runnning on port " + PORT);
  });