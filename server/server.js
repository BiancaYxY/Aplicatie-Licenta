const express = require("express");
const app = express();
require("dotenv").config();
//adaugat dupa
const {db} = require("./models");

const apiRoutes = require("./routes");

const PORT = process.env.PORT || 1234;

// Middleware
app.use(express.json());

// Ruta de test
app.get("/", (req, res) => {
  res.send("LMA!");
});

// Ruta pentru resetarea bazei de date
app.get("/reset-database", async (req, res) => {
  try {
    await db.sync({ force: true });
    res.status(200).send("Gata resetarea!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Reset failed!!");
  }
});

// Montare rute
app.use("/api", apiRoutes);

// Start server și sincronizare DB
if (db) {
  db.sync()
    .then(() => {
      console.log("Database fully functional!!");
      app.listen(PORT, () => {
        console.log(`Works on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Sync gone wrong", error);
    });
} else {
  console.error("Database is not defined");
}
