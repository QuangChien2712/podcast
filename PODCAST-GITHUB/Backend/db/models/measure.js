"use strict";
module.exports = (sequelize, DataTypes) => {
  const Measure = sequelize.define(
    "Measure",
    {
        email: DataTypes.STRING,
        linkAudio: DataTypes.STRING,
        totalTimeAudio: DataTypes.STRING,
        timeViewAudio: DataTypes.STRING,
        totalTimeViewAudio: DataTypes.STRING
    },
    {}
  );
  Measure.associate = function (models) {
    Measure.belongsTo(models.User, {
      foreignKey: "email",
      targetKey: "email",
      as: "userMeasure",
    });
  };
  return Measure;
};


