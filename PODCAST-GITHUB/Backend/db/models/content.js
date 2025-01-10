"use strict";
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content",
    {
        typeRole: DataTypes.STRING,
        tenBaiViet: DataTypes.STRING,
        chuDe: DataTypes.STRING,
        moTaNgan: DataTypes.STRING,
        noiDung: DataTypes.STRING,
        hinhAnh: DataTypes.STRING,
        audio: DataTypes.STRING,
        thuTuHienThi: DataTypes.STRING
    },
    {}
  );

  Content.associate = function (models) {
    // Content.belongsTo(models.Role, {
    //   foreignKey: "typeRole",
    //   targetKey: "typeRole",
    //   as: "type_role",
    // });

    // Content.hasMany(models.Review, {
    //   foreignKey: "idContent",
    //   as: "maNoiDung",
    // });
  };
  return Content;
};









