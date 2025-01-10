"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      email: DataTypes.STRING,
      timeSchedule: DataTypes.STRING,
      topicSchedule: DataTypes.STRING,
    },
    {}
  );
  Schedule.associate = function (models) {
    Schedule.belongsTo(models.User, {
      foreignKey: "email",
      targetKey: "email",
      as: "userSchedule",
    });
  };
  return Schedule;
};
