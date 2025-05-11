const {User} = require("../models");
const bcrypt = require("bcrypt");

const userController = {
    getUserById: async (req, res) => {
        try {
          const userId = req.params.userId;
      
          const user = await User.findByPk(userId);
      
          if (!user) {
            return res.status(404).json({ message: "User not found!" });
          }
      
          res.status(200).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error!" });
        }
      },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.userId;
        
            const userToBeModified = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              rank: req.body.rank,
              team_lead_id: req.body.team_lead_id,
            };
        
            const resultUser = await User.findByPk(userId);
            if (!resultUser) {
              return res.status(404).send("User not found!");
            }
        
            await resultUser.update(userToBeModified);
            res.status(200).json({ message: "User updated successfully!", user: resultUser });
          } catch (error) {
            console.error(error);
            res.status(500).send("Server error!");
          }
    },

    updatePassword: async (req, res) => {
        try {
          const { email, newPassword } = req.body;
      
          const resultUser = await User.findOne({ where: { email } });
      
          if (!resultUser) {
            return res.status(404).json({ message: "User not found!" });
          }
      
          const hashedPassword = await bcrypt.hash(newPassword, 10);
      
          await resultUser.update({
            password: hashedPassword,
            token: null
          });
      
          res.status(200).json({ message: "Password updated successfully!" });
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error!" });
        }
      },
    
    getAllUsers: async (req, res) => {
        try {
          const users = await User.findAll();
      
          res.status(200).json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error getting users!" });
        }
      },

};

module.exports = userController;