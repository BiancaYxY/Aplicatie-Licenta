const {DataTypes} = require("sequelize");


module.exports = (db, DataTypes) => {
  const Salary = db.define("Salary", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    base_salary: {
      type: DataTypes.DECIMAL,
    },
    bonus: {
      type: DataTypes.DECIMAL,
    },
    month: {
      type: DataTypes.ENUM(
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ),
    },
    year: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Salary;
};
