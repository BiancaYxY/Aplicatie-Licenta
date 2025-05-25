require("./setup");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { db } = require("./models");

const apiRoutes = require("./routes");

const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(cookieParser());

app.get("/reset-database", async (req, res) => {
  try {
    await db.sync({ force: true });
    res.status(200).send("Gata resetarea!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Reset failed!!");
  }
});

app.use("/api", apiRoutes);

if (db) {
  db.sync()
    .then(() => {
      console.log("Database fully functional!!");
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error(" Sync gone wrong", error);
    });
} else {
  console.error(" Database is not defined");
}
