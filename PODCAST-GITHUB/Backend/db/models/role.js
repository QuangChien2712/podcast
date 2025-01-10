"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      nameRole: DataTypes.STRING,
      typeRole: DataTypes.STRING,
    },
    {}
  );

  Role.associate = function (models) {
    Role.hasMany(models.Content, {
      foreignKey: "typeRole",
      as: "type_role",
    });
  };

  return Role;
};
