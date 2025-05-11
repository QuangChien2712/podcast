"use strict";
module.exports = (sequelize, DataTypes) => {
  const Discussiontime = sequelize.define(
    "Discussiontime",
    {
      thoiGianThaoLuan: DataTypes.STRING,
      trangThai: DataTypes.STRING
    },
    {}
  );
  Discussiontime.associate = function (models) {
    
  };
  return Discussiontime;
};

