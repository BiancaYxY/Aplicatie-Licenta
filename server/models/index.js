const Sequelize = require("sequelize");
const db = require("../config/db");

const UserModel = require("./User");
const AnnouncementModel = require("./Announcement");
const FeedbackModel = require("./Feedback");
const LeaveModel = require("./Leave");
const SalaryModel = require("./Salary");
const TaskModel = require("./Task");

const User = UserModel(db, Sequelize.DataTypes);
const Announcement = AnnouncementModel(db, Sequelize.DataTypes);
const Feedback = FeedbackModel(db, Sequelize.DataTypes);
const Leave = LeaveModel(db, Sequelize.DataTypes);
const Salary = SalaryModel(db, Sequelize.DataTypes);
const Task = TaskModel(db, Sequelize.DataTypes);

User.hasMany(Task, {foreignKey: "assigned_by", as: "AssignedTasks"});
User.hasMany(Task, {foreignKey: "assigned_to", as: "ReceivedTasks"});
Task.belongsTo(User, {foreignKey: "assigned_by", as: "Creator"});
Task.belongsTo(User, {foreignKey: "assigned_to", as:"Assignee"});

User.hasMany(Leave, {foreignKey: "user_id", as: "Leaves"});
Leave.belongsTo(User, {foreignKey:"user_id", as: User});

User.hasMany(Salary, {foreignKey: "user_id", as: "Salaries"});
Salary.belongsTo(User, {foreignKey:"user_id", as:"User"});

User.hasMany(Feedback, {foreignKey:"user_id", as:"GivenFeedbacks"});
User.hasMany(Feedback, {foreignKey: "target_id", as:"ReceivedFeedbacks"});
Feedback.belongsTo(User, {foreignKey: "user_id", as:"Author"});
Feedback.belongsTo(User, {foreignKey: "target_id", as:"Target"});

User.hasMany(Announcement, {foreignKey: "created_by", as: "Announcements"});
Announcement.belongsTo(User, {foreignKey: "created_by", as: "Creator"});

module.exports = {
    db,
    User,
    Announcement,
    Feedback,
    Leave,
    Salary,
    Task,
};
