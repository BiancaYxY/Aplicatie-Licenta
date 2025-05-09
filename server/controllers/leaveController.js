const {Leave, User} = require("../models");
const { v4: uuidv4 } = require("uuid");

const leaveController = {
    requestLeave: async(req, res) => {
        try {
            const {
                start_date,
                end_date
                } = req.body;
            
            const user_id = req.user.id;
            const leave = await Leave.create({
                id: uuidv4(),
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
            const user_id = req.user.id;

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

    setLeaveStatus: async (req, res) => {
        try {
          const { leaveId, status } = req.body;
          const managerId = req.user.id;
    
          const allowedStatuses = ["approved", "rejected"];
          if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Status is invalid!" });
          }
    
          const leave = await Leave.findByPk(leaveId);
          if (!leave) {
            return res.status(404).json({ message: "Leave request not found!" });
          }
    
          const employee = await User.findOne({
            where: {
              id: leave.user_id,
              team_lead_id: managerId,
            },
          });
    
          if (!employee) {
            return res.status(403).json({ message: "Acces denied!" });
          }
    
          leave.status = status;
          await leave.save();
    
          res.status(200).json({ message: `Leave was ${status}.`, leave });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error in setting leave status!" });
        }
      },
};

module.exports = leaveController;