"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      email: DataTypes.STRING,
      phone:  DataTypes.STRING,
      selectedContent:  DataTypes.STRING,
      otherContent:  DataTypes.STRING,
      selectedTimes:  DataTypes.STRING,
      otherTime: DataTypes.STRING,
      selectedDate: DataTypes.STRING,
      trangThai: DataTypes.STRING
    },
    {}
  );
  Schedule.associate = function (models) {
    
  };
  return Schedule;
};
