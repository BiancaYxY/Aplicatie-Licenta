const {DataTypes} = require("sequelize");


module.exports = (db, DataTypes) => {
  const Feedback = db.define("Feedback", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    target_id: {
      type: DataTypes.UUID,
    },
    feedback_for: {
      type: DataTypes.ENUM("peer", "manager"),
    },
    team_dynamics: {
      type: DataTypes.INTEGER,
    },
    coaching: {
      type: DataTypes.INTEGER,
    },
    communication: {
      type: DataTypes.INTEGER,
    },
    decision_making: {
      type: DataTypes.INTEGER,
    },
    motivation: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Feedback;
};
