require("./setup");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");
// dns.setServers(["8.8.8.8"]);

const { db } = require("./models");

//  Import rutele
const apiRoutes = require("./routes");

const PORT = process.env.PORT || 1234;

//  Middleware global
app.use(express.json());
//pt auth
app.use(cookieParser());

//  Rută de test simpla
app.get("/", (req, res) => {
  res.send("test!");
});

//  Rută opțională pentru reset DB 
app.get("/reset-database", async (req, res) => {
  try {
    await db.sync({ force: true });
    res.status(200).send("Gata resetarea!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Reset failed!!");
  }
});

//  Montează toate rutele definite în `routes/index.js`
app.use("/api", apiRoutes);

//  Pornește serverul și sincronizează baza de date
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
