const {User} = require('../models/User');

const userController = {
    getUserProfile: async(req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: {exclude: ['password']},
            });

            if(!user) {
                return res.status(404).json({message: 'User not found!'});
            }

            res.json(user);

        } catch(err) {
            res.status(500).json({err: 'Error in obtaining user profile!'})
        }
    },

    updateUserProfile: async (req, res) => {
        const {first_name, last_name, email} = req.body;
        try {
            const user = await User.findByPk(req.user.id);

            if(!user) {
                return res.status(404).json({message: 'User does not exist!'});
            }

            user.first_name = first_name || user.first_name;
            user.last_name = last_name || user.last_name;
            user.email = email || user.email;

            await user.save();
            res.json({message: 'User updated succesfully!', user});
        
        } catch(err) {
            res.status(500).json({err:'Error in updating user profile!'});
        }
    },
};

module.exports = userController;