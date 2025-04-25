const {Leave} = require("../models");

const leaveController = {
    requestLeave: async(req, res) => {
        try {
            const {
                start_date,
                end_date
                } = req.body;
            
            const user_id = req.user_id;
            const leave = await Leave.create({
                user_id,
                start_date,
                end_date,
                status:"pending",
                created_at: new Date(),
            });

            res.status(201).json({message: "Leave request sent succesfully!", leave});

        } catch(err) {
            console.error(err);
            res.status(500).json({message:"Error in sending leave request!"});
        }
    },

    getLeaveStatus: async(req, res) => {
        try{
            const user_id = req.user_id;

            const leaves = await Leave.findAll({
                where: {user_id},
                order: [["created_at", "DESC"]],
            });

            res.status(200).json(leaves);

        } catch(err){
            console.error(err);
            res.status(500).json({message:" Error in getting leave requests!"});
        }
    },
};

module.exports = leaveController;