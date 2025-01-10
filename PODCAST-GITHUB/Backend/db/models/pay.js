
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pay = sequelize.define(
    "Pay",
    {
        email: DataTypes.STRING,
        amountPay: DataTypes.STRING,
        contentPay: DataTypes.STRING
    },
    {}
  );
  Pay.associate = function (models) {
    Pay.belongsTo(models.User, {
      foreignKey: "email",
      targetKey: "email",
      as: "userPay",
    });
  };
  return Pay;
};


