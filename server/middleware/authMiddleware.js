const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.bearer;

  if (!token) return res.status(401).json({ message: "Missing token!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ message: "User does not exist!" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid or expired token!" });
  }
};

module.exports = authenticateUser;
