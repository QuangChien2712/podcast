"use strict";
module.exports = (sequelize, DataTypes) => {
  const Discussioncontent = sequelize.define(
    "Discussioncontent",
    {
      noiDungThaoLuan: DataTypes.STRING,
      trangThai: DataTypes.STRING
    },
    {}
  );
  Discussioncontent.associate = function (models) {
    
  };
  return Discussioncontent;
};