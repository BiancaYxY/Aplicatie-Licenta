const {DataTypes} = require("sequelize");


module.exports = (db, DataTypes) => {
  const Task = db.define("Task", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    assigned_by: {
      type: DataTypes.UUID,
    },
    assigned_to: {
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Task;
};
