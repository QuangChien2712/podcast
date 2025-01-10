"use strict";
module.exports = (sequelize, DataTypes) => {
  const Time_schedule = sequelize.define(
    "Time_schedule",
    {
        timeSchedule: DataTypes.STRING
    },
    {}
  );
  Time_schedule.associate = function (models) {};
  return Time_schedule;
};
