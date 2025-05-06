const { User, Task, Feedback } = require("../models");

const teamController = {
  getTeamMembers: async (req, res) => {
    try {
      const managerId = req.user.id;

      const teamMembers = await User.findAll({
        where: { team_lead_id: managerId, rank: "employee" },
        attributes: ["id", "first_name", "last_name", "email"],
        order: [["first_name", "ASC"]],
      });

      res.status(200).json(teamMembers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in getting team members!" });
    }
  },

  getEmployeePerformance: async (req, res) => {
    try {
      const { employeeId } = req.params;
      const managerId = req.user.id;
  
      const employee = await User.findOne({
        where: { id: employeeId, team_lead_id: managerId },
      });
  
      if (!employee) {
        return res.status(403).json({ message: "Access denied to the employee's performance!" });
      }
  
      const totalTasks = await Task.count({ where: { assigned_to: employeeId } });
      const completedTasks = await Task.count({
        where: { assigned_to: employeeId, status: "completed" },
      });
  
      let performance = "0%";
      if (totalTasks > 0) {
        const performance = (completedTasks / totalTasks) * 100;
        performance = `${performance.toFixed(0)}%`;
      }
  
      res.status(200).json({
        employee: {
          id: employee.id,
          name: `${employee.first_name} ${employee.last_name}`,
        },
        performanceReport: {
          totalTasks,
          completedTasks,
          performance,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in getting employee performance!" });
    }
  },
};

module.exports = teamController;
