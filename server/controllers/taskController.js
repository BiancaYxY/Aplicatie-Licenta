const {Task, User} = require("../models");
const { v4: uuidv4 } = require("uuid");

const taskController = {
  getAssignedTasks: async (req, res) => {
    try {
      const assigned_to = req.user.id;

      const tasks = await Task.findAll({
        where: { assigned_to },
        order: [["created_at", "DESC"]],
      });

      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in getting tasks!" });
    }
  },

  updateTaskStatus: async (req, res) => {
    try {
      const { taskId, status } = req.body;
      const assigned_to = req.user.id;

      const task = await Task.findOne({
        where: {
          id: taskId,
          assigned_to,
        },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }

      task.status = status;
      await task.save();

      res.status(200).json({ message: "Task status updated succesfully!", task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in updating Task!" });
    }
  },

  assignTask: async (req, res) => {
    try {
      const { assigned_to, title, description } = req.body;
      const managerId = req.user.id;

      const employee = await User.findOne({
        where: {
          id: assigned_to,
          team_lead_id: managerId,
          rank: "employee",
        },
      });

      if (!employee) {
        return res.status(403).json({ message: "Cannot asign task to this user!" });
      }

      const task = await Task.create({
        id: uuidv4(),
        assigned_by: managerId,
        assigned_to,
        title,
        description,
        status: "pending",
      });

      res.status(201).json({ message: "Task assigned succesfully!", task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in assigning task!" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { taskId } = req.params;
      const managerId = req.user.id;

      const task = await Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }

      if (task.assigned_by !== managerId) {
        return res.status(403).json({ message: "You are not allowed to delete this task!" });
      }

      await task.destroy();
      res.status(200).json({ message: "Task deleted succesfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in deleting task!" });
    }
  },

  getTeamTasks: async (req, res) => {
    try {
      const managerId = req.user.id;

      const teamMembers = await User.findAll({
        where: { team_lead_id: managerId, rank: "employee" },
        attributes: ["id"],
      });

      const teamMemberIds = teamMembers.map((member) => member.id);

      const tasks = await Task.findAll({
        where: {
          assigned_to: teamMemberIds,
        },
        order: [["created_at", "DESC"]],
      });

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error in getTeamTasks:", error);
      res.status(500).json({ message: "Error getting team tasks!" });
    }
  },
};

module.exports = taskController;