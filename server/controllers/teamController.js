const { User, Task} = require("../models");

const teamController = {
  getTeamMembers: async (req, res) => {
    try {
      const managerId = req.user.id;

      const teamMembers = await User.findAll({
        where:{ 
          team_lead_id: managerId,
          rank: "employee",
         },
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
        let performance = (completedTasks / totalTasks) * 100;
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

  // getTeamPerformance: async (req, res) => {
  //   try {
  //     const managerId = req.user.id;

  //     const employees = await User.findAll({
  //       where: {
  //         team_lead_id: managerId,
  //         rank: "employee"
  //       },
  //       attributes: ["id", "first_name", "last_name"]
  //     });

  //     if (!employees.length) {
  //       return res.status(200).json({
  //         teamSize: 0,
  //         averageTeamPerformance: "0%",
  //         breakdown: []
  //       });
  //     }

  //     let totalPercentage = 0;
  //     let countWithTasks = 0;
  //     const individualStats = [];

  //     for (const emp of employees) {
  //       const totalTasks = await Task.count({ where: { assigned_to: emp.id } });
  //       const completedTasks = await Task.count({
  //         where: { assigned_to: emp.id, status: "completed" }
  //       });

  //       let percentage = 0;
  //       if (totalTasks > 0) {
  //         percentage = (completedTasks / totalTasks) * 100;
  //         totalPercentage += percentage;
  //         countWithTasks++;
  //       }

  //       individualStats.push({
  //         employee: `${emp.first_name} ${emp.last_name}`,
  //         totalTasks,
  //         completedTasks,
  //         performance: `${percentage.toFixed(0)}%`
  //       });
  //     }

  //     const averagePerformance = countWithTasks > 0
  //       ? `${(totalPercentage / countWithTasks).toFixed(0)}%`
  //       : "0%";

  //     res.status(200).json({
  //       teamSize: employees.length,
  //       averageTeamPerformance: averagePerformance,
  //       breakdown: individualStats
  //     });
  //   } catch (err) {
  //     console.error("Team performance error!", err);
  //     res.status(500).json({ message: "Error calculating team performance!" });
  //   }
  // }
  getTeamPerformance: async (req, res) => {
    try {
      const managerId = req.user.id;

      const employees = await User.findAll({
        where: {
          team_lead_id: managerId,
          rank: "employee",
        },
        attributes: ["id", "first_name", "last_name"],
      });

      if (!employees.length) {
        return res.status(200).json({
          teamSize: 0,
          averageTeamPerformance: "0%",
          breakdown: [],
        });
      }

      let totalPercentage = 0;
      let countWithTasks = 0;
      const individualStats = [];

      for (const emp of employees) {
        try {
          const totalTasks = await Task.count({ where: { assigned_to: emp.id } });
          const completedTasks = await Task.count({
            where: { assigned_to: emp.id, status: "completed" },
          });

          let percentage = 0;
          if (totalTasks > 0) {
            percentage = (completedTasks / totalTasks) * 100;
            totalPercentage += percentage;
            countWithTasks++;
          }

          individualStats.push({
            employee: `${emp.first_name} ${emp.last_name}`,
            totalTasks,
            completedTasks,
            performance: `${percentage.toFixed(0)}%`,
          });
        } catch (err) {
          individualStats.push({
            employee: `${emp.first_name} ${emp.last_name}`,
            totalTasks: 0,
            completedTasks: 0,
            performance: "0%",
          });
        }
      }

      const averagePerformance =
        countWithTasks > 0
          ? `${(totalPercentage / countWithTasks).toFixed(0)}%`
          : "0%";

      return res.status(200).json({
        teamSize: employees.length,
        averageTeamPerformance: averagePerformance,
        breakdown: individualStats,
      });
    } catch (err) {
      return res.status(500).json({ message: "Error calculating performance" });
    }
  },
};

module.exports = teamController;
