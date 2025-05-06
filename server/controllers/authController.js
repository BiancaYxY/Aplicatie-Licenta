const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User: userModel } = require("../models");

const COOKIE_AGE = parseInt(process.env.COOKIE_AGE) || 86400000; // 1 zi

const authController = {
  register: async (req, res) => {
    try {
      const { 
            first_name,
            last_name, 
            email, 
            password, 
            rank,
            team_lead_id,
        } = req.body;

      const checkUser = await userModel.findOne({ where: { email } });
      if (checkUser) {
            return res.status(400).send("User already exists!");
        }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        id: uuidv4(),
        first_name,
        last_name,
        email,
        password: hashedPassword,
        rank: rank || "employee",
        team_lead_id: team_lead_id || null,
        createdAt: new Date(),
      });

      const { password: _, ...userData } = user.toJSON();
      res.status(201).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error!");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ where: { email } });
      if (!user) return res.status(404).send("User not found!");

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, rank: user.rank },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("bearer", token, {
        httpOnly: true,
        maxAge: COOKIE_AGE,
        sameSite: "strict",
        //secure: process.env.NODE_ENV === "production"
      });

      const { password: _, ...userData } = user.toJSON();
      res.status(200).json({ success: true, user: userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("bearer", { httpOnly: true });
      res.status(200).send("Logout done!");
    } catch (error) {
      res.status(500).send("Server error!");
    }
  },
};

module.exports = authController;