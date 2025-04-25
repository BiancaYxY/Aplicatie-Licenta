const {Feedback} = require("../models");

const feedbackController = {
    addFeedback: async(req, res) => {
        try {
            const {
                target_id,
                feedback_for,
                team_dynamics,
                coaching,
                communication,
                decision_making,
                motivation
            } = req.body;

            const user_id = req.user_id;

            const feedback = await Feedback.create({
                user_id,
                target_id,
                feedback_for,
                team_dynamics,
                coaching,
                communication,
                decision_making,
                motivation,
                created_at: new Date(),
            });

            return res.status(201).json({message:"Feedback added succesfully!", feedback});

        } catch(err) {
            console.error(error);
            res.status(500).json({message: "Error in adding feedback!"});
        }
    },
};

module.exports = feedbackController;