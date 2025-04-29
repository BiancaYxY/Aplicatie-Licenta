const {DataTypes} = require("sequelize");


module.exports = (db, DataTypes) => {
  const Announcement = db.define("Announcement", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Announcement;
};
